import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function AntiAgingPage() {
  const remedies = [
    {
      title: 'Aloe Vera-Vitamin E Serum',
      ingredients: ['3 tbsp fresh aloe vera gel', '2 Vitamin E capsules', '1 tsp rose water', '3 drops of lavender oil'],
      application: [
        'Extract fresh aloe vera gel',
        'Pierce Vitamin E capsules and squeeze oil',
        'Mix all ingredients thoroughly',
        'Store in a clean bottle',
        'Apply on clean face before bed',
        'Massage gently in upward motions'
      ],
      benefits: ['Reduces fine lines', 'Firms skin', 'Boosts collagen production', 'Deeply moisturizes'],
      frequency: 'Use daily at night'
    },
    {
      title: 'Avocado-Honey Anti-Aging Mask',
      ingredients: ['1/2 ripe avocado', '1 tbsp honey', '1 tsp olive oil', '1 tsp yogurt'],
      application: [
        'Mash avocado until smooth',
        'Mix with honey and olive oil',
        'Add yogurt and blend well',
        'Apply thick layer on face and neck',
        'Leave for 20-25 minutes',
        'Rinse with lukewarm water'
      ],
      benefits: ['Nourishes mature skin', 'Reduces wrinkles', 'Improves elasticity', 'Rich in antioxidants'],
      frequency: 'Apply 2-3 times per week'
    },
    {
      title: 'Saffron-Almond Rejuvenating Cream',
      ingredients: ['10 almonds', '5-6 saffron strands', '2 tbsp milk', '1 tsp honey', '1/2 tsp sandalwood powder'],
      application: [
        'Soak almonds and saffron overnight',
        'Grind almonds with milk',
        'Add saffron, honey, and sandalwood',
        'Apply on face and neck',
        'Massage for 5 minutes',
        'Leave for 20 minutes then rinse'
      ],
      benefits: ['Rejuvenates skin cells', 'Reduces age spots', 'Tightens skin', 'Enhances complexion'],
      frequency: 'Use 3-4 times weekly'
    },
    {
      title: 'Papaya-Honey Enzyme Mask',
      ingredients: ['1/2 cup ripe papaya', '1 tbsp honey', '1 tsp lemon juice', '1 tsp coconut oil'],
      application: [
        'Mash papaya into smooth pulp',
        'Mix with honey and lemon juice',
        'Add coconut oil',
        'Apply evenly on face',
        'Leave for 15-20 minutes',
        'Wash off with cool water'
      ],
      benefits: ['Natural exfoliation', 'Removes dead skin', 'Brightens complexion', 'Reduces wrinkles'],
      frequency: 'Apply twice weekly'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-purple-500/10 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/skin-care"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Skin Care</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Anti-Aging Ayurveda
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Slow down aging and maintain youthful skin with time-tested remedies
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
                    <h3 className="text-lg font-semibold text-earth-green mb-3">Application:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-warm-brown/80">
                      {remedy.application.map((step, i) => (
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
                    <h3 className="text-lg font-semibold text-earth-green mb-2">Frequency:</h3>
                    <p className="text-warm-brown/80">{remedy.frequency}</p>
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
              Ayurvedic Anti-Aging Lifestyle
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Facial Massage</h3>
                <p className="text-warm-brown/80 text-sm">Practice daily facial massage with natural oils</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Stress Management</h3>
                <p className="text-warm-brown/80 text-sm">Meditation and yoga slow down aging process</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Antioxidant Diet</h3>
                <p className="text-warm-brown/80 text-sm">Eat berries, nuts, and green vegetables daily</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
