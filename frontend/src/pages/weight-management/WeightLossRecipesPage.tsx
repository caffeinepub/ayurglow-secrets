import { Link } from '@tanstack/react-router';
import { ArrowLeft, Clock, Leaf } from 'lucide-react';

const recipes = [
  {
    title: 'Moong Dal Detox Soup',
    emoji: '🍲',
    ingredients: ['1/2 cup yellow moong dal', '1 tsp cumin seeds', '1/2 tsp turmeric', '1 tsp ginger (grated)', '2 cups water', 'Rock salt to taste', 'Fresh coriander'],
    steps: [
      'Wash moong dal thoroughly and soak for 30 minutes.',
      'Boil dal with turmeric and water until soft.',
      'In a pan, heat ghee and add cumin seeds.',
      'Add ginger and sauté for 1 minute.',
      'Pour the tempering over the dal soup.',
      'Add rock salt and garnish with coriander.',
    ],
    benefits: ['High protein, low calorie', 'Easy to digest', 'Detoxifies the body', 'Keeps you full longer', 'Balances all three doshas'],
    frequency: 'For dinner 3–4 times a week',
    duration: 'Ongoing as part of healthy diet',
  },
  {
    title: 'Cabbage-Carrot Detox Juice',
    emoji: '🥤',
    ingredients: ['1/4 small cabbage', '2 medium carrots', '1 inch ginger', '1/2 lemon juice', 'Pinch of black salt', '1 cup water'],
    steps: [
      'Wash and chop cabbage and carrots.',
      'Blend with water until smooth.',
      'Strain through a fine mesh strainer.',
      'Add ginger juice, lemon juice, and black salt.',
      'Stir well and drink immediately.',
    ],
    benefits: ['Very low in calories', 'Rich in fiber', 'Boosts metabolism', 'Reduces water retention', 'Improves skin health'],
    frequency: 'Once daily in the morning',
    duration: '4–6 weeks for visible results',
  },
  {
    title: 'Oats-Chia Ayurvedic Breakfast',
    emoji: '🥣',
    ingredients: ['1/2 cup rolled oats', '1 tbsp chia seeds', '1 cup warm almond milk', '1/4 tsp cinnamon', '1 tsp honey', '1 tbsp flaxseeds', 'Fresh fruits for topping'],
    steps: [
      'Soak chia seeds in almond milk for 10 minutes.',
      'Cook oats with remaining milk until creamy.',
      'Mix in soaked chia seeds and flaxseeds.',
      'Add cinnamon and honey.',
      'Top with fresh seasonal fruits.',
      'Serve warm for best digestion.',
    ],
    benefits: ['High fiber content', 'Keeps you full for hours', 'Regulates blood sugar', 'Omega-3 rich', 'Supports healthy gut bacteria'],
    frequency: 'As breakfast 4–5 times a week',
    duration: 'Ongoing as part of healthy diet',
  },
];

export default function WeightLossRecipesPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-leaf to-primary py-16 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            to="/weight-management"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Weight Management
          </Link>
          <div className="text-5xl mb-4">🥗</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Healthy Weight Loss Recipes</h1>
          <p className="text-white/85 text-lg max-w-2xl">
            Nutritious Ayurvedic recipes designed to nourish your body while supporting healthy, sustainable weight management.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {recipes.map((recipe, idx) => (
            <div key={idx} className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
              <div className="bg-leaf/5 border-b border-border px-6 py-4 flex items-center gap-3">
                <span className="text-3xl">{recipe.emoji}</span>
                <h2 className="font-serif text-2xl font-bold text-foreground">{recipe.title}</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <Leaf className="w-4 h-4" /> Ingredients
                  </h3>
                  <ul className="space-y-1.5">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">•</span> {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-leaf mb-3">✅ Benefits</h3>
                  <ul className="space-y-1.5">
                    {recipe.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-leaf mt-1">✓</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-foreground mb-3">📋 How to Prepare</h3>
                  <ol className="space-y-2">
                    {recipe.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="flex-shrink-0 w-6 h-6 bg-leaf/10 text-leaf rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span><strong>Frequency:</strong> {recipe.frequency}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>⏱️</span>
                  <span><strong>Duration:</strong> {recipe.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
