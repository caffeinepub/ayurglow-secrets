import { Leaf, Droplet, Flame, Sun } from "lucide-react";

export default function ImmunityBoostPage() {
  const remedies = [
    {
      title: "Turmeric Golden Milk",
      icon: <Sun className="w-8 h-8 text-gold" />,
      ingredients: ["1 cup warm milk", "1 tsp turmeric powder", "1/2 tsp cinnamon", "Pinch of black pepper", "1 tsp honey"],
      application: [
        "Heat milk until warm (not boiling)",
        "Add turmeric, cinnamon, and black pepper",
        "Stir well and let steep for 2 minutes",
        "Add honey before drinking"
      ],
      benefits: "Powerful anti-inflammatory and immune-boosting properties. Curcumin in turmeric enhances antibody responses.",
      frequency: "Daily before bedtime"
    },
    {
      title: "Tulsi-Ginger Tea",
      icon: <Leaf className="w-8 h-8 text-earth-green" />,
      ingredients: ["10-12 fresh tulsi leaves", "1-inch ginger root", "2 cups water", "1 tsp honey", "Few drops lemon juice"],
      application: [
        "Crush tulsi leaves and grate ginger",
        "Boil water and add tulsi and ginger",
        "Simmer for 5-7 minutes",
        "Strain, add honey and lemon"
      ],
      benefits: "Tulsi is an adaptogen that strengthens immunity. Ginger adds antimicrobial properties.",
      frequency: "Twice daily, morning and evening"
    },
    {
      title: "Chyawanprash Tonic",
      icon: <Flame className="w-8 h-8 text-warm-brown" />,
      ingredients: ["1 tbsp Chyawanprash", "1 cup warm milk or water"],
      application: [
        "Take 1 tablespoon of Chyawanprash",
        "Mix with warm milk or water",
        "Consume on empty stomach"
      ],
      benefits: "Traditional Ayurvedic formula with 40+ herbs. Boosts immunity, energy, and vitality.",
      frequency: "Once daily in the morning"
    },
    {
      title: "Amla-Honey Immunity Shot",
      icon: <Droplet className="w-8 h-8 text-sage-green" />,
      ingredients: ["2 fresh amla (Indian gooseberry)", "1 tsp honey", "Pinch of rock salt"],
      application: [
        "Extract juice from fresh amla",
        "Mix with honey and rock salt",
        "Consume immediately"
      ],
      benefits: "Amla is richest source of Vitamin C. Enhances white blood cell production and antioxidant defense.",
      frequency: "Daily on empty stomach"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#000000' }}>
            Ayurvedic Immunity Boosting Remedies | Natural Ways to Increase Immunity
          </h1>
          <p className="text-lg mb-8" style={{ color: '#000000' }}>
            Strengthen your body's natural defense system with these powerful Ayurvedic immunity boosters.
          </p>

          <div className="space-y-8">
            {remedies.map((remedy, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <div className="flex items-center gap-3 mb-4">
                  {remedy.icon}
                  <h2 className="text-2xl font-semibold" style={{ color: '#000000' }}>{remedy.title}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: '#000000' }}>Ingredients:</h3>
                    <ul className="list-disc list-inside space-y-1" style={{ color: '#000000' }}>
                      {remedy.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: '#000000' }}>Application:</h3>
                    <ol className="list-decimal list-inside space-y-1" style={{ color: '#000000' }}>
                      {remedy.application.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="mb-2" style={{ color: '#000000' }}>
                    <span className="font-semibold">Benefits:</span> {remedy.benefits}
                  </p>
                  <p style={{ color: '#000000' }}>
                    <span className="font-semibold">Frequency:</span> {remedy.frequency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
