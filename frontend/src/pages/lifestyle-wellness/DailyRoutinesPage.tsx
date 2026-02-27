import { Link } from '@tanstack/react-router';
import { ArrowLeft, Clock } from 'lucide-react';

const practices = [
  {
    title: 'Dinacharya (Complete Daily Routine)',
    emoji: '📅',
    steps: [
      'Wake up during Brahma Muhurta (4:30–6 AM), 1.5 hours before sunrise.',
      'Drink 1–2 glasses of warm water to flush the digestive system.',
      'Perform tongue scraping and oil pulling (15–20 minutes).',
      'Practice yoga and pranayama for 30–45 minutes.',
      'Take a warm bath or shower to refresh the body.',
      'Eat a nourishing breakfast suited to your dosha type.',
      'Work during peak mental hours (10 AM–2 PM).',
      'Eat the largest meal at midday when digestive fire is strongest.',
      'Take a short walk after meals to aid digestion.',
      'Wind down by 9 PM; avoid screens 1 hour before bed.',
      'Sleep by 10 PM for optimal rest and rejuvenation.',
    ],
    benefits: [
      'Aligns body with natural circadian rhythms',
      'Optimizes digestion and metabolism',
      'Reduces stress and anxiety',
      'Improves sleep quality',
      'Boosts overall energy and vitality',
    ],
    frequency: 'Daily — consistency is key',
    duration: 'Lifelong practice for lasting health',
  },
  {
    title: 'Abhyanga (Self-Oil Massage)',
    emoji: '💆',
    steps: [
      'Choose oil based on your dosha: sesame (Vata), coconut (Pitta), mustard (Kapha).',
      'Warm the oil slightly by placing the bottle in warm water.',
      'Apply oil to the crown of your head and massage in circular motions.',
      'Work down to face, neck, and shoulders using gentle strokes.',
      'Use long strokes on arms and legs, circular motions on joints.',
      'Massage the abdomen in clockwise circular motions.',
      'Leave oil on for 15–20 minutes to allow absorption.',
      'Take a warm shower to remove excess oil.',
    ],
    benefits: [
      'Nourishes skin and deeper tissues',
      'Calms the nervous system',
      'Improves lymphatic circulation',
      'Reduces Vata imbalance and anxiety',
      'Promotes deep, restful sleep',
    ],
    frequency: 'Daily or 3–4 times per week',
    duration: 'Ongoing daily practice',
  },
  {
    title: 'Evening Wind-Down Ritual',
    emoji: '🌙',
    steps: [
      'Dim lights and reduce screen exposure after 8 PM.',
      'Drink warm golden milk (turmeric milk) or chamomile tea.',
      'Practice 10–15 minutes of gentle yoga or stretching.',
      'Write in a gratitude journal — list 3 things you are grateful for.',
      'Apply warm sesame oil to the soles of your feet (Padabhyanga).',
      'Practice 5–10 minutes of deep breathing or meditation.',
      'Ensure bedroom is cool, dark, and quiet.',
      'Sleep by 10 PM for optimal Pitta-time rest.',
    ],
    benefits: [
      'Signals the body to prepare for sleep',
      'Reduces cortisol and stress hormones',
      'Improves sleep onset and quality',
      'Promotes emotional balance',
      'Supports overnight cellular repair',
    ],
    frequency: 'Every evening',
    duration: 'Lifelong practice',
  },
];

export default function DailyRoutinesPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-forest to-primary py-16 text-white">
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
            Follow the ancient Dinacharya (daily routine) to align your body with nature's rhythms for optimal health and vitality.
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
