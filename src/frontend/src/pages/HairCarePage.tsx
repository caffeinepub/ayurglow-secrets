import { Card, CardContent } from '@/components/ui/card';
import { Wind, Sprout, Droplets, Palette, Sparkle } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function HairCarePage() {
  const subcategories = [
    {
      icon: Wind,
      title: 'Hair Fall Treatment',
      description: 'Stop hair loss naturally with powerful Ayurvedic herbs and oils.',
      color: 'from-red-500/20 to-orange-500/20',
      path: '/hair-care/hair-fall-treatment',
    },
    {
      icon: Sprout,
      title: 'Hair Growth Remedies',
      description: 'Stimulate healthy hair growth with traditional Ayurvedic treatments.',
      color: 'from-green-500/20 to-emerald-500/20',
      path: '/hair-care/hair-growth',
    },
    {
      icon: Droplets,
      title: 'Dandruff & Scalp Care',
      description: 'Eliminate dandruff and maintain a healthy scalp with natural solutions.',
      color: 'from-blue-500/20 to-cyan-500/20',
      path: '/hair-care/dandruff-scalp-care',
    },
    {
      icon: Palette,
      title: 'Grey Hair Solutions',
      description: 'Prevent and reverse premature greying with Ayurvedic remedies.',
      color: 'from-purple-500/20 to-indigo-500/20',
      path: '/hair-care/grey-hair-solutions',
    },
    {
      icon: Sparkle,
      title: 'Ayurvedic Oils & Masks',
      description: 'Nourish and strengthen hair with traditional oil blends and hair masks.',
      color: 'from-amber-500/20 to-yellow-500/20',
      path: '/hair-care/oils-masks',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-sage-green/20 to-cream">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <img 
              src="/assets/generated/icon-hair.dim_128x128.png" 
              alt="Hair Care" 
              className="w-24 h-24 mx-auto mb-6"
            />
            <h1 className="text-5xl md:text-6xl font-bold text-earth-green mb-6 font-serif">
              Hair Care
            </h1>
            <p className="text-xl text-warm-brown/80 leading-relaxed">
              Natural Ayurvedic solutions for strong, healthy, beautiful hair
            </p>
          </div>
        </div>
      </section>

      {/* Subcategories Grid */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subcategories.map((category, index) => (
              <Link 
                key={index}
                to={category.path}
                className="block"
              >
                <Card 
                  className="border-2 border-sage-green/30 hover:border-earth-green hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white group cursor-pointer h-full"
                >
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-8 h-8 text-earth-green" />
                    </div>
                    <h3 className="text-2xl font-semibold text-earth-green mb-3 font-serif">
                      {category.title}
                    </h3>
                    <p className="text-warm-brown/70 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2">
                      <img 
                        src="/assets/generated/ayur-leaf.dim_64x64.png" 
                        alt="Leaf" 
                        className="w-6 h-6 opacity-50"
                      />
                      <span className="text-sm text-earth-green font-medium">Explore Remedies →</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-sage-green/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-green mb-6 font-serif">
              Ayurvedic Hair Care Philosophy
            </h2>
            <p className="text-lg text-warm-brown/80 leading-relaxed mb-8">
              Healthy hair is a reflection of overall wellness. Our Ayurvedic approach addresses the 
              root causes of hair problems, nourishing from within and using time-tested natural 
              ingredients for lasting results.
            </p>
            <a 
              href="/blog" 
              className="inline-block px-8 py-3 bg-earth-green text-cream rounded-full font-semibold hover:bg-earth-green/90 transition-colors shadow-lg"
            >
              Read Hair Care Articles
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
