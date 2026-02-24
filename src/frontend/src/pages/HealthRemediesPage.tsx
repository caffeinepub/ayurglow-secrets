import { Card, CardContent } from '@/components/ui/card';
import { Shield, Apple, Scale, Activity, Moon } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function HealthRemediesPage() {
  const subcategories = [
    {
      icon: Shield,
      title: 'Immunity Boosting Remedies',
      description: 'Strengthen your natural defenses with powerful Ayurvedic herbs and practices.',
      color: 'from-forest-green/20 to-mint-green/20',
      path: '/health-remedies/immunity-boost',
    },
    {
      icon: Apple,
      title: 'Digestion & Gut Health',
      description: 'Improve digestive fire (Agni) and maintain optimal gut health naturally.',
      color: 'from-teal/20 to-sky-blue/20',
      path: '/health-remedies/digestion',
    },
    {
      icon: Scale,
      title: 'Weight Management',
      description: 'Achieve healthy weight balance through Ayurvedic diet and lifestyle practices.',
      color: 'from-ocean-blue/20 to-sky-blue/20',
      path: '/health-remedies/weight-management',
    },
    {
      icon: Activity,
      title: 'Diabetes & BP Support',
      description: 'Natural remedies to help manage blood sugar and blood pressure levels.',
      color: 'from-sky-blue/20 to-mint-green/20',
      path: '/health-remedies/diabetes-bp',
    },
    {
      icon: Moon,
      title: 'Stress & Sleep Solutions',
      description: 'Find peace and restful sleep with calming Ayurvedic herbs and techniques.',
      color: 'from-teal/20 to-forest-green/20',
      path: '/health-remedies/stress-sleep',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-mint-green/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <img 
              src="/assets/generated/icon-immunity.dim_128x128.png" 
              alt="Health Remedies" 
              className="w-24 h-24 mx-auto mb-6"
            />
            <h1 className="text-5xl md:text-6xl font-bold text-ocean-blue mb-6 font-serif">
              Health Remedies
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Natural Ayurvedic solutions for optimal health and vitality
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
                    <h3 className="text-2xl font-semibold text-ocean-blue mb-3 font-serif">
                      {category.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
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
