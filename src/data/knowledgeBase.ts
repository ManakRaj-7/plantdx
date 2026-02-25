export interface Symptom {
  id: string;
  name: string;
  category: "leaf" | "stem" | "fruit" | "general";
  plants: ("tomato" | "potato" | "chilli")[];
}

export interface ProductionRule {
  id: string;
  conditions: string[]; // symptom IDs
  conclusion: string; // disease ID
  weight: number; // 1-10 importance
}

export interface Disease {
  id: string;
  name: string;
  plant: "tomato" | "potato" | "chilli";
  description: string;
  treatment: string;
  rules: ProductionRule[];
}

export interface KnowledgeBase {
  symptoms: Symptom[];
  diseases: Disease[];
}

export const defaultKnowledgeBase: KnowledgeBase = {
  symptoms: [
    // Tomato symptoms
    { id: "s1", name: "Dark brown spots on lower leaves", category: "leaf", plants: ["tomato"] },
    { id: "s2", name: "Concentric rings on leaf spots", category: "leaf", plants: ["tomato"] },
    { id: "s3", name: "Yellowing around leaf spots", category: "leaf", plants: ["tomato"] },
    { id: "s4", name: "Water-soaked lesions on leaves", category: "leaf", plants: ["tomato"] },
    { id: "s5", name: "White fuzzy growth under leaves", category: "leaf", plants: ["tomato"] },
    { id: "s6", name: "Rapid wilting of entire plant", category: "general", plants: ["tomato"] },
    { id: "s7", name: "Dark brown streaks on stems", category: "stem", plants: ["tomato"] },
    { id: "s8", name: "Upward curling of leaves", category: "leaf", plants: ["tomato"] },
    { id: "s9", name: "Stunted plant growth", category: "general", plants: ["tomato", "potato", "chilli"] },
    { id: "s10", name: "Leaf yellowing (chlorosis)", category: "leaf", plants: ["tomato", "potato", "chilli"] },
    { id: "s11", name: "Thickened and leathery leaves", category: "leaf", plants: ["tomato"] },
    { id: "s12", name: "Wilting during daytime, recovery at night", category: "general", plants: ["tomato"] },
    { id: "s13", name: "Brown discoloration of stem vascular tissue", category: "stem", plants: ["tomato"] },
    { id: "s14", name: "Milky bacterial ooze from cut stems", category: "stem", plants: ["tomato"] },
    { id: "s15", name: "Fruit with dark sunken spots", category: "fruit", plants: ["tomato"] },

    // Potato symptoms
    { id: "s16", name: "Dark brown sclerotia on tuber surface", category: "fruit", plants: ["potato"] },
    { id: "s17", name: "Black crust on potato skin", category: "fruit", plants: ["potato"] },
    { id: "s18", name: "Misshapen tubers", category: "fruit", plants: ["potato"] },
    { id: "s19", name: "White fungal growth on sprouts", category: "stem", plants: ["potato"] },
    { id: "s20", name: "Raised rough patches on tuber skin", category: "fruit", plants: ["potato"] },
    { id: "s21", name: "Corky lesions on tuber surface", category: "fruit", plants: ["potato"] },
    { id: "s22", name: "Shallow pitted areas on tubers", category: "fruit", plants: ["potato"] },
    { id: "s23", name: "Water-soaked brown spots on leaves", category: "leaf", plants: ["potato"] },
    { id: "s24", name: "White mold on leaf undersides", category: "leaf", plants: ["potato"] },
    { id: "s25", name: "Tuber flesh turns brown and rots", category: "fruit", plants: ["potato"] },
    { id: "s26", name: "Mosaic pattern on leaves", category: "leaf", plants: ["potato"] },
    { id: "s27", name: "Leaf crinkling and distortion", category: "leaf", plants: ["potato"] },
    { id: "s28", name: "Reduced tuber size", category: "fruit", plants: ["potato"] },
    { id: "s29", name: "Plant appears bushy and dwarfed", category: "general", plants: ["potato"] },

    // Chilli symptoms
    { id: "s30", name: "Sunken dark spots on fruits", category: "fruit", plants: ["chilli"] },
    { id: "s31", name: "Concentric rings on fruit lesions", category: "fruit", plants: ["chilli"] },
    { id: "s32", name: "Fruit rot and shriveling", category: "fruit", plants: ["chilli"] },
    { id: "s33", name: "Salmon-colored spore mass on fruit", category: "fruit", plants: ["chilli"] },
    { id: "s34", name: "White powdery coating on leaves", category: "leaf", plants: ["chilli"] },
    { id: "s35", name: "Yellow patches on upper leaf surface", category: "leaf", plants: ["chilli"] },
    { id: "s36", name: "Leaf drop (defoliation)", category: "leaf", plants: ["chilli"] },
    { id: "s37", name: "Small water-soaked spots on leaves", category: "leaf", plants: ["chilli"] },
    { id: "s38", name: "Spots turn brown with yellow halo", category: "leaf", plants: ["chilli"] },
    { id: "s39", name: "Raised bumps on leaf undersides", category: "leaf", plants: ["chilli"] },
    { id: "s40", name: "Mosaic/mottled pattern on chilli leaves", category: "leaf", plants: ["chilli"] },
    { id: "s41", name: "Distorted and curled leaves", category: "leaf", plants: ["chilli"] },
    { id: "s42", name: "Reduced fruit production", category: "fruit", plants: ["chilli"] },
    { id: "s43", name: "Fruit deformity", category: "fruit", plants: ["chilli"] },
  ],
  diseases: [
    // === TOMATO DISEASES ===
    {
      id: "d1",
      name: "Early Blight",
      plant: "tomato",
      description: "A fungal disease caused by Alternaria solani. It typically starts on lower, older leaves and progresses upward. Characterized by concentric ring patterns ('target spots').",
      treatment: "Remove infected leaves. Apply copper-based fungicide. Ensure proper spacing for air circulation. Use mulch to prevent soil splash. Practice crop rotation.",
      rules: [
        { id: "r1", conditions: ["s1", "s2", "s3"], conclusion: "d1", weight: 9 },
        { id: "r2", conditions: ["s1", "s2", "s15"], conclusion: "d1", weight: 7 },
        { id: "r3", conditions: ["s1", "s3", "s10"], conclusion: "d1", weight: 6 },
      ],
    },
    {
      id: "d2",
      name: "Late Blight",
      plant: "tomato",
      description: "A devastating disease caused by the oomycete Phytophthora infestans. It spreads rapidly in cool, moist conditions and can destroy entire crops within days.",
      treatment: "Apply systemic fungicide immediately. Remove and destroy all infected plants. Avoid overhead watering. Plant resistant varieties. Monitor weather conditions closely.",
      rules: [
        { id: "r4", conditions: ["s4", "s5", "s7"], conclusion: "d2", weight: 9 },
        { id: "r5", conditions: ["s4", "s5", "s6"], conclusion: "d2", weight: 8 },
        { id: "r6", conditions: ["s4", "s7", "s15"], conclusion: "d2", weight: 7 },
      ],
    },
    {
      id: "d3",
      name: "Leaf Curl Virus",
      plant: "tomato",
      description: "A viral disease transmitted by whiteflies (Bemisia tabaci). Causes severe leaf curling, stunted growth, and significant yield loss.",
      treatment: "Control whitefly population with yellow sticky traps and neem oil. Remove infected plants. Use virus-resistant seed varieties. Apply systemic insecticides if needed.",
      rules: [
        { id: "r7", conditions: ["s8", "s9", "s11"], conclusion: "d3", weight: 9 },
        { id: "r8", conditions: ["s8", "s10", "s9"], conclusion: "d3", weight: 7 },
        { id: "r9", conditions: ["s8", "s11", "s10"], conclusion: "d3", weight: 8 },
      ],
    },
    {
      id: "d4",
      name: "Bacterial Wilt",
      plant: "tomato",
      description: "Caused by Ralstonia solanacearum. The bacterium enters through roots and blocks water-conducting vessels, causing rapid wilting without yellowing.",
      treatment: "No chemical cure available. Remove and destroy infected plants. Solarize soil before replanting. Use resistant rootstock. Improve soil drainage. Practice long crop rotation (3-4 years).",
      rules: [
        { id: "r10", conditions: ["s12", "s13", "s14"], conclusion: "d4", weight: 10 },
        { id: "r11", conditions: ["s6", "s12", "s13"], conclusion: "d4", weight: 8 },
        { id: "r12", conditions: ["s12", "s14", "s6"], conclusion: "d4", weight: 9 },
      ],
    },

    // === POTATO DISEASES ===
    {
      id: "d5",
      name: "Black Scurf",
      plant: "potato",
      description: "Caused by the fungus Rhizoctonia solani. Forms black, hard masses (sclerotia) on tuber surface. Can cause stem canker and reduce emergence.",
      treatment: "Use certified disease-free seed tubers. Treat seed with fungicide before planting. Ensure proper soil drainage. Harvest promptly when mature. Practice crop rotation.",
      rules: [
        { id: "r13", conditions: ["s16", "s17", "s18"], conclusion: "d5", weight: 9 },
        { id: "r14", conditions: ["s16", "s19", "s17"], conclusion: "d5", weight: 8 },
        { id: "r15", conditions: ["s17", "s18", "s9"], conclusion: "d5", weight: 6 },
      ],
    },
    {
      id: "d6",
      name: "Common Scab",
      plant: "potato",
      description: "Caused by Streptomyces scabies. Creates rough, corky lesions on tuber surface. Favored by dry, alkaline soil conditions.",
      treatment: "Maintain soil pH between 5.0-5.2. Ensure consistent soil moisture. Use scab-resistant varieties. Avoid adding lime before planting. Apply sulfur to lower soil pH.",
      rules: [
        { id: "r16", conditions: ["s20", "s21", "s22"], conclusion: "d6", weight: 9 },
        { id: "r17", conditions: ["s20", "s21", "s18"], conclusion: "d6", weight: 7 },
        { id: "r18", conditions: ["s21", "s22", "s28"], conclusion: "d6", weight: 6 },
      ],
    },
    {
      id: "d7",
      name: "Potato Late Blight",
      plant: "potato",
      description: "Same pathogen as tomato late blight (Phytophthora infestans). Historically caused the Irish Potato Famine. Rapidly destroys foliage and tubers.",
      treatment: "Apply preventive fungicides before symptoms appear. Remove and destroy infected plants. Avoid overhead irrigation. Hill potatoes to protect tubers. Use resistant varieties.",
      rules: [
        { id: "r19", conditions: ["s23", "s24", "s25"], conclusion: "d7", weight: 10 },
        { id: "r20", conditions: ["s23", "s24", "s10"], conclusion: "d7", weight: 8 },
        { id: "r21", conditions: ["s23", "s25", "s6"], conclusion: "d7", weight: 7 },
      ],
    },
    {
      id: "d8",
      name: "Potato Mosaic Virus",
      plant: "potato",
      description: "A viral disease spread by aphids. Causes mosaic patterns, leaf distortion, and significant yield reduction over generations.",
      treatment: "Use certified virus-free seed tubers. Control aphid populations with insecticides or natural predators. Remove infected plants promptly. Plant resistant varieties.",
      rules: [
        { id: "r22", conditions: ["s26", "s27", "s28"], conclusion: "d8", weight: 9 },
        { id: "r23", conditions: ["s26", "s27", "s29"], conclusion: "d8", weight: 8 },
        { id: "r24", conditions: ["s26", "s9", "s29"], conclusion: "d8", weight: 7 },
      ],
    },

    // === CHILLI DISEASES ===
    {
      id: "d9",
      name: "Anthracnose",
      plant: "chilli",
      description: "Caused by Colletotrichum species. Primarily attacks fruits, creating sunken lesions with concentric rings. Major post-harvest disease.",
      treatment: "Use disease-free seeds. Apply fungicide sprays (mancozeb/copper). Remove infected fruits immediately. Ensure good air circulation. Avoid overhead irrigation. Practice crop rotation.",
      rules: [
        { id: "r25", conditions: ["s30", "s31", "s32"], conclusion: "d9", weight: 9 },
        { id: "r26", conditions: ["s30", "s33", "s32"], conclusion: "d9", weight: 10 },
        { id: "r27", conditions: ["s30", "s31", "s42"], conclusion: "d9", weight: 7 },
      ],
    },
    {
      id: "d10",
      name: "Powdery Mildew",
      plant: "chilli",
      description: "Caused by Leveillula taurica. Forms white powdery patches on leaf surfaces. Reduces photosynthesis and can cause severe defoliation.",
      treatment: "Apply sulfur-based fungicide. Use neem oil spray. Ensure proper plant spacing. Remove heavily infected leaves. Avoid excess nitrogen fertilization.",
      rules: [
        { id: "r28", conditions: ["s34", "s35", "s36"], conclusion: "d10", weight: 9 },
        { id: "r29", conditions: ["s34", "s35", "s10"], conclusion: "d10", weight: 8 },
        { id: "r30", conditions: ["s34", "s36", "s42"], conclusion: "d10", weight: 7 },
      ],
    },
    {
      id: "d11",
      name: "Bacterial Leaf Spot",
      plant: "chilli",
      description: "Caused by Xanthomonas campestris. Creates small, water-soaked spots that enlarge and turn brown. Spreads rapidly in warm, humid conditions.",
      treatment: "Apply copper-based bactericide. Use disease-free transplants. Avoid working with wet plants. Practice crop rotation (2-3 years). Remove plant debris after harvest.",
      rules: [
        { id: "r31", conditions: ["s37", "s38", "s39"], conclusion: "d11", weight: 9 },
        { id: "r32", conditions: ["s37", "s38", "s36"], conclusion: "d11", weight: 8 },
        { id: "r33", conditions: ["s37", "s39", "s42"], conclusion: "d11", weight: 6 },
      ],
    },
    {
      id: "d12",
      name: "Chilli Mosaic Virus",
      plant: "chilli",
      description: "A viral disease transmitted by aphids and through mechanical contact. Causes distinctive mosaic patterns, leaf distortion, and fruit deformity.",
      treatment: "Remove and destroy infected plants immediately. Control aphid vectors with insecticides. Use virus-resistant varieties. Disinfect tools between plants. Use reflective mulches to repel aphids.",
      rules: [
        { id: "r34", conditions: ["s40", "s41", "s9"], conclusion: "d12", weight: 9 },
        { id: "r35", conditions: ["s40", "s41", "s43"], conclusion: "d12", weight: 8 },
        { id: "r36", conditions: ["s40", "s42", "s43"], conclusion: "d12", weight: 7 },
      ],
    },
  ],
};
