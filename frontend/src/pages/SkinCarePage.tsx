import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Droplet, Sun, Clock, Flower2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function SkinCarePage() {
  const subcategories = [
    {
      icon: Sparkles,
      title: 'Natural Glow Remedies',
      description: 'Achieve radiant, luminous skin with traditional Ayurvedic beauty secrets.',
      color: 'from-mint-green/20 to-sky-blue/20',
      path: '/skin-care/natural-glow',
    },
    {
      icon: Droplet,
      title: 'Acne & Pimples',
      description: 'Clear skin naturally with herbal treatments that balance your doshas.',
      color: 'from-ocean-blue/20 to-teal/20',
      path: '/skin-care/acne-treatment',
    },
    {
      icon: Sun,
      title: 'Pigmentation & Dark Spots',
      description: 'Fade dark spots and even skin tone with powerful natural ingredients.',
      color: 'from-sky-blue/20 to-mint-green/20',
      path: '/skin-care/pigmentation',
    },
    {
      icon: Clock,
      title: 'Anti-Aging Ayurveda',
      description: 'Slow down aging and maintain youthful skin with time-tested remedies.',
      color: 'from-teal/20 to-forest-green/20',
      path: '/skin-care/anti-aging',
    },
    {
      icon: Flower2,
      title: 'DIY Herbal Face Packs',
      description: 'Create effective face masks at home using natural Ayurvedic ingredients.',
      color: 'from-forest-green/20 to-mint-green/20',
      path: '/skin-care/diy-face-packs',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-mint-green/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <img 
              src="/assets/generated/icon-skin.dim_128x128.png" 
              alt="Skin Care" 
              className="w-24 h-24 mx-auto mb-6"
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ocean-blue mb-6 font-serif">
              Skin Care
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-foreground/80 leading-relaxed">
              Natural Ayurvedic secrets for radiant, glowing skin
            </p>
          </div>
        </div>
      </section>

      {/* Subcategories Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subcategories.map((category, index) => (
              <Link 
                key={index}
                to={category.path}
                className="block"
              >
                <Card 
                  className="border-2 border-sky-blue/30 hover:border-ocean-blue hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white group cursor-pointer h-full"
                >
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-8 h-8 text-ocean-blue" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-ocean-blue mb-3 font-serif leading-snug">
                      {category.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
                      {category.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2">
                      <img 
                        src="/assets/generated/ayur-leaf.dim_64x64.png" 
                        alt="Leaf" 
                        className="w-6 h-6 opacity-50"
                      />
                      <span className="text-sm text-forest-green font-medium">Explore Remedies →</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-mint-green/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ocean-blue mb-6 font-serif">
              Ayurvedic Approach to Skin Care
            </h2>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-8">
              In Ayurveda, beautiful skin reflects inner health. Our natural remedies work from within, 
              balancing your doshas and nourishing your skin with pure, chemical-free ingredients for 
              lasting radiance.
            </p>
            <a 
              href="/blog" 
              className="inline-block px-8 py-3 bg-ocean-blue text-white rounded-full font-semibold hover:bg-ocean-blue/90 transition-colors shadow-lg text-sm md:text-base"
            >
              Read Skin Care Articles
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
