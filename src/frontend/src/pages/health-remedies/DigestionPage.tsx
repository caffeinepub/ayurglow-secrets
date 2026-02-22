import { Leaf, Droplet, Flame, Sun } from "lucide-react";

export default function DigestionPage() {
  const remedies = [
    {
      title: "Triphala Powder",
      icon: <Leaf className="w-8 h-8 text-earth-green" />,
      ingredients: ["1 tsp Triphala powder", "1 cup warm water", "Optional: 1/2 tsp honey"],
      application: [
        "Mix Triphala powder in warm water",
        "Stir well until dissolved",
        "Add honey if desired",
        "Drink on empty stomach"
      ],
      benefits: "Balances all three doshas, improves digestion, and gently cleanses the digestive tract.",
      frequency: "Once daily before bedtime or early morning"
    },
    {
      title: "Ginger-Lemon Digestive Tonic",
      icon: <Flame className="w-8 h-8 text-warm-brown" />,
      ingredients: ["1-inch fresh ginger", "1/2 lemon juice", "1 tsp honey", "Pinch of rock salt", "1 cup warm water"],
      application: [
        "Grate ginger and extract juice",
        "Mix ginger juice with lemon juice",
        "Add honey and rock salt",
        "Mix in warm water and drink"
      ],
      benefits: "Stimulates digestive fire (Agni), reduces bloating, and improves nutrient absorption.",
      frequency: "Before meals, 2-3 times daily"
    },
    {
      title: "Cumin-Coriander-Fennel Tea (CCF Tea)",
      icon: <Sun className="w-8 h-8 text-gold" />,
      ingredients: ["1 tsp cumin seeds", "1 tsp coriander seeds", "1 tsp fennel seeds", "3 cups water"],
      application: [
        "Boil water in a pot",
        "Add all three seeds",
        "Simmer for 5-10 minutes",
        "Strain and sip throughout the day"
      ],
      benefits: "Balances digestive fire, reduces gas and bloating, supports healthy metabolism.",
      frequency: "Sip throughout the day between meals"
    },
    {
      title: "Ajwain Water",
      icon: <Droplet className="w-8 h-8 text-sage-green" />,
      ingredients: ["1 tsp ajwain (carom seeds)", "1 cup water"],
      application: [
        "Boil water with ajwain seeds",
        "Simmer for 3-5 minutes",
        "Strain and drink warm"
      ],
      benefits: "Relieves indigestion, gas, and acidity. Powerful carminative properties.",
      frequency: "After heavy meals or when experiencing digestive discomfort"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Digestive Health Remedies</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Restore your digestive fire and balance with these time-tested Ayurvedic remedies.
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
