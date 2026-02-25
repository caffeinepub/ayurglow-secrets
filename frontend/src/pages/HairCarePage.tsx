import { Card, CardContent } from '@/components/ui/card';
import { Scissors, Sprout, Droplets, Sparkle, Flower } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function HairCarePage() {
  const subcategories = [
    {
      icon: Scissors,
      title: 'Hair Fall Treatment',
      description: 'Reduce hair loss and strengthen roots with powerful Ayurvedic remedies.',
      color: 'from-forest-green/20 to-mint-green/20',
      path: '/hair-care/hair-fall-treatment',
    },
    {
      icon: Sprout,
      title: 'Hair Growth Boosters',
      description: 'Stimulate natural hair growth with nourishing herbal treatments.',
      color: 'from-ocean-blue/20 to-sky-blue/20',
      path: '/hair-care/hair-growth',
    },
    {
      icon: Droplets,
      title: 'Dandruff & Scalp Care',
      description: 'Eliminate dandruff and maintain a healthy scalp naturally.',
      color: 'from-teal/20 to-mint-green/20',
      path: '/hair-care/dandruff-scalp-care',
    },
    {
      icon: Sparkle,
      title: 'Grey Hair Solutions',
      description: 'Prevent and reverse premature greying with traditional remedies.',
      color: 'from-sky-blue/20 to-forest-green/20',
      path: '/hair-care/grey-hair-solutions',
    },
    {
      icon: Flower,
      title: 'Ayurvedic Oils & Masks',
      description: 'Deep conditioning treatments for lustrous, healthy hair.',
      color: 'from-mint-green/20 to-teal/20',
      path: '/hair-care/oils-masks',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-mint-green/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <img 
              src="/assets/generated/icon-hair.dim_128x128.png" 
              alt="Hair Care" 
              className="w-24 h-24 mx-auto mb-6"
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ocean-blue mb-6 font-serif">
              Hair Care
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-foreground/80 leading-relaxed">
              Natural Ayurvedic solutions for strong, healthy, beautiful hair
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
    </div>
  );
}
