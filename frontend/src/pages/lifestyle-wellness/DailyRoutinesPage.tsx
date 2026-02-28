import { Link } from '@tanstack/react-router';
import { ArrowLeft, Clock } from 'lucide-react';

const practices = [
  {
    title: 'Dinacharya (Daily Routine)',
    emoji: '🌅',
    steps: [
      'Wake up before sunrise (Brahma Muhurta — around 5:30–6 AM).',
      'Drink a glass of warm water to stimulate digestion.',
      'Practice tongue scraping and oil pulling.',
      'Do 20–30 minutes of yoga or light exercise.',
      'Eat breakfast mindfully, without distractions.',
      'Work during peak energy hours (10 AM–2 PM).',
      'Have your largest meal at lunch when digestion is strongest.',
      'Wind down after sunset; avoid heavy meals at night.',
      'Sleep by 10 PM for optimal rest and rejuvenation.',
    ],
    benefits: [
      'Aligns body with natural rhythms',
      'Improves digestion and metabolism',
      'Enhances mental clarity',
      'Reduces stress and anxiety',
      'Promotes deep, restful sleep',
    ],
    frequency: 'Daily — consistency is key',
    duration: 'Lifelong practice for optimal health',
  },
  {
    title: 'Abhyanga (Self-Oil Massage)',
    emoji: '💆',
    steps: [
      'Choose oil based on your dosha: sesame (Vata), coconut (Pitta), mustard (Kapha).',
      'Warm the oil slightly by placing the bottle in warm water.',
      'Begin at the crown of the head, massaging in circular motions.',
      'Work down to the face, neck, and shoulders.',
      'Use long strokes on limbs and circular motions on joints.',
      'Massage the abdomen in clockwise circular motions.',
      'Leave oil on for 15–20 minutes.',
      'Shower with warm water — avoid soap on oiled areas if possible.',
    ],
    benefits: [
      'Nourishes skin and tissues',
      'Calms the nervous system',
      'Improves circulation',
      'Reduces Vata imbalance',
      'Promotes longevity',
    ],
    frequency: 'Daily or 3–4 times per week',
    duration: 'Ongoing daily practice',
  },
  {
    title: 'Evening Wind-Down Routine',
    emoji: '🌙',
    steps: [
      'Dim lights after 7 PM to signal the body to wind down.',
      'Avoid screens (phone, TV) at least 1 hour before bed.',
      'Drink warm golden milk (turmeric milk) or chamomile tea.',
      'Practice 10 minutes of gentle yoga or stretching.',
      'Do 5 minutes of deep breathing or meditation.',
      'Write in a gratitude journal — note 3 things you are grateful for.',
      'Apply warm sesame oil to the soles of your feet.',
      'Sleep by 10 PM in a cool, dark, quiet room.',
    ],
    benefits: [
      'Improves sleep quality',
      'Reduces cortisol levels',
      'Calms the mind',
      'Supports nervous system recovery',
      'Enhances next-day energy',
    ],
    frequency: 'Every evening',
    duration: 'Ongoing daily practice',
  },
];

export default function DailyRoutinesPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-primary to-forest py-16 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            to="/lifestyle-wellness"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Lifestyle & Wellness
          </Link>
          <div className="text-5xl mb-4">📅</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Daily Ayurvedic Routines</h1>
          <p className="text-white/85 text-lg max-w-2xl">
            Follow the ancient Dinacharya (daily routine) to align your body with nature's rhythms for
            optimal health, energy, and vitality.
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
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </span>
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
                      <span>
                        <strong>Frequency:</strong> {practice.frequency}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>⏱️</span>
                      <span>
                        <strong>Duration:</strong> {practice.duration}
                      </span>
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
