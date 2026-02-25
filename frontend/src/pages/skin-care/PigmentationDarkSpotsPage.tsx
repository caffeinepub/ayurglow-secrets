import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function PigmentationDarkSpotsPage() {
  const remedies = [
    {
      title: 'Lemon-Honey Brightening Mask',
      ingredients: ['1 tbsp fresh lemon juice', '2 tbsp honey', '1 tsp yogurt', 'Pinch of turmeric'],
      application: [
        'Mix lemon juice with honey',
        'Add yogurt and turmeric',
        'Apply on dark spots and pigmented areas',
        'Leave for 15 minutes',
        'Rinse with lukewarm water',
        'Apply sunscreen if going out'
      ],
      benefits: ['Lightens dark spots', 'Evens skin tone', 'Natural bleaching agent', 'Reduces pigmentation'],
      frequency: 'Use 3 times per week'
    },
    {
      title: 'Potato-Cucumber Juice',
      ingredients: ['1 small potato', '1/2 cucumber', '1 tsp lemon juice', 'Cotton pads'],
      application: [
        'Grate potato and cucumber',
        'Extract juice using a strainer',
        'Mix with lemon juice',
        'Apply with cotton pad on affected areas',
        'Leave for 20 minutes',
        'Wash off with cold water'
      ],
      benefits: ['Fades dark spots naturally', 'Reduces melanin production', 'Brightens complexion', 'Soothes skin'],
      frequency: 'Apply daily for visible results'
    },
    {
      title: 'Almond-Milk Cream',
      ingredients: ['5-6 almonds', '2 tbsp milk', '1 tsp honey', '1/2 tsp saffron'],
      application: [
        'Soak almonds overnight',
        'Grind into fine paste with milk',
        'Add honey and saffron',
        'Apply on pigmented areas',
        'Massage gently for 5 minutes',
        'Leave for 20 minutes then rinse'
      ],
      benefits: ['Nourishes skin deeply', 'Reduces pigmentation', 'Improves skin texture', 'Natural skin lightener'],
      frequency: 'Use 4 times per week'
    },
    {
      title: 'Orange Peel-Yogurt Pack',
      ingredients: ['2 tbsp dried orange peel powder', '3 tbsp yogurt', '1 tsp honey', 'Few drops of rose water'],
      application: [
        'Mix orange peel powder with yogurt',
        'Add honey and rose water',
        'Apply evenly on face',
        'Focus on dark spots',
        'Leave for 20 minutes',
        'Scrub gently while washing off'
      ],
      benefits: ['Rich in Vitamin C', 'Brightens skin', 'Exfoliates dead cells', 'Reduces tan and spots'],
      frequency: 'Apply 2-3 times weekly'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-orange-500/10 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/skin-care"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Skin Care</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-rose-500/20 flex items-center justify-center mx-auto mb-6">
              <Sun className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Pigmentation & Dark Spots
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Fade dark spots and even skin tone with powerful natural ingredients
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
              Tips for Even Skin Tone
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Sun Protection</h3>
                <p className="text-warm-brown/80 text-sm">Always use natural sunscreen to prevent further pigmentation</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Be Patient</h3>
                <p className="text-warm-brown/80 text-sm">Natural remedies take time; consistent use shows results</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Hydration</h3>
                <p className="text-warm-brown/80 text-sm">Drink plenty of water to flush out toxins</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
