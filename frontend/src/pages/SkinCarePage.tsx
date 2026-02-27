import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

const subcategories = [
  {
    title: 'Natural Glow Remedies',
    desc: 'Achieve radiant, glowing skin with turmeric, saffron, and other Ayurvedic beauty secrets.',
    path: '/skin-care/natural-glow',
    emoji: '✨',
    color: 'bg-primary/10 border-primary/20',
    textColor: 'text-primary',
  },
  {
    title: 'Acne & Pimples',
    desc: 'Clear acne naturally with antibacterial Ayurvedic herbs and healing face packs.',
    path: '/skin-care/acne-treatment',
    emoji: '🌿',
    color: 'bg-secondary/10 border-secondary/20',
    textColor: 'text-secondary',
  },
  {
    title: 'Pigmentation & Dark Spots',
    desc: 'Fade dark spots and even skin tone with brightening Ayurvedic treatments.',
    path: '/skin-care/pigmentation',
    emoji: '🌸',
    color: 'bg-leaf/10 border-leaf/20',
    textColor: 'text-leaf',
  },
  {
    title: 'Anti-Aging Ayurveda',
    desc: 'Rejuvenate and nourish your skin with ancient anti-aging Ayurvedic formulas.',
    path: '/skin-care/anti-aging',
    emoji: '🕰️',
    color: 'bg-calm/10 border-calm/20',
    textColor: 'text-calm',
  },
  {
    title: 'DIY Herbal Face Packs',
    desc: 'Easy-to-make face packs using kitchen ingredients for every skin type.',
    path: '/skin-care/diy-face-packs',
    emoji: '🧴',
    color: 'bg-forest/10 border-forest/20',
    textColor: 'text-forest',
  },
];

export default function SkinCarePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative py-20 text-white text-center overflow-hidden"
        style={{
          backgroundImage: `url('/assets/generated/category-skin.dim_400x250.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 to-primary/85" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="text-5xl mb-4">💆</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Skin Care</h1>
          <p className="text-white/85 text-lg">
            Unlock your skin's natural radiance with time-tested Ayurvedic beauty secrets.
          </p>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">Choose a Category</h2>
            <div className="w-12 h-1 bg-secondary rounded-full mx-auto" />
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
                  Explore Remedies <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
