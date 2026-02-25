import { useState, useEffect } from "react";
import { KnowledgeBase, defaultKnowledgeBase } from "@/data/knowledgeBase";

const STORAGE_KEY = "plant-expert-kb";

export function useKnowledgeBase() {
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return defaultKnowledgeBase;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(knowledgeBase));
  }, [knowledgeBase]);

  const resetToDefaults = () => {
    setKnowledgeBase(defaultKnowledgeBase);
  };

  return { knowledgeBase, setKnowledgeBase, resetToDefaults };
}
