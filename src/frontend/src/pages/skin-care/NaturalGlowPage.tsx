import { Sparkles, Leaf, Droplet, Sun } from "lucide-react";

export default function NaturalGlowPage() {
  const remedies = [
    {
      title: "Turmeric-Yogurt Glow Mask",
      icon: <Sun className="w-8 h-8 text-gold" />,
      ingredients: ["1 tsp turmeric powder", "2 tbsp plain yogurt", "1 tsp honey", "Few drops lemon juice"],
      application: [
        "Mix all ingredients into a smooth paste",
        "Apply evenly on cleansed face",
        "Leave on for 15-20 minutes",
        "Rinse with lukewarm water"
      ],
      benefits: "Turmeric brightens skin, yogurt exfoliates gently, and honey moisturizes for a natural glow.",
      frequency: "2-3 times per week"
    },
    {
      title: "Saffron-Milk Radiance Treatment",
      icon: <Sparkles className="w-8 h-8 text-gold" />,
      ingredients: ["4-5 saffron strands", "2 tbsp raw milk", "1 tsp sandalwood powder"],
      application: [
        "Soak saffron in milk for 30 minutes",
        "Add sandalwood powder and mix",
        "Apply on face and neck",
        "Wash off after 20 minutes"
      ],
      benefits: "Saffron enhances complexion, milk nourishes, and sandalwood provides cooling effect.",
      frequency: "Twice weekly for best results"
    },
    {
      title: "Aloe Vera-Rose Water Toner",
      icon: <Droplet className="w-8 h-8 text-sage-green" />,
      ingredients: ["2 tbsp fresh aloe vera gel", "2 tbsp rose water", "Few drops vitamin E oil"],
      application: [
        "Mix aloe vera gel with rose water",
        "Add vitamin E oil",
        "Apply with cotton pad after cleansing",
        "Let it absorb naturally"
      ],
      benefits: "Hydrates deeply, balances pH, and gives instant glow while soothing the skin.",
      frequency: "Daily, morning and evening"
    },
    {
      title: "Papaya-Honey Enzyme Mask",
      icon: <Leaf className="w-8 h-8 text-earth-green" />,
      ingredients: ["1/4 cup mashed ripe papaya", "1 tbsp honey", "1 tsp lemon juice"],
      application: [
        "Mash papaya into smooth pulp",
        "Mix with honey and lemon juice",
        "Apply on face avoiding eyes",
        "Rinse after 15 minutes"
      ],
      benefits: "Papaya enzymes exfoliate dead cells, revealing brighter, smoother, glowing skin.",
      frequency: "Once weekly"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Natural Glow Remedies</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Achieve radiant, glowing skin naturally with these Ayurvedic beauty treatments.
          </p>

          <div className="space-y-8">
            {remedies.map((remedy, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <div className="flex items-center gap-3 mb-4">
                  {remedy.icon}
                  <h2 className="text-2xl font-semibold text-card-foreground">{remedy.title}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Ingredients:</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {remedy.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Application:</h3>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      {remedy.application.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-muted-foreground mb-2">
                    <span className="font-semibold text-card-foreground">Benefits:</span> {remedy.benefits}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-card-foreground">Frequency:</span> {remedy.frequency}
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
