import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Apple, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function DigestionGutHealthPage() {
  const remedies = [
    {
      title: 'Triphala Churna Remedy',
      ingredients: ['1 tsp Triphala powder', '1 cup warm water', '1 tsp honey (optional)'],
      preparation: [
        'Mix Triphala powder in warm water',
        'Stir well until completely dissolved',
        'Add honey if desired',
        'Let it sit for 2-3 minutes before drinking'
      ],
      benefits: ['Improves digestion', 'Cleanses the colon', 'Balances all three doshas', 'Promotes regular bowel movements'],
      usage: 'Drink before bedtime or early morning on empty stomach'
    },
    {
      title: 'Ginger-Lemon Digestive Tonic',
      ingredients: ['1 inch fresh ginger', '1 lemon', '1 tsp honey', '1 cup warm water', 'Pinch of rock salt'],
      preparation: [
        'Grate fresh ginger finely',
        'Squeeze lemon juice into warm water',
        'Add grated ginger and rock salt',
        'Mix in honey',
        'Stir well and consume immediately'
      ],
      benefits: ['Stimulates digestive fire (Agni)', 'Reduces bloating', 'Relieves nausea', 'Improves appetite'],
      usage: 'Drink 15-20 minutes before meals'
    },
    {
      title: 'Ajwain (Carom Seeds) Water',
      ingredients: ['1 tsp ajwain seeds', '2 cups water', 'Pinch of black salt'],
      preparation: [
        'Boil water in a pot',
        'Add ajwain seeds',
        'Simmer for 5 minutes',
        'Strain and add black salt',
        'Drink while warm'
      ],
      benefits: ['Relieves gas and bloating', 'Treats indigestion', 'Reduces acidity', 'Improves gut health'],
      usage: 'Drink twice daily after meals'
    },
    {
      title: 'Buttermilk with Cumin',
      ingredients: ['1 cup fresh buttermilk', '1/2 tsp roasted cumin powder', 'Few curry leaves', 'Pinch of rock salt', 'Fresh coriander leaves'],
      preparation: [
        'Take fresh buttermilk in a glass',
        'Add roasted cumin powder',
        'Add finely chopped curry leaves',
        'Mix in rock salt',
        'Garnish with coriander leaves'
      ],
      benefits: ['Cools the digestive system', 'Provides probiotics', 'Reduces inflammation', 'Improves nutrient absorption'],
      usage: 'Consume after lunch for best results'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-orange-500/10 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/health-remedies"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Health Remedies</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mx-auto mb-6">
              <Apple className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Digestion & Gut Health
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Improve digestive fire (Agni) and maintain optimal gut health naturally
            </p>
          </div>
        </div>
      </section>

      {/* Remedies Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {remedies.map((remedy, index) => (
              <Card key={index} className="border-2 border-sage-green/30 bg-white shadow-lg">
                <CardHeader className="bg-sage-green/10">
                  <CardTitle className="text-2xl text-earth-green font-serif flex items-center gap-3">
                    <img 
                      src="/assets/generated/ayur-leaf.dim_64x64.png" 
                      alt="Leaf" 
                      className="w-8 h-8"
                    />
                    {remedy.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-earth-green mb-3">Ingredients:</h3>
                    <ul className="list-disc list-inside space-y-1 text-warm-brown/80">
                      {remedy.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-earth-green mb-3">Preparation:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-warm-brown/80">
                      {remedy.preparation.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-earth-green mb-3">Benefits:</h3>
                    <ul className="list-disc list-inside space-y-1 text-warm-brown/80">
                      {remedy.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gold/10 p-4 rounded-lg border border-gold/30">
                    <h3 className="text-lg font-semibold text-earth-green mb-2">Usage:</h3>
                    <p className="text-warm-brown/80">{remedy.usage}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Tips */}
      <section className="py-16 bg-sage-green/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-earth-green mb-6 font-serif">
              Ayurvedic Tips for Healthy Digestion
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Eat Mindfully</h3>
                <p className="text-warm-brown/80 text-sm">Chew food thoroughly and avoid distractions while eating</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Regular Meal Times</h3>
                <p className="text-warm-brown/80 text-sm">Eat at consistent times daily to strengthen digestive fire</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Warm Foods</h3>
                <p className="text-warm-brown/80 text-sm">Prefer warm, cooked foods over cold or raw items</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
