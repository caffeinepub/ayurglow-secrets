import { useState, useMemo } from "react";

export interface RemedyPage {
  title: string;
  path: string;
  category: string;
  keywords: string[];
}

const remedyPages: RemedyPage[] = [
  // Health Remedies
  {
    title: "Immunity Boosting",
    path: "/health-remedies/immunity-boost",
    category: "Health Remedies",
    keywords: ["immunity", "immune", "defense", "turmeric", "tulsi", "chyawanprash", "amla", "vitamin c"],
  },
  {
    title: "Digestive Health",
    path: "/health-remedies/digestion",
    category: "Health Remedies",
    keywords: ["digestion", "digestive", "stomach", "triphala", "ginger", "cumin", "ajwain", "bloating", "gas"],
  },
  {
    title: "Weight Management",
    path: "/health-remedies/weight-management",
    category: "Health Remedies",
    keywords: ["weight", "loss", "metabolism", "fat", "lemon", "honey", "green tea", "detox"],
  },
  {
    title: "Diabetes & Blood Pressure",
    path: "/health-remedies/diabetes-bp",
    category: "Health Remedies",
    keywords: ["diabetes", "blood sugar", "blood pressure", "bp", "fenugreek", "bitter gourd", "cinnamon", "garlic"],
  },
  {
    title: "Stress & Sleep",
    path: "/health-remedies/stress-sleep",
    category: "Health Remedies",
    keywords: ["stress", "sleep", "anxiety", "insomnia", "ashwagandha", "brahmi", "chamomile", "lavender", "relaxation"],
  },
  // Skin Care
  {
    title: "Natural Glow",
    path: "/skin-care/natural-glow",
    category: "Skin Care",
    keywords: ["glow", "radiant", "bright", "turmeric", "saffron", "aloe vera", "papaya", "face mask"],
  },
  {
    title: "Acne Treatment",
    path: "/skin-care/acne-treatment",
    category: "Skin Care",
    keywords: ["acne", "pimples", "breakout", "neem", "tea tree", "sandalwood", "antibacterial"],
  },
  {
    title: "Pigmentation Reduction",
    path: "/skin-care/pigmentation",
    category: "Skin Care",
    keywords: ["pigmentation", "dark spots", "melasma", "brightening", "lemon", "potato", "vitamin c"],
  },
  {
    title: "Anti-Aging",
    path: "/skin-care/anti-aging",
    category: "Skin Care",
    keywords: ["anti-aging", "wrinkles", "fine lines", "collagen", "almond", "avocado", "rose water"],
  },
  {
    title: "DIY Face Packs",
    path: "/skin-care/diy-face-packs",
    category: "Skin Care",
    keywords: ["face pack", "face mask", "multani mitti", "besan", "oatmeal", "sandalwood", "diy"],
  },
  // Hair Care
  {
    title: "Hair Fall Treatment",
    path: "/hair-care/hair-fall-treatment",
    category: "Hair Care",
    keywords: ["hair fall", "hair loss", "thinning", "onion", "fenugreek", "curry leaves", "amla"],
  },
  {
    title: "Hair Growth",
    path: "/hair-care/hair-growth",
    category: "Hair Care",
    keywords: ["hair growth", "long hair", "thick hair", "castor oil", "hibiscus", "bhringraj"],
  },
  {
    title: "Dandruff & Scalp Care",
    path: "/hair-care/dandruff-scalp-care",
    category: "Hair Care",
    keywords: ["dandruff", "scalp", "itchy", "flakes", "neem", "tea tree", "lemon", "yogurt"],
  },
  {
    title: "Grey Hair Solutions",
    path: "/hair-care/grey-hair-solutions",
    category: "Hair Care",
    keywords: ["grey hair", "gray hair", "white hair", "premature greying", "henna", "amla", "curry leaves"],
  },
  {
    title: "Ayurvedic Oils & Masks",
    path: "/hair-care/oils-masks",
    category: "Hair Care",
    keywords: ["hair oil", "hair mask", "coconut oil", "castor oil", "almond oil", "deep conditioning"],
  },
];

export function useRemedySearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRemedies = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return remedyPages.filter(
      (remedy) =>
        remedy.title.toLowerCase().includes(query) ||
        remedy.category.toLowerCase().includes(query) ||
        remedy.keywords.some((keyword) => keyword.includes(query))
    );
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredRemedies,
    allRemedies: remedyPages,
  };
}
