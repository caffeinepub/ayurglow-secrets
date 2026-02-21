import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function GreyHairSolutionsPage() {
  const remedies = [
    {
      title: 'Curry Leaves-Coconut Oil Infusion',
      ingredients: ['2 cups fresh curry leaves', '1 cup coconut oil', '1 tbsp fenugreek seeds'],
      application: [
        'Heat coconut oil in a pan',
        'Add curry leaves and fenugreek seeds',
        'Heat until leaves turn crispy',
        'Cool and strain the oil',
        'Massage into scalp and hair',
        'Leave overnight, wash in morning'
      ],
      benefits: ['Prevents premature greying', 'Darkens hair naturally', 'Nourishes hair roots', 'Promotes melanin production'],
      frequency: 'Use 3-4 times per week'
    },
    {
      title: 'Amla-Henna Hair Pack',
      ingredients: ['3 tbsp amla powder', '2 tbsp henna powder', '1 tbsp coffee powder', '1 cup water', '1 tbsp yogurt'],
      application: [
        'Mix amla, henna, and coffee powder',
        'Add water to make thick paste',
        'Let it sit for 2-3 hours',
        'Add yogurt before applying',
        'Apply on hair and scalp',
        'Leave for 2-3 hours then wash'
      ],
      benefits: ['Natural hair darkening', 'Covers grey hair', 'Conditions hair', 'Strengthens hair shaft'],
      frequency: 'Apply once every 2 weeks'
    },
    {
      title: 'Black Tea-Coffee Rinse',
      ingredients: ['2 tbsp black tea leaves', '2 tbsp coffee powder', '3 cups water'],
      application: [
        'Boil water with tea and coffee',
        'Simmer for 10 minutes',
        'Let it cool completely',
        'Strain the liquid',
        'Use as final rinse after shampooing',
        'Leave in hair, do not rinse'
      ],
      benefits: ['Darkens hair temporarily', 'Adds shine', 'Covers grey strands', 'Natural and safe'],
      frequency: 'Use after every hair wash'
    },
    {
      title: 'Bhringraj-Brahmi Oil Treatment',
      ingredients: ['2 tbsp bhringraj powder', '2 tbsp brahmi powder', '1 cup coconut oil', '1 tsp black sesame seeds'],
      application: [
        'Heat coconut oil gently',
        'Add bhringraj and brahmi powder',
        'Add crushed sesame seeds',
        'Heat for 10 minutes on low flame',
        'Cool and strain',
        'Massage into scalp, leave overnight'
      ],
      benefits: ['Prevents premature greying', 'Promotes hair pigmentation', 'Nourishes deeply', 'Traditional Ayurvedic remedy'],
      frequency: 'Apply 2-3 times weekly'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-purple-500/10 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/hair-care"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Hair Care</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center mx-auto mb-6">
              <Palette className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Grey Hair Solutions
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Prevent and reverse premature greying with Ayurvedic remedies
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
              Lifestyle Tips to Prevent Grey Hair
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Reduce Stress</h3>
                <p className="text-warm-brown/80 text-sm">Practice meditation to prevent stress-induced greying</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Vitamin B12</h3>
                <p className="text-warm-brown/80 text-sm">Include B12-rich foods like dairy and eggs</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Avoid Chemicals</h3>
                <p className="text-warm-brown/80 text-sm">Use natural hair products without harsh chemicals</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
