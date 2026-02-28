import { Link } from '@tanstack/react-router';
import { ArrowLeft, Clock, Leaf } from 'lucide-react';

const remedies = [
  {
    title: 'Lemon-Honey Warm Water',
    emoji: '🍋',
    ingredients: ['1 glass warm water', '1 tbsp fresh lemon juice', '1 tsp raw honey', 'Pinch of black pepper'],
    steps: [
      'Heat water to lukewarm (not boiling).',
      'Squeeze fresh lemon juice into the water.',
      'Add raw honey and stir well.',
      'Add a pinch of black pepper for enhanced absorption.',
      'Drink on an empty stomach every morning.',
    ],
    benefits: ['Boosts metabolism', 'Aids fat burning', 'Detoxifies the liver', 'Improves digestion', 'Alkalizes the body'],
    frequency: 'Every morning on empty stomach',
    duration: '3–4 months for best results',
  },
  {
    title: 'Green Tea with Ginger & Tulsi',
    emoji: '🍵',
    ingredients: ['1 cup hot water', '1 green tea bag', '1 inch fresh ginger (grated)', '4–5 fresh tulsi leaves', '1 tsp honey (optional)'],
    steps: [
      'Boil water and let it cool slightly to 80°C.',
      'Add green tea bag and steep for 2–3 minutes.',
      'Add grated ginger and tulsi leaves.',
      'Steep for another 2 minutes.',
      'Strain, add honey if desired, and drink warm.',
    ],
    benefits: ['Rich in antioxidants', 'Boosts fat oxidation', 'Reduces inflammation', 'Improves insulin sensitivity', 'Enhances energy'],
    frequency: '2–3 cups daily (morning and afternoon)',
    duration: 'Ongoing for sustained benefits',
  },
  {
    title: 'Cinnamon-Apple Cider Vinegar Drink',
    emoji: '🥤',
    ingredients: ['1 glass warm water', '1 tbsp apple cider vinegar', '1/2 tsp cinnamon powder', '1 tsp honey', 'Pinch of cayenne pepper'],
    steps: [
      'Warm water to a comfortable drinking temperature.',
      'Add apple cider vinegar and stir.',
      'Mix in cinnamon powder and cayenne pepper.',
      'Add honey to balance the taste.',
      'Drink 30 minutes before meals.',
    ],
    benefits: ['Regulates blood sugar', 'Reduces appetite', 'Boosts metabolism', 'Improves gut health', 'Reduces belly fat'],
    frequency: 'Once daily before lunch or dinner',
    duration: '6–8 weeks for noticeable results',
  },
  {
    title: 'Jeera (Cumin) Water',
    emoji: '🌾',
    ingredients: ['2 tsp cumin seeds', '1 liter water', '1 tsp lemon juice', 'Pinch of rock salt'],
    steps: [
      'Soak cumin seeds in water overnight.',
      'Boil the soaked water with seeds in the morning.',
      'Simmer for 5 minutes, then strain.',
      'Add lemon juice and rock salt.',
      'Drink throughout the day.',
    ],
    benefits: ['Improves digestion', 'Reduces bloating', 'Boosts metabolism', 'Detoxifies the body', 'Reduces water retention'],
    frequency: 'Sip throughout the day',
    duration: '4–6 weeks for visible results',
  },
];

export default function FatBurningDrinksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-calm py-16 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            to="/weight-management"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Weight Management
          </Link>
          <div className="text-5xl mb-4">🍵</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Fat Burning Drinks</h1>
          <p className="text-white/85 text-lg max-w-2xl">
            Powerful Ayurvedic drinks that naturally boost your metabolism and support healthy weight loss.
          </p>
        </div>
      </section>

      {/* Remedies */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {remedies.map((remedy, idx) => (
            <div key={idx} className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
              <div className="bg-primary/5 border-b border-border px-6 py-4 flex items-center gap-3">
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
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
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
