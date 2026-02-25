import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function StressSleepSolutionsPage() {
  const remedies = [
    {
      title: 'Ashwagandha Moon Milk',
      ingredients: ['1 cup warm milk', '1 tsp ashwagandha powder', '1/4 tsp nutmeg powder', '1 tsp honey', 'Pinch of cardamom'],
      preparation: [
        'Warm milk in a saucepan (do not boil)',
        'Add ashwagandha powder and stir well',
        'Add nutmeg and cardamom',
        'Remove from heat',
        'Mix in honey before drinking'
      ],
      benefits: ['Reduces stress and anxiety', 'Promotes deep sleep', 'Calms the nervous system', 'Improves sleep quality'],
      usage: 'Drink 30 minutes before bedtime'
    },
    {
      title: 'Brahmi Tea',
      ingredients: ['1 tsp dried brahmi leaves or powder', '2 cups water', '1 tsp honey', 'Few drops of lemon'],
      preparation: [
        'Boil water in a pot',
        'Add brahmi leaves or powder',
        'Simmer for 5-7 minutes',
        'Strain into a cup',
        'Add honey and lemon'
      ],
      benefits: ['Enhances mental clarity', 'Reduces anxiety', 'Improves memory', 'Promotes relaxation'],
      usage: 'Drink twice daily, morning and evening'
    },
    {
      title: 'Chamomile-Lavender Infusion',
      ingredients: ['1 tsp dried chamomile flowers', '1 tsp dried lavender', '2 cups hot water', '1 tsp honey'],
      preparation: [
        'Boil water and let cool slightly',
        'Add chamomile and lavender',
        'Steep for 10 minutes covered',
        'Strain into a cup',
        'Add honey to taste'
      ],
      benefits: ['Induces natural sleep', 'Relieves tension', 'Calms the mind', 'Reduces insomnia'],
      usage: 'Drink 1 hour before sleep'
    },
    {
      title: 'Warm Almond Milk with Saffron',
      ingredients: ['1 cup almond milk', '3-4 saffron strands', '1/4 tsp cardamom powder', '1 tsp honey', '2-3 crushed almonds'],
      preparation: [
        'Soak saffron in 1 tbsp warm milk',
        'Heat almond milk gently',
        'Add soaked saffron with milk',
        'Add cardamom and crushed almonds',
        'Mix in honey before serving'
      ],
      benefits: ['Nourishes the nervous system', 'Promotes restful sleep', 'Reduces mental fatigue', 'Calms Vata dosha'],
      usage: 'Drink every night before bed'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-purple-500/10 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/health-remedies"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Health Remedies</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center mx-auto mb-6">
              <Moon className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Stress & Sleep Solutions
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Find peace and restful sleep with calming Ayurvedic herbs and techniques
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
              Ayurvedic Practices for Better Sleep
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Evening Routine</h3>
                <p className="text-warm-brown/80 text-sm">Establish a calming bedtime routine with warm baths and gentle stretching</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Meditation</h3>
                <p className="text-warm-brown/80 text-sm">Practice 10-15 minutes of meditation or deep breathing before sleep</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Digital Detox</h3>
                <p className="text-warm-brown/80 text-sm">Avoid screens 1-2 hours before bedtime for better sleep quality</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
