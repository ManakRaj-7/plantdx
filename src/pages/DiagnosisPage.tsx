import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Leaf, Stethoscope, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, Info, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useKnowledgeBase } from "@/hooks/useKnowledgeBase";
import { runForwardChaining, InferenceResult } from "@/engine/inferenceEngine";

const plantIcons: Record<string, string> = {
  tomato: "🍅",
  potato: "🥔",
  chilli: "🌶️",
};

const categoryLabels: Record<string, string> = {
  leaf: "🍃 Leaf Symptoms",
  stem: "🌿 Stem Symptoms",
  fruit: "🍎 Fruit/Tuber Symptoms",
  general: "🌱 General Symptoms",
};

export default function DiagnosisPage() {
  const { knowledgeBase } = useKnowledgeBase();
  const [step, setStep] = useState(1);
  const [selectedPlant, setSelectedPlant] = useState<string>("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [result, setResult] = useState<InferenceResult | null>(null);

  const plants = ["tomato", "potato", "chilli"];

  const filteredSymptoms = useMemo(() => {
    if (!selectedPlant) return [];
    return knowledgeBase.symptoms.filter((s) =>
      s.plants.includes(selectedPlant as "tomato" | "potato" | "chilli")
    );
  }, [selectedPlant, knowledgeBase]);

  const groupedSymptoms = useMemo(() => {
    const groups: Record<string, typeof filteredSymptoms> = {};
    for (const s of filteredSymptoms) {
      if (!groups[s.category]) groups[s.category] = [];
      groups[s.category].push(s);
    }
    return groups;
  }, [filteredSymptoms]);

  const handleDiagnose = () => {
    const res = runForwardChaining(selectedSymptoms, selectedPlant, knowledgeBase);
    setResult(res);
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setSelectedPlant("");
    setSelectedSymptoms([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-2">
          <Stethoscope className="h-7 w-7 text-primary" />
          Disease Diagnosis
        </h1>
        <p className="text-muted-foreground mb-8">Follow the steps to diagnose plant diseases using our rule-based inference engine.</p>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                {s === 1 ? "Select Plant" : s === 2 ? "Select Symptoms" : "Results"}
              </span>
              {s < 3 && <div className={`w-8 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Plant */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h2 className="font-display text-xl font-bold mb-4">Step 1: Select Your Plant</h2>
            <div className="grid grid-cols-3 gap-4">
              {plants.map((plant) => (
                <Card
                  key={plant}
                  onClick={() => { setSelectedPlant(plant); setSelectedSymptoms([]); setStep(2); }}
                  className={`cursor-pointer hover:shadow-lg transition-all text-center ${selectedPlant === plant ? "ring-2 ring-primary" : "border-primary/10"}`}
                >
                  <CardContent className="pt-6 pb-4">
                    <div className="text-5xl mb-3">{plantIcons[plant]}</div>
                    <div className="font-display text-lg font-bold capitalize">{plant}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {knowledgeBase.diseases.filter((d) => d.plant === plant).length} diseases
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Symptoms */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold">
                Step 2: Select Symptoms for {plantIcons[selectedPlant]} {selectedPlant}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            </div>
            <div className="space-y-6">
              {Object.entries(groupedSymptoms).map(([category, symptoms]) => (
                <Card key={category} className="border-primary/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{categoryLabels[category] || category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {symptoms.map((symptom) => (
                      <label key={symptom.id} className="flex items-start gap-3 cursor-pointer hover:bg-secondary/50 rounded-lg p-2 -m-2 transition-colors">
                        <Checkbox
                          checked={selectedSymptoms.includes(symptom.id)}
                          onCheckedChange={(checked) => {
                            setSelectedSymptoms((prev) =>
                              checked ? [...prev, symptom.id] : prev.filter((id) => id !== symptom.id)
                            );
                          }}
                        />
                        <span className="text-sm">{symptom.name}</span>
                      </label>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {selectedSymptoms.length} symptom(s) selected
              </p>
              <Button onClick={handleDiagnose} disabled={selectedSymptoms.length === 0} className="gap-2">
                <Zap className="h-4 w-4" />
                Run Diagnosis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && result && (
          <div className="animate-fade-in-up space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Diagnosis Results</h2>
              <Button variant="outline" onClick={reset} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> New Diagnosis
              </Button>
            </div>

            {result.results.length === 0 ? (
              <Card className="border-destructive/30">
                <CardContent className="pt-6 text-center">
                  <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-3" />
                  <h3 className="font-display text-lg font-bold mb-2">No Disease Matched</h3>
                  <p className="text-muted-foreground text-sm">The selected symptoms did not match any known disease rules. Try selecting more or different symptoms.</p>
                </CardContent>
              </Card>
            ) : (
              result.results.map((res, i) => (
                <Card key={res.disease.id} className={`${i === 0 ? "ring-2 ring-primary border-primary/30" : "border-primary/10"}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {i === 0 && <Badge className="bg-primary text-primary-foreground">Top Match</Badge>}
                          <Badge variant="outline">{plantIcons[res.disease.plant]} {res.disease.plant}</Badge>
                        </div>
                        <CardTitle className="text-xl">{res.disease.name}</CardTitle>
                        <CardDescription className="mt-1">{res.disease.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-2xl font-bold text-primary">{res.confidence.toFixed(0)}%</div>
                        <div className="text-xs text-muted-foreground">confidence</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Matched Symptoms */}
                    <div>
                      <h4 className="font-display text-sm font-bold mb-2 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-primary" /> Matched Symptoms
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {res.matchedSymptoms.map((s) => (
                          <Badge key={s.id} variant="secondary" className="text-xs">{s.name}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Treatment */}
                    <div className="bg-primary/5 rounded-lg p-4">
                      <h4 className="font-display text-sm font-bold mb-1 flex items-center gap-1">
                        💊 Suggested Treatment
                      </h4>
                      <p className="text-sm text-muted-foreground">{res.disease.treatment}</p>
                    </div>

                    {/* Fired Rules */}
                    <div>
                      <h4 className="font-display text-sm font-bold mb-2">🔗 Production Rules That Fired ({res.firedRules.length})</h4>
                      <div className="space-y-2">
                        {res.firedRules.map((rule) => (
                          <div key={rule.id} className="bg-muted rounded-lg p-3 text-xs font-mono">
                            <span className="text-primary font-bold">IF</span>{" "}
                            {rule.conditions.map((cid, j) => {
                              const sym = knowledgeBase.symptoms.find((s) => s.id === cid);
                              return (
                                <span key={cid}>
                                  {j > 0 && <span className="text-primary font-bold"> AND </span>}
                                  <span className={selectedSymptoms.includes(cid) ? "text-foreground font-bold" : "text-muted-foreground"}>
                                    {sym?.name || cid}
                                  </span>
                                </span>
                              );
                            })}{" "}
                            <span className="text-primary font-bold">THEN</span>{" "}
                            <span className="font-bold">{res.disease.name}</span>{" "}
                            <span className="text-muted-foreground">(weight: {rule.weight})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {/* Explanation Facility */}
            <Accordion type="single" collapsible>
              <AccordionItem value="trace">
                <AccordionTrigger className="font-display font-bold">
                  <span className="flex items-center gap-2">
                    <Info className="h-4 w-4" /> Explain Reasoning — Full Inference Trace
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {result.trace.map((t) => (
                      <div key={t.step} className="flex gap-3 text-xs">
                        <Badge variant="outline" className="shrink-0 font-mono">{t.step}</Badge>
                        <Badge className={`shrink-0 text-[10px] ${
                          t.action === "RULE FIRED" ? "bg-primary text-primary-foreground" :
                          t.action === "RULE SKIPPED" ? "bg-muted text-muted-foreground" :
                          t.action === "CONFLICT RESOLUTION" ? "bg-accent text-accent-foreground" :
                          "bg-secondary text-secondary-foreground"
                        }`}>{t.action}</Badge>
                        <span className="text-muted-foreground">{t.detail}</span>
                      </div>
                    ))}
                  </div>
                  {result.conflictResolution && (
                    <div className="mt-4 bg-accent/10 rounded-lg p-4">
                      <h4 className="font-display text-sm font-bold mb-1">⚖️ Conflict Resolution</h4>
                      <p className="text-xs text-muted-foreground">{result.conflictResolution}</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
}
