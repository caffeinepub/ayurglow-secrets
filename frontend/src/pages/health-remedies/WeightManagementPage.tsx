import { Leaf, Droplet, Flame, Sun } from "lucide-react";

export default function WeightManagementPage() {
  const remedies = [
    {
      title: "Warm Lemon-Honey Water",
      icon: <Sun className="w-8 h-8 text-gold" />,
      ingredients: ["1 cup warm water", "1/2 lemon juice", "1 tsp raw honey", "Pinch of cinnamon powder"],
      application: [
        "Heat water until warm (not boiling)",
        "Squeeze fresh lemon juice",
        "Add honey and cinnamon",
        "Stir well and drink immediately"
      ],
      benefits: "Boosts metabolism, aids fat burning, and detoxifies the body naturally.",
      frequency: "Every morning on empty stomach"
    },
    {
      title: "Triphala-Guggul Formula",
      icon: <Leaf className="w-8 h-8 text-earth-green" />,
      ingredients: ["1 tsp Triphala powder", "500mg Guggul extract", "1 cup warm water"],
      application: [
        "Mix Triphala powder in warm water",
        "Take Guggul tablet with the mixture",
        "Consume before bedtime"
      ],
      benefits: "Supports healthy metabolism, reduces cholesterol, and promotes fat metabolism.",
      frequency: "Once daily before sleep"
    },
    {
      title: "Ginger-Green Tea Metabolism Booster",
      icon: <Flame className="w-8 h-8 text-warm-brown" />,
      ingredients: ["1 green tea bag", "1-inch fresh ginger", "1 cup hot water", "Few mint leaves", "1/2 tsp honey"],
      application: [
        "Grate ginger and add to hot water",
        "Add green tea bag and mint leaves",
        "Steep for 5 minutes",
        "Strain, add honey, and drink"
      ],
      benefits: "Increases thermogenesis, burns calories, and reduces appetite naturally.",
      frequency: "2-3 times daily between meals"
    },
    {
      title: "Cabbage-Carrot Detox Juice",
      icon: <Droplet className="w-8 h-8 text-sage-green" />,
      ingredients: ["1 cup chopped cabbage", "1 medium carrot", "1/2 cucumber", "1/2 lemon juice", "Pinch of black salt"],
      application: [
        "Blend all vegetables with little water",
        "Strain if desired",
        "Add lemon juice and black salt",
        "Drink fresh immediately"
      ],
      benefits: "Low in calories, high in fiber. Promotes satiety and supports healthy weight loss.",
      frequency: "Once daily as meal replacement or before meals"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Weight Management Remedies</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Achieve healthy weight balance naturally with these Ayurvedic metabolism-boosting remedies.
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
