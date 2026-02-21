import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function WeightManagementPage() {
  const remedies = [
    {
      title: 'Honey-Lemon Warm Water',
      ingredients: ['1 cup warm water', '1 tbsp raw honey', '1/2 lemon juice', 'Pinch of cinnamon powder'],
      preparation: [
        'Heat water until warm (not boiling)',
        'Squeeze fresh lemon juice',
        'Add honey and stir well',
        'Sprinkle cinnamon powder',
        'Drink immediately'
      ],
      benefits: ['Boosts metabolism', 'Aids fat burning', 'Detoxifies the body', 'Improves digestion'],
      usage: 'Drink every morning on empty stomach'
    },
    {
      title: 'Triphala Tea for Weight Loss',
      ingredients: ['1 tsp Triphala powder', '1 cup hot water', '1/2 tsp honey', 'Few drops of lemon'],
      preparation: [
        'Boil water and let it cool slightly',
        'Add Triphala powder',
        'Steep for 5-10 minutes',
        'Strain if needed',
        'Add honey and lemon'
      ],
      benefits: ['Cleanses digestive system', 'Reduces belly fat', 'Improves metabolism', 'Balances doshas'],
      usage: 'Drink before bedtime for best results'
    },
    {
      title: 'Cumin-Coriander-Fennel Tea (CCF Tea)',
      ingredients: ['1 tsp cumin seeds', '1 tsp coriander seeds', '1 tsp fennel seeds', '3 cups water'],
      preparation: [
        'Boil water in a pot',
        'Add all three seeds',
        'Simmer for 5-7 minutes',
        'Strain into a thermos',
        'Sip throughout the day'
      ],
      benefits: ['Enhances digestion', 'Reduces water retention', 'Balances appetite', 'Supports healthy weight'],
      usage: 'Drink 2-3 cups throughout the day'
    },
    {
      title: 'Ginger-Green Tea Blend',
      ingredients: ['1 inch fresh ginger', '1 tsp green tea leaves', '2 cups water', '1 tsp honey', 'Few mint leaves'],
      preparation: [
        'Grate ginger finely',
        'Boil water with grated ginger',
        'Add green tea leaves',
        'Steep for 3-4 minutes',
        'Strain, add honey and mint'
      ],
      benefits: ['Increases fat burning', 'Rich in antioxidants', 'Boosts energy', 'Reduces cravings'],
      usage: 'Drink 2 times daily between meals'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-blue-500/10 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/health-remedies"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Health Remedies</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-6">
              <Scale className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Weight Management
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Achieve healthy weight balance through Ayurvedic diet and lifestyle practices
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
              Ayurvedic Lifestyle for Healthy Weight
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Early Morning Routine</h3>
                <p className="text-warm-brown/80 text-sm">Wake up early and practice yoga or walking for 30 minutes</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Balanced Meals</h3>
                <p className="text-warm-brown/80 text-sm">Eat largest meal at lunch when digestion is strongest</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Avoid Late Eating</h3>
                <p className="text-warm-brown/80 text-sm">Finish dinner by 7 PM for better metabolism</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
