import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function ImmunityBoostingPage() {
  const remedies = [
    {
      title: 'Golden Turmeric Milk (Haldi Doodh)',
      ingredients: ['1 cup warm milk', '1 tsp turmeric powder', '1/4 tsp black pepper', '1 tsp honey', 'Pinch of cinnamon'],
      preparation: [
        'Heat milk in a saucepan until warm (not boiling)',
        'Add turmeric powder and black pepper',
        'Stir well and simmer for 2-3 minutes',
        'Remove from heat and add honey',
        'Sprinkle cinnamon on top'
      ],
      benefits: ['Boosts immune system', 'Anti-inflammatory properties', 'Improves digestion', 'Promotes better sleep'],
      usage: 'Drink once daily before bedtime for best results'
    },
    {
      title: 'Amla (Indian Gooseberry) Juice',
      ingredients: ['2-3 fresh amla fruits', '1 cup water', '1 tsp honey (optional)', 'Pinch of rock salt'],
      preparation: [
        'Wash amla fruits thoroughly',
        'Remove seeds and chop into small pieces',
        'Blend with water until smooth',
        'Strain the juice',
        'Add honey and rock salt to taste'
      ],
      benefits: ['Rich in Vitamin C', 'Strengthens immunity', 'Improves skin health', 'Enhances metabolism'],
      usage: 'Consume 30ml on empty stomach every morning'
    },
    {
      title: 'Tulsi (Holy Basil) Tea',
      ingredients: ['10-12 fresh tulsi leaves', '2 cups water', '1 tsp grated ginger', '1 tsp honey', 'Few drops of lemon juice'],
      preparation: [
        'Boil water in a pot',
        'Add tulsi leaves and grated ginger',
        'Simmer for 5-7 minutes',
        'Strain into a cup',
        'Add honey and lemon juice'
      ],
      benefits: ['Powerful adaptogen', 'Reduces stress', 'Fights infections', 'Purifies blood'],
      usage: 'Drink 2-3 times daily, especially during seasonal changes'
    },
    {
      title: 'Chyawanprash Remedy',
      ingredients: ['1-2 tsp Chyawanprash', '1 cup warm milk or water'],
      preparation: [
        'Take 1-2 teaspoons of Chyawanprash',
        'Mix with warm milk or water',
        'Consume directly or mixed'
      ],
      benefits: ['Complete immunity booster', 'Rich in antioxidants', 'Improves respiratory health', 'Enhances energy levels'],
      usage: 'Take daily in the morning before breakfast'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-green-500/10 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/health-remedies"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Health Remedies</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Immunity Boosting Remedies
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Strengthen your natural defenses with powerful Ayurvedic herbs and practices
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
              Additional Tips for Strong Immunity
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Daily Routine</h3>
                <p className="text-warm-brown/80 text-sm">Follow a consistent sleep schedule and wake up early for optimal immunity</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Yoga & Exercise</h3>
                <p className="text-warm-brown/80 text-sm">Practice pranayama and gentle yoga daily to strengthen your body</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Balanced Diet</h3>
                <p className="text-warm-brown/80 text-sm">Eat fresh, seasonal foods and avoid processed items for better immunity</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
