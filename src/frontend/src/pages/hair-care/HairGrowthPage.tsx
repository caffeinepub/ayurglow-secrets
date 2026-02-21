import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function HairGrowthPage() {
  const remedies = [
    {
      title: 'Castor Oil-Coconut Oil Blend',
      ingredients: ['2 tbsp castor oil', '2 tbsp coconut oil', '1 tsp vitamin E oil', 'Few drops of rosemary oil'],
      application: [
        'Mix all oils in a bowl',
        'Warm slightly for better absorption',
        'Part hair into sections',
        'Apply oil on scalp and massage',
        'Leave overnight or minimum 2 hours',
        'Wash with mild shampoo'
      ],
      benefits: ['Stimulates hair growth', 'Thickens hair', 'Nourishes follicles', 'Improves hair density'],
      frequency: 'Apply 2-3 times per week'
    },
    {
      title: 'Aloe Vera-Bhringraj Hair Mask',
      ingredients: ['3 tbsp fresh aloe vera gel', '2 tbsp bhringraj powder', '1 tbsp coconut oil', '1 tsp honey'],
      application: [
        'Extract fresh aloe vera gel',
        'Mix with bhringraj powder',
        'Add coconut oil and honey',
        'Apply on scalp and hair length',
        'Massage for 5-10 minutes',
        'Leave for 30 minutes then wash'
      ],
      benefits: ['Promotes rapid hair growth', 'Strengthens hair roots', 'Prevents hair loss', 'Adds volume'],
      frequency: 'Use twice weekly'
    },
    {
      title: 'Egg-Yogurt Protein Treatment',
      ingredients: ['1 whole egg', '2 tbsp yogurt', '1 tbsp olive oil', '1 tsp honey'],
      application: [
        'Beat egg thoroughly',
        'Mix with yogurt and olive oil',
        'Add honey and blend well',
        'Apply on damp hair',
        'Leave for 30 minutes',
        'Rinse with cool water and shampoo'
      ],
      benefits: ['Rich in protein', 'Promotes hair growth', 'Adds shine and strength', 'Repairs damaged hair'],
      frequency: 'Apply once weekly'
    },
    {
      title: 'Hibiscus-Curry Leaves Hair Pack',
      ingredients: ['10 hibiscus flowers', '15 curry leaves', '2 tbsp coconut oil', '1 tbsp yogurt'],
      application: [
        'Grind hibiscus flowers and curry leaves',
        'Mix with coconut oil',
        'Add yogurt to make paste',
        'Apply on scalp and hair',
        'Leave for 45 minutes',
        'Wash with herbal shampoo'
      ],
      benefits: ['Stimulates hair follicles', 'Prevents premature greying', 'Promotes thick growth', 'Conditions hair'],
      frequency: 'Use 2 times per week'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-green-500/10 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/hair-care"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Hair Care</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <Sprout className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Hair Growth Remedies
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Stimulate healthy hair growth with traditional Ayurvedic treatments
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
              Boost Hair Growth Naturally
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Balanced Diet</h3>
                <p className="text-warm-brown/80 text-sm">Include biotin-rich foods like nuts and seeds</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Stay Hydrated</h3>
                <p className="text-warm-brown/80 text-sm">Drink plenty of water for healthy hair growth</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Reduce Stress</h3>
                <p className="text-warm-brown/80 text-sm">Practice yoga and meditation for better results</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
