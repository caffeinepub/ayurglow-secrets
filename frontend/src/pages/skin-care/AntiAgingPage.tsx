import { Sparkles, Leaf, Droplet, Sun } from "lucide-react";

export default function AntiAgingPage() {
  const remedies = [
    {
      title: "Almond-Saffron Youth Serum",
      icon: <Sparkles className="w-8 h-8 text-gold" />,
      ingredients: ["10 soaked almonds", "4-5 saffron strands", "2 tbsp milk", "1 tsp honey", "Few drops vitamin E oil"],
      application: [
        "Blend soaked almonds with milk",
        "Add saffron soaked in warm milk",
        "Mix in honey and vitamin E",
        "Apply and massage gently for 5 minutes",
        "Leave for 20 minutes, then rinse"
      ],
      benefits: "Almonds nourish deeply, saffron brightens, and vitamin E fights free radicals for youthful skin.",
      frequency: "3 times per week"
    },
    {
      title: "Avocado-Honey Collagen Boost Mask",
      icon: <Leaf className="w-8 h-8 text-earth-green" />,
      ingredients: ["1/2 ripe avocado", "1 tbsp honey", "1 tsp olive oil", "Few drops lemon juice"],
      application: [
        "Mash avocado into smooth paste",
        "Mix with honey and olive oil",
        "Add lemon juice",
        "Apply thick layer on face and neck",
        "Rinse after 20-25 minutes"
      ],
      benefits: "Avocado's healthy fats plump skin, honey hydrates, and antioxidants reduce fine lines.",
      frequency: "Twice weekly"
    },
    {
      title: "Rose Water-Glycerin Hydration Tonic",
      icon: <Droplet className="w-8 h-8 text-sage-green" />,
      ingredients: ["3 tbsp rose water", "1 tbsp vegetable glycerin", "Few drops frankincense oil"],
      application: [
        "Mix rose water with glycerin",
        "Add frankincense oil",
        "Store in spray bottle",
        "Spritz on face morning and night"
      ],
      benefits: "Deeply hydrates, plumps skin, and reduces appearance of wrinkles with regular use.",
      frequency: "Daily, morning and evening"
    },
    {
      title: "Papaya-Yogurt Enzyme Renewal Mask",
      icon: <Sun className="w-8 h-8 text-gold" />,
      ingredients: ["1/4 cup mashed papaya", "2 tbsp yogurt", "1 tsp honey", "1 tsp aloe vera gel"],
      application: [
        "Blend papaya into smooth pulp",
        "Mix with yogurt, honey, and aloe",
        "Apply evenly avoiding eye area",
        "Leave for 15-20 minutes",
        "Rinse with lukewarm water"
      ],
      benefits: "Papaya enzymes exfoliate dead cells, revealing fresher, younger-looking skin.",
      frequency: "Once weekly"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Anti-Aging Remedies</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Turn back time naturally with these Ayurvedic anti-aging treatments that nourish and rejuvenate.
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
