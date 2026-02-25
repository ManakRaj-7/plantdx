

# 🌿 Plant Disease Expert System — Rule-Based AI Diagnostic Tool

## Overview
A portfolio-worthy, rule-based expert system web app for diagnosing plant diseases using classical AI techniques (production rules + forward chaining). Designed for academic submission with full explainability and a polished, plant-themed UI.

---

## Pages & Features

### 1. **Home / Landing Page**
- Welcoming plant-themed hero section with illustration vibes (greens, leaves, friendly tone)
- Brief explanation of what the system does
- "Start Diagnosis" call-to-action button
- Quick stats: number of diseases, rules, and plants covered

### 2. **Diagnosis Page** (Core Feature)
- **Step 1 — Select Plant**: Choose from Tomato, Potato, Chilli (with plant icons)
- **Step 2 — Select Symptoms**: Checkboxes grouped by category (leaf, stem, fruit, general) — symptoms filter based on selected plant
- **Step 3 — Run Diagnosis**: Triggers the forward chaining inference engine
- **Results Panel** displaying:
  - 🏷️ Diagnosed disease name
  - 📊 Confidence score (% based on matched symptoms vs total rule conditions)
  - 💊 Suggested treatment
  - 🔍 "Explain Reasoning" expandable section showing:
    - Which production rules fired (in IF-THEN format)
    - Full inference trace (step-by-step rule execution log)
    - Conflict resolution explanation (why the winning rule was chosen)

### 3. **Knowledge Base Viewer**
- Browse all diseases organized by plant
- View each disease's production rules in readable IF-THEN format
- See symptoms, treatments, and certainty factors for each disease
- Searchable and filterable

### 4. **Admin Panel**
- Add, edit, or delete diseases
- Add, edit, or delete production rules per disease
- Manage symptoms list
- All stored in structured JSON format (client-side, no backend needed)
- Data persisted in localStorage so rules survive page refreshes

### 5. **Architecture / About Page**
- Visual architecture diagram showing: User Interface → Inference Engine → Knowledge Base → Explanation Facility
- Explanation of forward chaining methodology
- Comparison to classic systems (MYCIN reference)
- Academic context section

---

## Technical Architecture (Internal)

### Knowledge Base
- Structured JSON containing 12+ diseases across 3 plants
- Each disease has multiple production rules with weighted conditions
- Symptoms categorized by plant and type

### Inference Engine
- **Forward chaining**: starts from user symptoms, matches against all rules
- **Conflict resolution**: when multiple diseases match, selects the one with the highest number of matched conditions (certainty factor)
- **Inference trace**: logs every rule evaluated, matched, or skipped

### Explanation Facility
- Shows which rules fired and why
- Displays the chain of reasoning in human-readable format

### No backend required
- Everything runs client-side with JSON knowledge base
- Admin changes saved to localStorage
- No ML, no APIs — pure rule-based logic

---

## Design & Theme
- **Colorful & friendly** plant-themed design
- Green palette with leaf/nature accents
- Friendly illustrations and plant icons
- Clean card-based layouts perfect for report screenshots
- Responsive design (works on mobile too)

---

## Disease Coverage (12 diseases)

**Tomato**: Early Blight, Late Blight, Leaf Curl Virus, Bacterial Wilt
**Potato**: Black Scurf, Common Scab, Late Blight, Potato Mosaic Virus
**Chilli**: Anthracnose, Powdery Mildew, Bacterial Leaf Spot, Chilli Mosaic Virus

Each with 4-6 symptom-based production rules and treatment recommendations.

