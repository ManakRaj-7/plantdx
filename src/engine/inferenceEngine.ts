import { Disease, KnowledgeBase, ProductionRule, Symptom } from "@/data/knowledgeBase";

export interface RuleEvaluation {
  rule: ProductionRule;
  disease: Disease;
  matchedConditions: string[];
  totalConditions: number;
  matched: boolean;
  matchPercentage: number;
}

export interface DiagnosisResult {
  disease: Disease;
  confidence: number;
  matchedSymptoms: Symptom[];
  totalRuleConditions: number;
  matchedRuleConditions: number;
  firedRules: ProductionRule[];
  bestRule: ProductionRule;
}

export interface InferenceTrace {
  step: number;
  action: string;
  detail: string;
}

export interface InferenceResult {
  results: DiagnosisResult[];
  trace: InferenceTrace[];
  allEvaluations: RuleEvaluation[];
  conflictResolution: string;
}

export function runForwardChaining(
  selectedSymptoms: string[],
  selectedPlant: string,
  knowledgeBase: KnowledgeBase
): InferenceResult {
  const trace: InferenceTrace[] = [];
  const allEvaluations: RuleEvaluation[] = [];
  let step = 0;

  trace.push({
    step: ++step,
    action: "INITIALIZE",
    detail: `Starting forward chaining inference with ${selectedSymptoms.length} selected symptom(s) for plant: ${selectedPlant}`,
  });

  // Get symptom names for trace
  const symptomNames = selectedSymptoms.map((sid) => {
    const s = knowledgeBase.symptoms.find((sym) => sym.id === sid);
    return s ? s.name : sid;
  });

  trace.push({
    step: ++step,
    action: "WORKING MEMORY",
    detail: `Facts in working memory: [${symptomNames.join(", ")}]`,
  });

  // Filter diseases for the selected plant
  const relevantDiseases = knowledgeBase.diseases.filter(
    (d) => d.plant === selectedPlant
  );

  trace.push({
    step: ++step,
    action: "FILTER",
    detail: `Filtered to ${relevantDiseases.length} disease(s) for ${selectedPlant}: [${relevantDiseases.map((d) => d.name).join(", ")}]`,
  });

  // Evaluate all rules
  const diseaseScores: Map<string, DiagnosisResult> = new Map();

  for (const disease of relevantDiseases) {
    trace.push({
      step: ++step,
      action: "EVALUATE DISEASE",
      detail: `Evaluating rules for: ${disease.name}`,
    });

    for (const rule of disease.rules) {
      const matchedConditions = rule.conditions.filter((c) =>
        selectedSymptoms.includes(c)
      );
      const matchPercentage = (matchedConditions.length / rule.conditions.length) * 100;
      const matched = matchedConditions.length > 0;

      const conditionNames = rule.conditions.map((cid) => {
        const s = knowledgeBase.symptoms.find((sym) => sym.id === cid);
        return s ? s.name : cid;
      });
      const matchedNames = matchedConditions.map((cid) => {
        const s = knowledgeBase.symptoms.find((sym) => sym.id === cid);
        return s ? s.name : cid;
      });

      const evaluation: RuleEvaluation = {
        rule,
        disease,
        matchedConditions,
        totalConditions: rule.conditions.length,
        matched,
        matchPercentage,
      };
      allEvaluations.push(evaluation);

      if (matched) {
        trace.push({
          step: ++step,
          action: "RULE FIRED",
          detail: `Rule ${rule.id}: IF [${conditionNames.join(" AND ")}] THEN ${disease.name} — Matched ${matchedConditions.length}/${rule.conditions.length} conditions: [${matchedNames.join(", ")}] (${matchPercentage.toFixed(0)}%)`,
        });

        const existing = diseaseScores.get(disease.id);
        const ruleScore = (matchedConditions.length / rule.conditions.length) * rule.weight;

        if (!existing || ruleScore > (existing.matchedRuleConditions / existing.totalRuleConditions) * existing.bestRule.weight) {
          const matchedSymptomObjects = matchedConditions
            .map((cid) => knowledgeBase.symptoms.find((s) => s.id === cid))
            .filter(Boolean) as Symptom[];

          diseaseScores.set(disease.id, {
            disease,
            confidence: matchPercentage,
            matchedSymptoms: matchedSymptomObjects,
            totalRuleConditions: rule.conditions.length,
            matchedRuleConditions: matchedConditions.length,
            firedRules: existing ? [...existing.firedRules, rule] : [rule],
            bestRule: rule,
          });
        } else if (existing) {
          existing.firedRules.push(rule);
        }
      } else {
        trace.push({
          step: ++step,
          action: "RULE SKIPPED",
          detail: `Rule ${rule.id}: IF [${conditionNames.join(" AND ")}] THEN ${disease.name} — No conditions matched`,
        });
      }
    }
  }

  // Sort results by confidence (conflict resolution)
  const results = Array.from(diseaseScores.values()).sort(
    (a, b) => {
      const scoreA = (a.matchedRuleConditions / a.totalRuleConditions) * a.bestRule.weight;
      const scoreB = (b.matchedRuleConditions / b.totalRuleConditions) * b.bestRule.weight;
      return scoreB - scoreA;
    }
  );

  // Conflict resolution explanation
  let conflictResolution = "";
  if (results.length > 1) {
    conflictResolution = `Multiple diseases matched. Conflict resolution applied: Selected "${results[0].disease.name}" because its best-matching rule (${results[0].bestRule.id}) had the highest weighted score (${results[0].matchedRuleConditions}/${results[0].totalRuleConditions} conditions × weight ${results[0].bestRule.weight} = ${((results[0].matchedRuleConditions / results[0].totalRuleConditions) * results[0].bestRule.weight).toFixed(1)}). Other candidates: ${results.slice(1).map((r) => `${r.disease.name} (score: ${((r.matchedRuleConditions / r.totalRuleConditions) * r.bestRule.weight).toFixed(1)})`).join(", ")}.`;
    trace.push({
      step: ++step,
      action: "CONFLICT RESOLUTION",
      detail: conflictResolution,
    });
  } else if (results.length === 1) {
    conflictResolution = `Only one disease matched: "${results[0].disease.name}". No conflict resolution needed.`;
    trace.push({
      step: ++step,
      action: "RESOLUTION",
      detail: conflictResolution,
    });
  } else {
    conflictResolution = "No diseases matched the selected symptoms. Try selecting more symptoms or different combinations.";
    trace.push({
      step: ++step,
      action: "NO MATCH",
      detail: conflictResolution,
    });
  }

  trace.push({
    step: ++step,
    action: "COMPLETE",
    detail: `Inference complete. ${results.length} diagnosis result(s) found.`,
  });

  return { results, trace, allEvaluations, conflictResolution };
}
