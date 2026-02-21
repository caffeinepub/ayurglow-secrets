import { Card, CardContent } from '@/components/ui/card';
import { Shield, Apple, Scale, Activity, Moon } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function HealthRemediesPage() {
  const subcategories = [
    {
      icon: Shield,
      title: 'Immunity Boosting Remedies',
      description: 'Strengthen your natural defenses with powerful Ayurvedic herbs and practices.',
      color: 'from-green-500/20 to-emerald-500/20',
      path: '/health-remedies/immunity-boosting',
    },
    {
      icon: Apple,
      title: 'Digestion & Gut Health',
      description: 'Improve digestive fire (Agni) and maintain optimal gut health naturally.',
      color: 'from-orange-500/20 to-amber-500/20',
      path: '/health-remedies/digestion-gut-health',
    },
    {
      icon: Scale,
      title: 'Weight Management',
      description: 'Achieve healthy weight balance through Ayurvedic diet and lifestyle practices.',
      color: 'from-blue-500/20 to-cyan-500/20',
      path: '/health-remedies/weight-management',
    },
    {
      icon: Activity,
      title: 'Diabetes & BP Support',
      description: 'Natural remedies to help manage blood sugar and blood pressure levels.',
      color: 'from-red-500/20 to-rose-500/20',
      path: '/health-remedies/diabetes-bp-support',
    },
    {
      icon: Moon,
      title: 'Stress & Sleep Solutions',
      description: 'Find peace and restful sleep with calming Ayurvedic herbs and techniques.',
      color: 'from-purple-500/20 to-indigo-500/20',
      path: '/health-remedies/stress-sleep-solutions',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-sage-green/20 to-cream">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <img 
              src="/assets/generated/icon-immunity.dim_128x128.png" 
              alt="Health Remedies" 
              className="w-24 h-24 mx-auto mb-6"
            />
            <h1 className="text-5xl md:text-6xl font-bold text-earth-green mb-6 font-serif">
              Health Remedies
            </h1>
            <p className="text-xl text-warm-brown/80 leading-relaxed">
              Natural Ayurvedic solutions for optimal health and vitality
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
              Why Choose Ayurvedic Health Remedies?
            </h2>
            <p className="text-lg text-warm-brown/80 leading-relaxed mb-8">
              Ayurveda treats the root cause of health issues, not just symptoms. Our remedies work 
              in harmony with your body's natural healing processes, providing lasting results without 
              harmful side effects.
            </p>
            <a 
              href="/blog" 
              className="inline-block px-8 py-3 bg-earth-green text-cream rounded-full font-semibold hover:bg-earth-green/90 transition-colors shadow-lg"
            >
              Read Health Articles
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
