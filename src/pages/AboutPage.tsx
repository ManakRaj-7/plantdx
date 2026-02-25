import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, ArrowRight, Leaf } from "lucide-react";
import Navbar from "@/components/Navbar";

const architectureSteps = [
  { label: "User Interface", emoji: "🖥️", desc: "User selects plant and symptoms via checkboxes" },
  { label: "Inference Engine", emoji: "⚙️", desc: "Forward chaining matches symptoms against production rules" },
  { label: "Knowledge Base", emoji: "📚", desc: "Structured JSON with 12 diseases, 36 IF-THEN rules" },
  { label: "Explanation Facility", emoji: "🔍", desc: "Displays fired rules, trace, and conflict resolution" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-2">
          <Info className="h-7 w-7 text-primary" /> System Architecture
        </h1>
        <p className="text-muted-foreground mb-8">Understanding the components of our rule-based expert system.</p>

        {/* Architecture Diagram */}
        <Card className="mb-8 border-primary/10 overflow-hidden">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-lg">Expert System Architecture Diagram</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3">
              {architectureSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div className="bg-card border rounded-xl p-4 text-center min-w-[140px] shadow-sm">
                    <div className="text-3xl mb-2">{step.emoji}</div>
                    <div className="font-display text-sm font-bold">{step.label}</div>
                    <div className="text-[10px] text-muted-foreground mt-1">{step.desc}</div>
                  </div>
                  {i < architectureSteps.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Forward Chaining */}
        <Card className="mb-6 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">⚙️ Forward Chaining Inference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p><strong>Forward chaining</strong> is a data-driven reasoning strategy. It starts with known facts (user-selected symptoms) and applies production rules to derive conclusions (disease diagnosis).</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Initialize</strong>: User-selected symptoms are loaded into working memory as facts.</li>
              <li><strong>Match</strong>: All production rules are evaluated against the working memory.</li>
              <li><strong>Conflict Resolution</strong>: When multiple rules fire, the system selects the rule with the highest weighted match score (matched conditions × rule weight).</li>
              <li><strong>Execute</strong>: The winning rule's conclusion becomes the diagnosis.</li>
              <li><strong>Explain</strong>: Full inference trace is generated showing every step.</li>
            </ol>
          </CardContent>
        </Card>

        {/* Production Rules */}
        <Card className="mb-6 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">📜 Production Rule Format</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">Each disease is defined by multiple production rules in the standard IF-THEN format:</p>
            <div className="bg-muted rounded-lg p-4 font-mono text-xs">
              <p><span className="text-primary font-bold">IF</span> symptom_A <span className="text-primary font-bold">AND</span> symptom_B <span className="text-primary font-bold">AND</span> symptom_C</p>
              <p><span className="text-primary font-bold">THEN</span> Disease_X <span className="text-muted-foreground">(weight: 9)</span></p>
            </div>
            <p className="text-muted-foreground">Rules include a <strong>weight factor</strong> (1-10) representing the diagnostic importance. Higher weights indicate stronger rule-conclusion relationships.</p>
          </CardContent>
        </Card>

        {/* Conflict Resolution */}
        <Card className="mb-6 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">⚖️ Conflict Resolution Strategy</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>When multiple diseases match the selected symptoms, the system uses a <strong>weighted scoring</strong> strategy:</p>
            <div className="bg-muted rounded-lg p-4 font-mono text-xs">
              Score = (matched_conditions / total_conditions) × rule_weight
            </div>
            <p>The disease with the highest score is selected as the primary diagnosis. All matching diseases are still shown, ranked by their scores.</p>
          </CardContent>
        </Card>

        {/* MYCIN Reference */}
        <Card className="mb-6 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">🏛️ Historical Context — MYCIN</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>This system is inspired by <strong>MYCIN</strong> (1976), one of the earliest expert systems developed at Stanford University for diagnosing bacterial infections and recommending antibiotics.</p>
            <p>Like MYCIN, our system uses:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Production rules (IF-THEN) for knowledge representation</li>
              <li>Certainty factors (weights) for handling uncertainty</li>
              <li>An explanation facility for transparency</li>
              <li>Separation of knowledge base from inference engine</li>
            </ul>
            <p>Unlike MYCIN which used <strong>backward chaining</strong>, our system employs <strong>forward chaining</strong> — starting from symptoms (data) rather than hypotheses.</p>
          </CardContent>
        </Card>

        {/* Academic Context */}
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">🎓 Academic Context</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>This project demonstrates key concepts from Artificial Intelligence:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Knowledge Representation", "Expert Systems", "Production Systems", "Forward Chaining", "Conflict Resolution", "Inference Engine", "Explanation Facility", "Certainty Factors"].map((topic) => (
                <Badge key={topic} variant="secondary">{topic}</Badge>
              ))}
            </div>
            <p className="mt-3">
              <strong>Key distinction:</strong> This is a <em>pure rule-based</em> system — no machine learning, neural networks, or external APIs. All reasoning is transparent, traceable, and deterministic.
            </p>
          </CardContent>
        </Card>

        <footer className="border-t py-6 mt-12 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            <Leaf className="h-4 w-4 text-primary" />
            PlantDoc AI — Rule-Based Expert System
          </p>
        </footer>
      </div>
    </div>
  );
}
