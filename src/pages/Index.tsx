import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Stethoscope, BookOpen, Shield, ArrowRight, Bug, Sprout, Flower2 } from "lucide-react";
import Navbar from "@/components/Navbar";

const stats = [
  { label: "Plant Species", value: "3", icon: Sprout, color: "text-plant-emerald" },
  { label: "Diseases Covered", value: "12", icon: Bug, color: "text-plant-berry" },
  { label: "Production Rules", value: "36", icon: Shield, color: "text-plant-sky" },
  { label: "Symptoms Tracked", value: "43", icon: Flower2, color: "text-plant-sun" },
];

const features = [
  {
    title: "Smart Diagnosis",
    description: "Select your plant and symptoms — our forward chaining inference engine identifies diseases instantly.",
    icon: Stethoscope,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Full Explainability",
    description: "See exactly which production rules fired, the inference trace, and conflict resolution reasoning.",
    icon: BookOpen,
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    title: "Knowledge Base",
    description: "Browse 12 diseases across Tomato, Potato, and Chilli plants with IF-THEN rule definitions.",
    icon: Leaf,
    color: "bg-plant-emerald/15 text-plant-emerald",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/30 to-plant-lime/10" />
        <div className="container relative py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Leaf className="h-4 w-4" />
              Rule-Based Expert System
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl mb-6">
              Plant Disease{" "}
              <span className="text-primary">Diagnosis</span>{" "}
              Expert System
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              A classical AI diagnostic tool using production rules and forward chaining inference.
              Select symptoms, get accurate diagnoses with full reasoning explanations — no ML, no black boxes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2 text-base">
                <Link to="/diagnosis">
                  <Stethoscope className="h-5 w-5" />
                  Start Diagnosis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 text-base">
                <Link to="/knowledge-base">
                  <BookOpen className="h-5 w-5" />
                  View Knowledge Base
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center border-primary/10 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <div className="font-display text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container py-12">
        <h2 className="font-display text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card key={f.title} className="border-primary/10 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className={`inline-flex rounded-xl p-3 mb-4 ${f.color}`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            <Leaf className="h-4 w-4 text-primary" />
            PlantDoc AI — Rule-Based Expert System for Plant Disease Diagnosis
          </p>
          <p className="mt-1">Academic AI Project • Production Rules • Forward Chaining</p>
        </div>
      </footer>
    </div>
  );
}
