import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Settings, Plus, Pencil, Trash2, RotateCcw, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useKnowledgeBase } from "@/hooks/useKnowledgeBase";
import { Disease, ProductionRule, Symptom } from "@/data/knowledgeBase";
import { useToast } from "@/hooks/use-toast";

const plantIcons: Record<string, string> = { tomato: "🍅", potato: "🥔", chilli: "🌶️" };

export default function AdminPage() {
  const { knowledgeBase, setKnowledgeBase, resetToDefaults } = useKnowledgeBase();
  const { toast } = useToast();
  const [editingDisease, setEditingDisease] = useState<Disease | null>(null);
  const [isAddingDisease, setIsAddingDisease] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formPlant, setFormPlant] = useState<string>("tomato");
  const [formDesc, setFormDesc] = useState("");
  const [formTreatment, setFormTreatment] = useState("");

  const openAddDialog = () => {
    setFormName(""); setFormPlant("tomato"); setFormDesc(""); setFormTreatment("");
    setIsAddingDisease(true);
  };

  const openEditDialog = (d: Disease) => {
    setFormName(d.name); setFormPlant(d.plant); setFormDesc(d.description); setFormTreatment(d.treatment);
    setEditingDisease(d);
  };

  const saveDisease = () => {
    if (!formName.trim()) return;

    if (editingDisease) {
      setKnowledgeBase((prev) => ({
        ...prev,
        diseases: prev.diseases.map((d) =>
          d.id === editingDisease.id
            ? { ...d, name: formName, plant: formPlant as Disease["plant"], description: formDesc, treatment: formTreatment }
            : d
        ),
      }));
      setEditingDisease(null);
      toast({ title: "Disease updated", description: `"${formName}" has been updated.` });
    } else {
      const newId = `d_${Date.now()}`;
      const newDisease: Disease = {
        id: newId,
        name: formName,
        plant: formPlant as Disease["plant"],
        description: formDesc,
        treatment: formTreatment,
        rules: [],
      };
      setKnowledgeBase((prev) => ({ ...prev, diseases: [...prev.diseases, newDisease] }));
      setIsAddingDisease(false);
      toast({ title: "Disease added", description: `"${formName}" has been added.` });
    }
  };

  const deleteDisease = (id: string) => {
    const disease = knowledgeBase.diseases.find((d) => d.id === id);
    setKnowledgeBase((prev) => ({ ...prev, diseases: prev.diseases.filter((d) => d.id !== id) }));
    toast({ title: "Disease deleted", description: `"${disease?.name}" has been removed.`, variant: "destructive" });
  };

  const addRuleToDisease = (diseaseId: string) => {
    const disease = knowledgeBase.diseases.find((d) => d.id === diseaseId);
    if (!disease) return;
    const plantSymptoms = knowledgeBase.symptoms.filter((s) => s.plants.includes(disease.plant));
    if (plantSymptoms.length < 2) return;

    const newRule: ProductionRule = {
      id: `r_${Date.now()}`,
      conditions: [plantSymptoms[0].id, plantSymptoms[1].id],
      conclusion: diseaseId,
      weight: 5,
    };
    setKnowledgeBase((prev) => ({
      ...prev,
      diseases: prev.diseases.map((d) =>
        d.id === diseaseId ? { ...d, rules: [...d.rules, newRule] } : d
      ),
    }));
    toast({ title: "Rule added", description: `New rule added to "${disease.name}".` });
  };

  const deleteRule = (diseaseId: string, ruleId: string) => {
    setKnowledgeBase((prev) => ({
      ...prev,
      diseases: prev.diseases.map((d) =>
        d.id === diseaseId ? { ...d, rules: d.rules.filter((r) => r.id !== ruleId) } : d
      ),
    }));
  };

  const handleReset = () => {
    resetToDefaults();
    setConfirmReset(false);
    toast({ title: "Reset complete", description: "Knowledge base restored to defaults." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold flex items-center gap-2">
              <Settings className="h-7 w-7 text-primary" /> Admin Panel
            </h1>
            <p className="text-muted-foreground">Manage diseases, rules, and symptoms. Changes are saved to localStorage.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setConfirmReset(true)} className="gap-1 text-destructive">
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
            <Button size="sm" onClick={openAddDialog} className="gap-1">
              <Plus className="h-4 w-4" /> Add Disease
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {knowledgeBase.diseases.map((disease) => (
            <Card key={disease.id} className="border-primary/10">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{plantIcons[disease.plant]} {disease.plant}</Badge>
                      <Badge variant="secondary">{disease.rules.length} rules</Badge>
                    </div>
                    <CardTitle className="text-lg">{disease.name}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(disease)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteDisease(disease.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-muted-foreground">{disease.description}</p>
                <div className="space-y-1">
                  {disease.rules.map((rule) => (
                    <div key={rule.id} className="flex items-center justify-between bg-muted rounded p-2 text-xs font-mono">
                      <span>
                        <span className="text-primary font-bold">IF</span>{" "}
                        {rule.conditions.map((cid) => knowledgeBase.symptoms.find((s) => s.id === cid)?.name || cid).join(" AND ")}{" "}
                        <span className="text-primary font-bold">THEN</span> {disease.name} (w:{rule.weight})
                      </span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => deleteRule(disease.id, rule.id)}>
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={() => addRuleToDisease(disease.id)} className="gap-1 text-xs">
                  <Plus className="h-3 w-3" /> Add Rule
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add/Edit Disease Dialog */}
        <Dialog open={isAddingDisease || !!editingDisease} onOpenChange={() => { setIsAddingDisease(false); setEditingDisease(null); }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingDisease ? "Edit Disease" : "Add New Disease"}</DialogTitle>
              <DialogDescription>Fill in the disease details below.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Disease Name</Label>
                <Input value={formName} onChange={(e) => setFormName(e.target.value)} />
              </div>
              <div>
                <Label>Plant</Label>
                <Select value={formPlant} onValueChange={setFormPlant}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tomato">🍅 Tomato</SelectItem>
                    <SelectItem value="potato">🥔 Potato</SelectItem>
                    <SelectItem value="chilli">🌶️ Chilli</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={formDesc} onChange={(e) => setFormDesc(e.target.value)} />
              </div>
              <div>
                <Label>Treatment</Label>
                <Textarea value={formTreatment} onChange={(e) => setFormTreatment(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={saveDisease}>{editingDisease ? "Save Changes" : "Add Disease"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reset Confirmation */}
        <Dialog open={confirmReset} onOpenChange={setConfirmReset}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" /> Reset Knowledge Base
              </DialogTitle>
              <DialogDescription>This will delete all custom changes and restore the default 12 diseases with 36 rules. This cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmReset(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleReset}>Reset to Defaults</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
