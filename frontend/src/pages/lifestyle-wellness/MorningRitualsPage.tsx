import { Link } from '@tanstack/react-router';
import { ArrowLeft, Clock } from 'lucide-react';

const practices = [
  {
    title: 'Oil Pulling (Gandusha)',
    emoji: '🫙',
    steps: [
      'Wake up before sunrise (ideally 6 AM).',
      'Take 1 tablespoon of cold-pressed sesame or coconut oil.',
      'Swish the oil around your mouth for 15–20 minutes.',
      'Do not swallow — spit into a trash can (not sink).',
      'Rinse mouth with warm water.',
      'Brush teeth as normal.',
    ],
    benefits: ['Removes oral bacteria', 'Whitens teeth naturally', 'Detoxifies the body', 'Improves gum health', 'Reduces bad breath'],
    frequency: 'Every morning before eating or drinking',
    duration: 'Ongoing daily practice',
  },
  {
    title: 'Tongue Scraping (Jihwa Prakshalana)',
    emoji: '👅',
    steps: [
      'Use a copper or stainless steel tongue scraper.',
      'Stick out your tongue and place the scraper at the back.',
      'Gently scrape forward 7–14 times.',
      'Rinse the scraper between strokes.',
      'Rinse your mouth with warm water.',
      'Follow with oil pulling or brushing.',
    ],
    benefits: ['Removes toxins (Ama)', 'Improves taste sensation', 'Stimulates digestive organs', 'Freshens breath', 'Boosts immunity'],
    frequency: 'Every morning upon waking',
    duration: 'Daily lifelong practice',
  },
  {
    title: 'Warm Lemon Water with Honey',
    emoji: '🍋',
    steps: [
      'Heat water to lukewarm (not boiling).',
      'Squeeze half a fresh lemon into the water.',
      'Add 1 teaspoon of raw honey.',
      'Stir well and drink slowly.',
      'Wait 20–30 minutes before breakfast.',
    ],
    benefits: ['Kickstarts digestion', 'Alkalizes the body', 'Boosts vitamin C', 'Supports liver detox', 'Hydrates after sleep'],
    frequency: 'Every morning on empty stomach',
    duration: 'Ongoing daily practice',
  },
  {
    title: 'Abhyanga (Self-Oil Massage)',
    emoji: '💆',
    steps: [
      'Warm sesame oil (or coconut oil in summer) slightly.',
      'Apply oil to the crown of your head first.',
      'Massage scalp in circular motions for 2–3 minutes.',
      'Work down to face, neck, shoulders, arms, and legs.',
      'Use long strokes on limbs and circular motions on joints.',
      'Leave oil on for 15–20 minutes, then shower.',
    ],
    benefits: ['Nourishes skin and tissues', 'Calms the nervous system', 'Improves circulation', 'Reduces Vata imbalance', 'Promotes deep sleep'],
    frequency: 'Daily or 3–4 times per week',
    duration: 'Ongoing daily practice',
  },
];

export default function MorningRitualsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-primary to-secondary py-16 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/lifestyle-wellness" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Lifestyle & Wellness
          </Link>
          <div className="text-5xl mb-4">🌅</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Morning Rituals</h1>
          <p className="text-white/85 text-lg max-w-2xl">
            Start your day with powerful Ayurvedic morning practices that set the tone for energy, clarity, and well-being.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {practices.map((practice, idx) => (
            <div key={idx} className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
              <div className="bg-primary/5 border-b border-border px-6 py-4 flex items-center gap-3">
                <span className="text-3xl">{practice.emoji}</span>
                <h2 className="font-serif text-2xl font-bold text-foreground">{practice.title}</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">📋 Steps</h3>
                  <ol className="space-y-2">
                    {practice.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary mb-3">✅ Benefits</h3>
                  <ul className="space-y-1.5">
                    {practice.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-secondary mt-1">✓</span> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span><strong>Frequency:</strong> {practice.frequency}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>⏱️</span>
                      <span><strong>Duration:</strong> {practice.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
