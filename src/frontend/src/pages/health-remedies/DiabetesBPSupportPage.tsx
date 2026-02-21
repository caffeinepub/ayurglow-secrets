import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function DiabetesBPSupportPage() {
  const remedies = [
    {
      title: 'Fenugreek Seeds Water',
      ingredients: ['1 tbsp fenugreek seeds', '1 cup water'],
      preparation: [
        'Soak fenugreek seeds in water overnight',
        'In the morning, strain the water',
        'Drink on empty stomach',
        'You can also chew the soaked seeds'
      ],
      benefits: ['Helps regulate blood sugar', 'Improves insulin sensitivity', 'Reduces cholesterol', 'Supports heart health'],
      usage: 'Drink daily on empty stomach for 2-3 months'
    },
    {
      title: 'Bitter Gourd (Karela) Juice',
      ingredients: ['1 medium bitter gourd', '1/2 cup water', 'Pinch of rock salt', 'Few drops of lemon'],
      preparation: [
        'Wash and chop bitter gourd',
        'Remove seeds if desired',
        'Blend with water',
        'Strain the juice',
        'Add salt and lemon'
      ],
      benefits: ['Lowers blood sugar naturally', 'Improves glucose metabolism', 'Purifies blood', 'Supports liver function'],
      usage: 'Drink 30ml every morning on empty stomach'
    },
    {
      title: 'Cinnamon Tea',
      ingredients: ['1 cinnamon stick or 1 tsp powder', '2 cups water', '1 tsp honey (optional)'],
      preparation: [
        'Boil water in a pot',
        'Add cinnamon stick or powder',
        'Simmer for 10 minutes',
        'Strain into a cup',
        'Add honey if not diabetic'
      ],
      benefits: ['Regulates blood sugar levels', 'Improves insulin function', 'Reduces blood pressure', 'Anti-inflammatory properties'],
      usage: 'Drink 1-2 cups daily'
    },
    {
      title: 'Garlic-Ginger Remedy',
      ingredients: ['2-3 garlic cloves', '1 inch ginger', '1 cup warm water', '1 tsp honey'],
      preparation: [
        'Crush garlic cloves',
        'Grate ginger finely',
        'Mix both in warm water',
        'Let steep for 5 minutes',
        'Add honey and consume'
      ],
      benefits: ['Lowers blood pressure', 'Reduces blood sugar', 'Improves circulation', 'Strengthens heart'],
      usage: 'Drink once daily in the morning'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-red-500/10 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/health-remedies"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Health Remedies</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-rose-500/20 flex items-center justify-center mx-auto mb-6">
              <Activity className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Diabetes & BP Support
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Natural remedies to help manage blood sugar and blood pressure levels
            </p>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Alert className="border-2 border-gold/50 bg-gold/10">
              <AlertCircle className="h-5 w-5 text-earth-green" />
              <AlertDescription className="text-warm-brown/90">
                <strong>Important:</strong> These remedies are complementary to medical treatment. Always consult your healthcare provider before making changes to your diabetes or blood pressure management plan. Continue prescribed medications as directed.
              </AlertDescription>
            </Alert>
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
              Lifestyle Tips for Managing Diabetes & BP
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Regular Exercise</h3>
                <p className="text-warm-brown/80 text-sm">Walk for 30-45 minutes daily to improve insulin sensitivity</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Stress Management</h3>
                <p className="text-warm-brown/80 text-sm">Practice meditation and pranayama to reduce stress hormones</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Monitor Regularly</h3>
                <p className="text-warm-brown/80 text-sm">Check blood sugar and BP levels as recommended by your doctor</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
