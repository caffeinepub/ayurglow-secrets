import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkle, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function OilsMasksPage() {
  const treatments = [
    {
      title: 'Ayurvedic Hot Oil Treatment',
      ingredients: ['2 tbsp coconut oil', '1 tbsp castor oil', '1 tbsp almond oil', '5 drops rosemary oil', '1 tsp vitamin E oil'],
      application: [
        'Mix all oils in a bowl',
        'Warm the oil mixture gently',
        'Part hair into sections',
        'Apply warm oil on scalp',
        'Massage for 10-15 minutes',
        'Leave for 1-2 hours or overnight',
        'Wash with mild shampoo'
      ],
      benefits: ['Deep nourishment', 'Strengthens hair', 'Promotes growth', 'Adds shine and softness'],
      frequency: 'Use 2-3 times per week'
    },
    {
      title: 'Brahmi-Amla Hair Oil',
      ingredients: ['1 cup coconut oil', '2 tbsp brahmi powder', '2 tbsp amla powder', '1 tbsp bhringraj powder', '10 curry leaves'],
      application: [
        'Heat coconut oil on low flame',
        'Add all powders and curry leaves',
        'Simmer for 15 minutes',
        'Cool and strain',
        'Store in glass bottle',
        'Apply and massage 2-3 times weekly'
      ],
      benefits: ['Traditional Ayurvedic formula', 'Prevents hair fall', 'Darkens hair', 'Promotes thick growth'],
      frequency: 'Apply 2-3 times weekly'
    },
    {
      title: 'Banana-Avocado Deep Conditioning Mask',
      ingredients: ['1 ripe banana', '1/2 ripe avocado', '2 tbsp honey', '1 tbsp olive oil', '1 tbsp yogurt'],
      application: [
        'Mash banana and avocado together',
        'Add honey and olive oil',
        'Mix in yogurt',
        'Apply on damp hair',
        'Cover with shower cap',
        'Leave for 30-45 minutes',
        'Rinse thoroughly with water'
      ],
      benefits: ['Intense moisturization', 'Repairs damaged hair', 'Adds softness', 'Natural conditioning'],
      frequency: 'Use once weekly'
    },
    {
      title: 'Hibiscus-Fenugreek Hair Mask',
      ingredients: ['10 hibiscus flowers', '3 tbsp fenugreek seeds', '2 tbsp yogurt', '1 tbsp coconut oil', '1 tsp honey'],
      application: [
        'Soak fenugreek seeds overnight',
        'Grind hibiscus and fenugreek together',
        'Add yogurt, coconut oil, and honey',
        'Apply on scalp and hair',
        'Leave for 45 minutes',
        'Wash with herbal shampoo'
      ],
      benefits: ['Stimulates hair growth', 'Prevents hair fall', 'Conditions deeply', 'Adds volume'],
      frequency: 'Apply twice weekly'
    },
    {
      title: 'Neem-Tulsi Scalp Treatment Oil',
      ingredients: ['1 cup coconut oil', '1 cup neem leaves', '1 cup tulsi leaves', '1 tbsp fenugreek seeds', '5 drops tea tree oil'],
      application: [
        'Heat coconut oil gently',
        'Add neem, tulsi leaves, and fenugreek',
        'Simmer for 20 minutes',
        'Cool and strain',
        'Add tea tree oil',
        'Massage into scalp before bed'
      ],
      benefits: ['Treats scalp infections', 'Prevents dandruff', 'Antibacterial properties', 'Promotes healthy scalp'],
      frequency: 'Use 2-3 times per week'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-amber-500/10 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/hair-care"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Hair Care</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center mx-auto mb-6">
              <Sparkle className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Ayurvedic Oils & Masks
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Nourish and strengthen hair with traditional oil blends and hair masks
            </p>
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {treatments.map((treatment, index) => (
              <Card key={index} className="border-2 border-sage-green/30 bg-white shadow-lg">
                <CardHeader className="bg-sage-green/10">
                  <CardTitle className="text-2xl text-earth-green font-serif flex items-center gap-3">
                    <img 
                      src="/assets/generated/ayur-leaf.dim_64x64.png" 
                      alt="Leaf" 
                      className="w-8 h-8"
                    />
                    {treatment.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-earth-green mb-3">Ingredients:</h3>
                    <ul className="list-disc list-inside space-y-1 text-warm-brown/80">
                      {treatment.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-earth-green mb-3">Application:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-warm-brown/80">
                      {treatment.application.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-earth-green mb-3">Benefits:</h3>
                    <ul className="list-disc list-inside space-y-1 text-warm-brown/80">
                      {treatment.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gold/10 p-4 rounded-lg border border-gold/30">
                    <h3 className="text-lg font-semibold text-earth-green mb-2">Frequency:</h3>
                    <p className="text-warm-brown/80">{treatment.frequency}</p>
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
              Tips for Effective Oil & Mask Treatments
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Warm Oil</h3>
                <p className="text-warm-brown/80 text-sm">Slightly warm oil penetrates better into hair shaft</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Massage Technique</h3>
                <p className="text-warm-brown/80 text-sm">Use circular motions to improve blood circulation</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Storage</h3>
                <p className="text-warm-brown/80 text-sm">Store homemade oils in dark glass bottles</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
