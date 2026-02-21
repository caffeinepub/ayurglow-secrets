export interface RemedyPage {
  path: string;
  title: string;
  category: string;
  keywords: string[];
}

export const remedyPages: RemedyPage[] = [
  // Health Remedies
  {
    path: '/health-remedies/immunity-boosting',
    title: 'Immunity Boosting Remedies',
    category: 'Health',
    keywords: ['immunity', 'immune', 'defense', 'health', 'boost', 'strengthen', 'protection', 'wellness'],
  },
  {
    path: '/health-remedies/digestion-gut-health',
    title: 'Digestion & Gut Health',
    category: 'Health',
    keywords: ['digestion', 'gut', 'stomach', 'agni', 'digestive', 'health', 'intestine', 'bloating'],
  },
  {
    path: '/health-remedies/weight-management',
    title: 'Weight Management',
    category: 'Health',
    keywords: ['weight', 'loss', 'management', 'diet', 'fat', 'slim', 'healthy', 'balance'],
  },
  {
    path: '/health-remedies/diabetes-bp-support',
    title: 'Diabetes & BP Support',
    category: 'Health',
    keywords: ['diabetes', 'blood pressure', 'bp', 'sugar', 'glucose', 'hypertension', 'health'],
  },
  {
    path: '/health-remedies/stress-sleep-solutions',
    title: 'Stress & Sleep Solutions',
    category: 'Health',
    keywords: ['stress', 'sleep', 'insomnia', 'anxiety', 'relaxation', 'calm', 'rest', 'peace'],
  },
  // Skin Care
  {
    path: '/skin-care/natural-glow',
    title: 'Natural Glow Remedies',
    category: 'Skin Care',
    keywords: ['glow', 'radiant', 'skin', 'beauty', 'luminous', 'bright', 'complexion', 'face'],
  },
  {
    path: '/skin-care/acne-pimples',
    title: 'Acne & Pimples',
    category: 'Skin Care',
    keywords: ['acne', 'pimples', 'breakout', 'clear', 'skin', 'blemish', 'spots', 'face'],
  },
  {
    path: '/skin-care/pigmentation-dark-spots',
    title: 'Pigmentation & Dark Spots',
    category: 'Skin Care',
    keywords: ['pigmentation', 'dark spots', 'spots', 'skin', 'even tone', 'fade', 'discoloration'],
  },
  {
    path: '/skin-care/anti-aging',
    title: 'Anti-Aging Ayurveda',
    category: 'Skin Care',
    keywords: ['anti-aging', 'wrinkles', 'aging', 'youthful', 'skin', 'fine lines', 'rejuvenation'],
  },
  {
    path: '/skin-care/diy-face-packs',
    title: 'DIY Herbal Face Packs',
    category: 'Skin Care',
    keywords: ['face pack', 'mask', 'diy', 'herbal', 'skin', 'homemade', 'natural', 'treatment'],
  },
  // Hair Care
  {
    path: '/hair-care/hair-fall-treatment',
    title: 'Hair Fall Treatment',
    category: 'Hair Care',
    keywords: ['hair fall', 'hair loss', 'shedding', 'hair', 'treatment', 'stop', 'prevent'],
  },
  {
    path: '/hair-care/hair-growth',
    title: 'Hair Growth Remedies',
    category: 'Hair Care',
    keywords: ['hair growth', 'grow', 'hair', 'stimulate', 'thick', 'long', 'healthy'],
  },
  {
    path: '/hair-care/dandruff-scalp-care',
    title: 'Dandruff & Scalp Care',
    category: 'Hair Care',
    keywords: ['dandruff', 'scalp', 'flakes', 'itchy', 'hair', 'care', 'treatment', 'healthy'],
  },
  {
    path: '/hair-care/grey-hair-solutions',
    title: 'Grey Hair Solutions',
    category: 'Hair Care',
    keywords: ['grey hair', 'gray', 'premature', 'greying', 'hair', 'prevent', 'reverse', 'darken'],
  },
  {
    path: '/hair-care/oils-masks',
    title: 'Ayurvedic Oils & Masks',
    category: 'Hair Care',
    keywords: ['oil', 'mask', 'hair', 'treatment', 'nourish', 'conditioning', 'ayurvedic', 'blend'],
  },
];

export function filterRemedies(query: string): RemedyPage[] {
  if (!query.trim()) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();

  return remedyPages.filter((page) => {
    const titleMatch = page.title.toLowerCase().includes(searchTerm);
    const categoryMatch = page.category.toLowerCase().includes(searchTerm);
    const keywordMatch = page.keywords.some((keyword) =>
      keyword.toLowerCase().includes(searchTerm)
    );

    return titleMatch || categoryMatch || keywordMatch;
  });
}
