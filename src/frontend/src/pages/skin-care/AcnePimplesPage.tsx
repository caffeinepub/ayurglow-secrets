import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplet, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function AcnePimplesPage() {
  const remedies = [
    {
      title: 'Neem-Turmeric Face Pack',
      ingredients: ['10-12 fresh neem leaves', '1 tsp turmeric powder', '2 tbsp yogurt', '1 tsp honey'],
      application: [
        'Grind neem leaves into a paste',
        'Add turmeric powder and yogurt',
        'Mix in honey',
        'Apply on affected areas',
        'Leave for 15-20 minutes',
        'Rinse with lukewarm water'
      ],
      benefits: ['Antibacterial properties', 'Reduces inflammation', 'Prevents acne breakouts', 'Heals existing pimples'],
      frequency: 'Apply 3-4 times per week'
    },
    {
      title: 'Tea Tree Oil Spot Treatment',
      ingredients: ['2-3 drops tea tree oil', '1 tsp coconut oil or aloe vera gel', 'Cotton swab'],
      application: [
        'Mix tea tree oil with carrier oil',
        'Cleanse face thoroughly',
        'Dip cotton swab in mixture',
        'Apply directly on pimples',
        'Leave overnight',
        'Wash face in the morning'
      ],
      benefits: ['Powerful antibacterial', 'Reduces redness', 'Dries out pimples', 'Prevents scarring'],
      frequency: 'Use daily on affected spots'
    },
    {
      title: 'Sandalwood-Rose Water Paste',
      ingredients: ['2 tbsp sandalwood powder', '3 tbsp rose water', '1 tsp multani mitti (Fuller\'s earth)', 'Pinch of turmeric'],
      application: [
        'Mix sandalwood powder with rose water',
        'Add multani mitti and turmeric',
        'Make a smooth paste',
        'Apply evenly on face',
        'Let dry for 20 minutes',
        'Wash off with cool water'
      ],
      benefits: ['Cools inflamed skin', 'Absorbs excess oil', 'Prevents acne', 'Soothes irritation'],
      frequency: 'Use 2-3 times weekly'
    },
    {
      title: 'Aloe Vera-Lemon Gel',
      ingredients: ['2 tbsp fresh aloe vera gel', '1 tsp lemon juice', '1 tsp honey', 'Few drops of tea tree oil'],
      application: [
        'Extract fresh aloe vera gel',
        'Mix with lemon juice and honey',
        'Add tea tree oil drops',
        'Apply on clean face',
        'Leave for 15 minutes',
        'Rinse with water and pat dry'
      ],
      benefits: ['Reduces acne scars', 'Controls oil production', 'Antibacterial action', 'Soothes skin'],
      frequency: 'Apply daily for best results'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-blue-500/10 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/skin-care"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Skin Care</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-6">
              <Droplet className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Acne & Pimples
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Clear skin naturally with herbal treatments that balance your doshas
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
              Preventing Acne Naturally
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Clean Skin</h3>
                <p className="text-warm-brown/80 text-sm">Wash face twice daily with gentle herbal cleanser</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Avoid Touching</h3>
                <p className="text-warm-brown/80 text-sm">Don't pick or squeeze pimples to prevent scarring</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Balanced Diet</h3>
                <p className="text-warm-brown/80 text-sm">Avoid oily, spicy foods and eat fresh vegetables</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
