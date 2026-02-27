import { Link } from '@tanstack/react-router';
import { ArrowLeft, Clock } from 'lucide-react';

const practices = [
  {
    title: 'Pranayama (Breath Control)',
    emoji: '🌬️',
    steps: [
      'Sit in a comfortable cross-legged position (Sukhasana).',
      'Close your eyes and relax your body.',
      'Practice Nadi Shodhana: Close right nostril, inhale through left for 4 counts.',
      'Close both nostrils, hold for 4 counts.',
      'Release right nostril, exhale for 8 counts.',
      'Repeat on the other side. Do 10–15 rounds.',
    ],
    benefits: ['Calms the nervous system', 'Reduces stress and anxiety', 'Improves lung capacity', 'Balances left and right brain', 'Enhances mental clarity'],
    frequency: 'Every morning for 10–15 minutes',
    duration: 'Daily practice for lifelong benefits',
  },
  {
    title: 'Surya Namaskar (Sun Salutation)',
    emoji: '☀️',
    steps: [
      'Stand in Tadasana (Mountain Pose) facing east.',
      'Inhale and raise arms overhead (Urdhva Hastasana).',
      'Exhale and fold forward (Uttanasana).',
      'Inhale, step right foot back into lunge.',
      'Hold breath, step left foot back (Plank Pose).',
      'Exhale, lower to floor (Chaturanga).',
      'Inhale, lift chest (Cobra/Upward Dog).',
      'Exhale, lift hips (Downward Dog).',
      'Complete the sequence in reverse. Do 5–12 rounds.',
    ],
    benefits: ['Full body workout', 'Improves flexibility', 'Boosts metabolism', 'Strengthens muscles', 'Improves cardiovascular health'],
    frequency: '5–12 rounds every morning',
    duration: 'Daily practice for best results',
  },
  {
    title: 'Guided Meditation (Dhyana)',
    emoji: '🧘',
    steps: [
      'Find a quiet, comfortable place to sit.',
      'Set a timer for 10–20 minutes.',
      'Close your eyes and take 3 deep breaths.',
      'Focus on your natural breath — observe without controlling.',
      'When thoughts arise, gently return focus to breath.',
      'End by slowly opening eyes and taking a moment of gratitude.',
    ],
    benefits: ['Reduces cortisol (stress hormone)', 'Improves focus and concentration', 'Enhances emotional well-being', 'Promotes better sleep', 'Increases self-awareness'],
    frequency: 'Once or twice daily (morning and evening)',
    duration: 'Start with 10 minutes, gradually increase',
  },
];

export default function YogaMeditationPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-secondary to-forest py-16 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/lifestyle-wellness" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Lifestyle & Wellness
          </Link>
          <div className="text-5xl mb-4">🧘</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Yoga & Meditation</h1>
          <p className="text-white/85 text-lg max-w-2xl">
            Integrate ancient yoga and meditation practices into your daily routine for mind-body balance and inner peace.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {practices.map((practice, idx) => (
            <div key={idx} className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
              <div className="bg-secondary/5 border-b border-border px-6 py-4 flex items-center gap-3">
                <span className="text-3xl">{practice.emoji}</span>
                <h2 className="font-serif text-2xl font-bold text-foreground">{practice.title}</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">📋 Steps</h3>
                  <ol className="space-y-2">
                    {practice.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="flex-shrink-0 w-6 h-6 bg-secondary/10 text-secondary rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-3">✅ Benefits</h3>
                  <ul className="space-y-1.5">
                    {practice.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">✓</span> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-secondary" />
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
