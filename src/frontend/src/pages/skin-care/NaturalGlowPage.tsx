import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function NaturalGlowPage() {
  const remedies = [
    {
      title: 'Turmeric-Honey Face Mask',
      ingredients: ['1 tsp turmeric powder', '2 tsp raw honey', '1 tsp yogurt', 'Few drops of lemon juice'],
      application: [
        'Mix all ingredients in a clean bowl',
        'Cleanse your face thoroughly',
        'Apply the mask evenly avoiding eyes',
        'Leave on for 15-20 minutes',
        'Rinse with lukewarm water',
        'Pat dry and apply moisturizer'
      ],
      benefits: ['Brightens skin tone', 'Reduces dark spots', 'Anti-inflammatory', 'Natural glow enhancer'],
      frequency: 'Use 2-3 times per week'
    },
    {
      title: 'Saffron-Milk Cream',
      ingredients: ['4-5 saffron strands', '2 tbsp milk', '1 tsp sandalwood powder', '1 tsp rose water'],
      application: [
        'Soak saffron in milk for 30 minutes',
        'Add sandalwood powder and rose water',
        'Mix into a smooth paste',
        'Apply on clean face and neck',
        'Leave for 20 minutes',
        'Wash off with cold water'
      ],
      benefits: ['Enhances complexion', 'Provides radiant glow', 'Evens skin tone', 'Nourishes deeply'],
      frequency: 'Apply twice weekly for best results'
    },
    {
      title: 'Aloe Vera-Rose Water Toner',
      ingredients: ['2 tbsp fresh aloe vera gel', '3 tbsp rose water', '1 tsp glycerin', 'Few drops of vitamin E oil'],
      application: [
        'Extract fresh aloe vera gel',
        'Mix with rose water and glycerin',
        'Add vitamin E oil',
        'Store in a clean bottle',
        'Apply with cotton pad after cleansing',
        'Use morning and evening'
      ],
      benefits: ['Hydrates skin', 'Tightens pores', 'Soothes irritation', 'Adds natural radiance'],
      frequency: 'Use daily morning and night'
    },
    {
      title: 'Gram Flour-Turmeric Ubtan',
      ingredients: ['2 tbsp gram flour (besan)', '1/2 tsp turmeric', '1 tbsp yogurt', '1 tsp honey', 'Few drops of rose water'],
      application: [
        'Mix gram flour and turmeric',
        'Add yogurt and honey',
        'Add rose water to make paste',
        'Apply on face and neck',
        'Gently scrub in circular motions',
        'Leave for 10 minutes then rinse'
      ],
      benefits: ['Exfoliates dead skin', 'Brightens complexion', 'Removes tan', 'Traditional glow remedy'],
      frequency: 'Use 2 times per week'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-yellow-500/10 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/skin-care"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Skin Care</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Natural Glow Remedies
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Achieve radiant, luminous skin with traditional Ayurvedic beauty secrets
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
              Tips for Radiant Skin
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Stay Hydrated</h3>
                <p className="text-warm-brown/80 text-sm">Drink 8-10 glasses of water daily for natural glow</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Sleep Well</h3>
                <p className="text-warm-brown/80 text-sm">Get 7-8 hours of quality sleep for skin regeneration</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-sage-green/30">
                <h3 className="font-semibold text-earth-green mb-2">Healthy Diet</h3>
                <p className="text-warm-brown/80 text-sm">Eat fresh fruits and vegetables rich in antioxidants</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
