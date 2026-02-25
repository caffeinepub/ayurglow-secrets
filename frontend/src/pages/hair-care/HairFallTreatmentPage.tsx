import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function HairFallTreatmentPage() {
  const remedies = [
    {
      title: 'Onion Juice Hair Treatment',
      ingredients: ['2 medium onions', '1 tbsp coconut oil', '1 tsp honey', 'Few drops of essential oil (optional)'],
      application: [
        'Peel and chop onions',
        'Blend and extract juice',
        'Mix with coconut oil and honey',
        'Apply on scalp and massage',
        'Leave for 30-45 minutes',
        'Wash with mild herbal shampoo'
      ],
      benefits: ['Stimulates hair follicles', 'Rich in sulfur', 'Promotes hair regrowth', 'Strengthens hair roots'],
      frequency: 'Apply 2-3 times per week'
    },
    {
      title: 'Fenugreek Seeds Hair Mask',
      ingredients: ['3 tbsp fenugreek seeds', '1/2 cup water', '1 tbsp coconut oil', '1 tbsp yogurt'],
      application: [
        'Soak fenugreek seeds overnight',
        'Grind into smooth paste',
        'Mix with coconut oil and yogurt',
        'Apply on scalp and hair',
        'Leave for 30 minutes',
        'Rinse thoroughly with water'
      ],
      benefits: ['Reduces hair fall', 'Strengthens hair shaft', 'Adds shine', 'Prevents dandruff'],
      frequency: 'Use twice weekly'
    },
    {
      title: 'Amla-Shikakai Hair Pack',
      ingredients: ['2 tbsp amla powder', '2 tbsp shikakai powder', '1 tbsp bhringraj powder', '1 cup water', '1 tbsp coconut oil'],
      application: [
        'Mix all powders together',
        'Add water to make paste',
        'Add coconut oil',
        'Apply on scalp and hair',
        'Leave for 45 minutes',
        'Wash with lukewarm water'
      ],
      benefits: ['Traditional hair fall remedy', 'Nourishes scalp', 'Strengthens roots', 'Promotes healthy growth'],
      frequency: 'Apply 2 times per week'
    },
    {
      title: 'Curry Leaves-Coconut Oil Treatment',
      ingredients: ['1 cup fresh curry leaves', '1/2 cup coconut oil', '1 tsp fenugreek seeds'],
      application: [
        'Heat coconut oil in a pan',
        'Add curry leaves and fenugreek',
        'Heat until leaves turn black',
        'Cool and strain the oil',
        'Massage into scalp',
        'Leave overnight, wash in morning'
      ],
      benefits: ['Prevents premature hair fall', 'Darkens hair', 'Nourishes follicles', 'Improves hair texture'],
      frequency: 'Use 2-3 times weekly'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-red-500/10 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/hair-care"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Hair Care</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6">
              <Wind className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Hair Fall Treatment
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Stop hair loss naturally with powerful Ayurvedic herbs and oils
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
              Tips to Prevent Hair Fall
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Gentle Care</h3>
                <p className="text-warm-brown/80 text-sm">Avoid harsh chemicals and heat styling tools</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Protein Diet</h3>
                <p className="text-warm-brown/80 text-sm">Eat protein-rich foods like lentils, nuts, and eggs</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Scalp Massage</h3>
                <p className="text-warm-brown/80 text-sm">Regular oil massage improves blood circulation</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
