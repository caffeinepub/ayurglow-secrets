import { Link } from '@tanstack/react-router';
import { ArrowLeft, Clock, Leaf } from 'lucide-react';

const remedies = [
  {
    title: 'Triphala-Guggul Blend',
    emoji: '🌿',
    ingredients: ['1/2 tsp Triphala powder', '1/4 tsp Guggul powder', '1 glass warm water', '1 tsp honey'],
    steps: [
      'Mix Triphala and Guggul powders in warm water.',
      'Stir well until fully dissolved.',
      'Add honey for taste.',
      'Drink on an empty stomach in the morning.',
      'Wait 30 minutes before eating breakfast.',
    ],
    benefits: ['Detoxifies the body', 'Boosts metabolism', 'Reduces cholesterol', 'Supports thyroid function', 'Improves digestion'],
    frequency: 'Once daily in the morning',
    duration: '3 months for best results',
  },
  {
    title: 'Black Pepper & Turmeric Tonic',
    emoji: '🫚',
    ingredients: ['1/4 tsp turmeric powder', '1/8 tsp black pepper', '1 cup warm milk or water', '1 tsp coconut oil', '1 tsp honey'],
    steps: [
      'Warm milk or water gently.',
      'Add turmeric and black pepper.',
      'Stir in coconut oil for better absorption.',
      'Add honey and mix well.',
      'Drink warm, preferably in the evening.',
    ],
    benefits: ['Anti-inflammatory', 'Boosts metabolism by 8%', 'Improves insulin sensitivity', 'Reduces fat storage', 'Enhances nutrient absorption'],
    frequency: 'Once daily (morning or evening)',
    duration: 'Ongoing for sustained benefits',
  },
  {
    title: 'Ginger-Cumin-Fennel Tea',
    emoji: '☕',
    ingredients: ['1 tsp cumin seeds', '1 tsp fennel seeds', '1/2 inch fresh ginger', '2 cups water', '1 tsp honey'],
    steps: [
      'Crush cumin and fennel seeds lightly.',
      'Boil water and add all seeds and ginger.',
      'Simmer for 5–7 minutes.',
      'Strain into a cup.',
      'Add honey and drink warm.',
    ],
    benefits: ['Reduces bloating', 'Stimulates digestive fire (Agni)', 'Boosts metabolism', 'Reduces water retention', 'Improves nutrient absorption'],
    frequency: '2–3 times daily after meals',
    duration: '4–6 weeks for visible results',
  },
];

export default function MetabolismBoostersPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-secondary to-primary py-16 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/weight-management" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Weight Management
          </Link>
          <div className="text-5xl mb-4">🔥</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Metabolism Boosters</h1>
          <p className="text-white/85 text-lg max-w-2xl">
            Ayurvedic herbs and spices that naturally fire up your metabolism for healthy, sustainable weight loss.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {remedies.map((remedy, idx) => (
            <div key={idx} className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
              <div className="bg-secondary/5 border-b border-border px-6 py-4 flex items-center gap-3">
                <span className="text-3xl">{remedy.emoji}</span>
                <h2 className="font-serif text-2xl font-bold text-foreground">{remedy.title}</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <Leaf className="w-4 h-4" /> Ingredients
                  </h3>
                  <ul className="space-y-1.5">
                    {remedy.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">•</span> {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary mb-3">✅ Benefits</h3>
                  <ul className="space-y-1.5">
                    {remedy.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-secondary mt-1">✓</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-foreground mb-3">📋 How to Prepare</h3>
                  <ol className="space-y-2">
                    {remedy.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="flex-shrink-0 w-6 h-6 bg-secondary/10 text-secondary rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span><strong>Frequency:</strong> {remedy.frequency}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>⏱️</span>
                  <span><strong>Duration:</strong> {remedy.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
