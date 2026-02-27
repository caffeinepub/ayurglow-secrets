import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

const subcategories = [
  {
    title: 'Morning Rituals',
    desc: 'Start your day right with powerful Ayurvedic morning practices for energy and clarity.',
    path: '/lifestyle-wellness/morning-rituals',
    emoji: '🌅',
    color: 'bg-primary/10 border-primary/20',
    textColor: 'text-primary',
  },
  {
    title: 'Yoga & Meditation',
    desc: 'Integrate yoga and meditation into your daily routine for mind-body balance.',
    path: '/lifestyle-wellness/yoga-meditation',
    emoji: '🧘',
    color: 'bg-secondary/10 border-secondary/20',
    textColor: 'text-secondary',
  },
  {
    title: 'Daily Ayurvedic Routines',
    desc: 'Follow the ancient Dinacharya (daily routine) for optimal health and vitality.',
    path: '/lifestyle-wellness/daily-routines',
    emoji: '📅',
    color: 'bg-leaf/10 border-leaf/20',
    textColor: 'text-leaf',
  },
];

export default function LifestyleWellnessPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative py-20 text-white text-center overflow-hidden"
        style={{
          backgroundImage: `url('/assets/generated/category-lifestyle.dim_400x250.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-forest/90 to-secondary/85" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="text-5xl mb-4">🧘</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Lifestyle & Wellness</h1>
          <p className="text-white/85 text-lg">
            Embrace a holistic Ayurvedic lifestyle for lasting health, happiness, and inner peace.
          </p>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">Choose a Category</h2>
            <div className="w-12 h-1 bg-primary rounded-full mx-auto" />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Discover Ayurvedic lifestyle practices that transform your daily routine into a wellness ritual.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories.map((cat) => (
              <Link
                key={cat.path}
                to={cat.path}
                className={`group block p-6 rounded-2xl border-2 ${cat.color} ayur-card-hover`}
              >
                <div className="text-4xl mb-4">{cat.emoji}</div>
                <h3 className={`font-serif text-xl font-semibold mb-2 ${cat.textColor}`}>{cat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{cat.desc}</p>
                <div className={`flex items-center gap-1 text-sm font-medium ${cat.textColor} group-hover:gap-2 transition-all`}>
                  Explore Practices <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">The Ayurvedic Way of Life</h2>
          <p className="text-muted-foreground leading-relaxed">
            Ayurveda teaches that a balanced daily routine (Dinacharya) is the foundation of good health. By aligning your activities with nature's rhythms — waking at sunrise, practicing yoga, eating mindfully, and sleeping early — you create harmony between your body, mind, and the environment.
          </p>
        </div>
      </section>
    </div>
  );
}
