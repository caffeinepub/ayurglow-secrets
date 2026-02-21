import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function DandruffScalpCarePage() {
  const remedies = [
    {
      title: 'Neem-Tea Tree Oil Treatment',
      ingredients: ['1 cup neem leaves', '2 cups water', '5 drops tea tree oil', '1 tbsp coconut oil'],
      application: [
        'Boil neem leaves in water',
        'Let it cool and strain',
        'Add tea tree oil and coconut oil',
        'Apply on scalp after shampooing',
        'Massage gently for 5 minutes',
        'Leave for 10 minutes then rinse'
      ],
      benefits: ['Eliminates dandruff', 'Antifungal properties', 'Soothes itchy scalp', 'Prevents recurrence'],
      frequency: 'Use 2-3 times per week'
    },
    {
      title: 'Lemon-Yogurt Scalp Mask',
      ingredients: ['2 tbsp fresh lemon juice', '4 tbsp yogurt', '1 tsp honey', '1 tsp coconut oil'],
      application: [
        'Mix lemon juice with yogurt',
        'Add honey and coconut oil',
        'Apply on scalp sections',
        'Massage gently',
        'Leave for 30 minutes',
        'Wash with mild shampoo'
      ],
      benefits: ['Removes dandruff flakes', 'Balances scalp pH', 'Reduces oiliness', 'Refreshes scalp'],
      frequency: 'Apply twice weekly'
    },
    {
      title: 'Fenugreek-Curd Anti-Dandruff Pack',
      ingredients: ['3 tbsp fenugreek seeds', '1/2 cup yogurt', '1 tsp lemon juice', '1 tsp apple cider vinegar'],
      application: [
        'Soak fenugreek seeds overnight',
        'Grind into paste',
        'Mix with yogurt and lemon juice',
        'Add apple cider vinegar',
        'Apply on scalp',
        'Leave for 45 minutes then wash'
      ],
      benefits: ['Treats stubborn dandruff', 'Moisturizes scalp', 'Reduces inflammation', 'Prevents dryness'],
      frequency: 'Use 2 times per week'
    },
    {
      title: 'Aloe Vera-Coconut Oil Scalp Soother',
      ingredients: ['3 tbsp fresh aloe vera gel', '2 tbsp coconut oil', '1 tsp neem oil', 'Few drops of peppermint oil'],
      application: [
        'Extract fresh aloe vera gel',
        'Mix with coconut oil and neem oil',
        'Add peppermint oil',
        'Apply on scalp and massage',
        'Leave for 1 hour',
        'Wash with herbal shampoo'
      ],
      benefits: ['Soothes irritated scalp', 'Reduces flaking', 'Moisturizes deeply', 'Cooling effect'],
      frequency: 'Apply 2-3 times weekly'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-blue-500/10 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/hair-care"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Hair Care</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-6">
              <Droplets className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Dandruff & Scalp Care
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Eliminate dandruff and maintain a healthy scalp with natural solutions
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
              Preventing Dandruff Naturally
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Regular Washing</h3>
                <p className="text-warm-brown/80 text-sm">Wash hair 2-3 times weekly with herbal shampoo</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Avoid Hot Water</h3>
                <p className="text-warm-brown/80 text-sm">Use lukewarm water to prevent scalp dryness</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Healthy Diet</h3>
                <p className="text-warm-brown/80 text-sm">Reduce sugar and increase omega-3 fatty acids</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
