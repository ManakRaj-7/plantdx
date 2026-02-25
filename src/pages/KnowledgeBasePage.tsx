import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useKnowledgeBase } from "@/hooks/useKnowledgeBase";

const plantIcons: Record<string, string> = { tomato: "🍅", potato: "🥔", chilli: "🌶️" };

export default function KnowledgeBasePage() {
  const { knowledgeBase } = useKnowledgeBase();
  const [search, setSearch] = useState("");
  const [plantFilter, setPlantFilter] = useState<string>("all");

  const filteredDiseases = useMemo(() => {
    return knowledgeBase.diseases.filter((d) => {
      const matchesPlant = plantFilter === "all" || d.plant === plantFilter;
      const matchesSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase());
      return matchesPlant && matchesSearch;
    });
  }, [knowledgeBase, search, plantFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-primary" />
          Knowledge Base
        </h1>
        <p className="text-muted-foreground mb-6">Browse all diseases, their production rules, symptoms, and treatments.</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search diseases..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={plantFilter} onValueChange={setPlantFilter}>
            <SelectTrigger className="w-[160px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plants</SelectItem>
              <SelectItem value="tomato">🍅 Tomato</SelectItem>
              <SelectItem value="potato">🥔 Potato</SelectItem>
              <SelectItem value="chilli">🌶️ Chilli</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          Showing {filteredDiseases.length} of {knowledgeBase.diseases.length} diseases
        </div>

        <div className="space-y-4">
          {filteredDiseases.map((disease) => (
            <Card key={disease.id} className="border-primary/10">
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">{plantIcons[disease.plant]} {disease.plant}</Badge>
                  <Badge variant="secondary">{disease.rules.length} rules</Badge>
                </div>
                <CardTitle>{disease.name}</CardTitle>
                <CardDescription>{disease.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/5 rounded-lg p-3">
                  <h4 className="text-sm font-bold mb-1">💊 Treatment</h4>
                  <p className="text-sm text-muted-foreground">{disease.treatment}</p>
                </div>

                <Accordion type="single" collapsible>
                  <AccordionItem value="rules">
                    <AccordionTrigger className="text-sm font-bold">Production Rules ({disease.rules.length})</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {disease.rules.map((rule) => (
                          <div key={rule.id} className="bg-muted rounded-lg p-3 text-xs font-mono">
                            <span className="text-primary font-bold">IF</span>{" "}
                            {rule.conditions.map((cid, j) => {
                              const sym = knowledgeBase.symptoms.find((s) => s.id === cid);
                              return (
                                <span key={cid}>
                                  {j > 0 && <span className="text-primary font-bold"> AND </span>}
                                  {sym?.name || cid}
                                </span>
                              );
                            })}{" "}
                            <span className="text-primary font-bold">THEN</span>{" "}
                            <span className="font-bold">{disease.name}</span>{" "}
                            <span className="text-muted-foreground">(weight: {rule.weight})</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
