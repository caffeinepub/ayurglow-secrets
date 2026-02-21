import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flower2, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function DIYFacePacksPage() {
  const facePacks = [
    {
      title: 'Multani Mitti (Fuller\'s Earth) Pack',
      ingredients: ['2 tbsp multani mitti', '1 tbsp rose water', '1 tsp honey', '1 tsp lemon juice'],
      skinType: 'Oily and Acne-Prone Skin',
      application: [
        'Mix multani mitti with rose water',
        'Add honey and lemon juice',
        'Make a smooth paste',
        'Apply evenly on face',
        'Let dry completely (15-20 minutes)',
        'Wash off with lukewarm water'
      ],
      benefits: ['Absorbs excess oil', 'Tightens pores', 'Removes impurities', 'Prevents acne'],
      frequency: 'Use 2 times per week'
    },
    {
      title: 'Sandalwood-Turmeric Glow Pack',
      ingredients: ['2 tbsp sandalwood powder', '1 tsp turmeric', '3 tbsp milk or yogurt', '1 tsp honey'],
      skinType: 'All Skin Types',
      application: [
        'Mix sandalwood and turmeric powder',
        'Add milk or yogurt',
        'Mix in honey',
        'Apply on face and neck',
        'Leave for 20 minutes',
        'Rinse with cool water'
      ],
      benefits: ['Brightens complexion', 'Reduces blemishes', 'Cooling effect', 'Natural glow'],
      frequency: 'Apply 2-3 times weekly'
    },
    {
      title: 'Oatmeal-Honey Soothing Pack',
      ingredients: ['2 tbsp ground oatmeal', '1 tbsp honey', '2 tbsp yogurt', '1 tsp aloe vera gel'],
      skinType: 'Sensitive and Dry Skin',
      application: [
        'Grind oatmeal into fine powder',
        'Mix with honey and yogurt',
        'Add aloe vera gel',
        'Apply gently on face',
        'Leave for 15-20 minutes',
        'Wash off with lukewarm water'
      ],
      benefits: ['Soothes irritation', 'Moisturizes deeply', 'Gentle exfoliation', 'Reduces redness'],
      frequency: 'Use 2-3 times per week'
    },
    {
      title: 'Banana-Honey Nourishing Pack',
      ingredients: ['1 ripe banana', '1 tbsp honey', '1 tsp coconut oil', '1 tsp lemon juice'],
      skinType: 'Dry and Mature Skin',
      application: [
        'Mash banana until smooth',
        'Mix with honey and coconut oil',
        'Add lemon juice',
        'Apply thick layer on face',
        'Leave for 20-25 minutes',
        'Rinse with warm water'
      ],
      benefits: ['Deep nourishment', 'Anti-aging properties', 'Softens skin', 'Improves elasticity'],
      frequency: 'Apply 2 times weekly'
    },
    {
      title: 'Neem-Tulsi Purifying Pack',
      ingredients: ['10 neem leaves', '10 tulsi leaves', '2 tbsp yogurt', '1 tsp turmeric', '1 tsp honey'],
      skinType: 'Acne-Prone and Oily Skin',
      application: [
        'Grind neem and tulsi leaves',
        'Mix with yogurt',
        'Add turmeric and honey',
        'Apply on affected areas',
        'Leave for 15-20 minutes',
        'Wash off with cool water'
      ],
      benefits: ['Antibacterial action', 'Purifies skin', 'Prevents breakouts', 'Heals acne'],
      frequency: 'Use 3 times per week'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-green-500/10 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/skin-care"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Skin Care</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <Flower2 className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              DIY Herbal Face Packs
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Create effective face masks at home using natural Ayurvedic ingredients
            </p>
          </div>
        </div>
      </section>

      {/* Face Packs Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {facePacks.map((pack, index) => (
              <Card key={index} className="border-2 border-sage-green/30 bg-white shadow-lg">
                <CardHeader className="bg-sage-green/10">
                  <CardTitle className="text-2xl text-earth-green font-serif flex items-center gap-3">
                    <img 
                      src="/assets/generated/ayur-leaf.dim_64x64.png" 
                      alt="Leaf" 
                      className="w-8 h-8"
                    />
                    {pack.title}
                  </CardTitle>
                  <p className="text-sm text-warm-brown/70 mt-2">
                    <strong>Best for:</strong> {pack.skinType}
                  </p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-earth-green mb-3">Ingredients:</h3>
                    <ul className="list-disc list-inside space-y-1 text-warm-brown/80">
                      {pack.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-earth-green mb-3">Application:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-warm-brown/80">
                      {pack.application.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-earth-green mb-3">Benefits:</h3>
                    <ul className="list-disc list-inside space-y-1 text-warm-brown/80">
                      {pack.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gold/10 p-4 rounded-lg border border-gold/30">
                    <h3 className="text-lg font-semibold text-earth-green mb-2">Frequency:</h3>
                    <p className="text-warm-brown/80">{pack.frequency}</p>
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
              Tips for Best Results
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Fresh Ingredients</h3>
                <p className="text-warm-brown/80 text-sm">Always use fresh, natural ingredients for maximum benefits</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Patch Test</h3>
                <p className="text-warm-brown/80 text-sm">Test on small skin area first to check for allergies</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Consistency</h3>
                <p className="text-warm-brown/80 text-sm">Regular use shows better and lasting results</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
