import { Leaf, Droplet, Flame, Sun } from "lucide-react";

export default function DiabetesBPPage() {
  const remedies = [
    {
      title: "Fenugreek Seed Water",
      icon: <Droplet className="w-8 h-8 text-sage-green" />,
      ingredients: ["1 tbsp fenugreek seeds", "1 cup water"],
      application: [
        "Soak fenugreek seeds in water overnight",
        "Drink the water on empty stomach",
        "Chew the soaked seeds if desired"
      ],
      benefits: "Helps regulate blood sugar levels and improves insulin sensitivity naturally.",
      frequency: "Daily in the morning on empty stomach"
    },
    {
      title: "Bitter Gourd Juice",
      icon: <Leaf className="w-8 h-8 text-earth-green" />,
      ingredients: ["1 small bitter gourd", "1/2 cup water", "Pinch of rock salt", "Few drops lemon juice"],
      application: [
        "Wash and chop bitter gourd",
        "Blend with water",
        "Strain and add salt and lemon",
        "Drink fresh immediately"
      ],
      benefits: "Contains insulin-like compounds that help lower blood glucose levels effectively.",
      frequency: "Once daily in the morning"
    },
    {
      title: "Cinnamon-Honey Tonic",
      icon: <Flame className="w-8 h-8 text-warm-brown" />,
      ingredients: ["1 tsp cinnamon powder", "1 tsp honey", "1 cup warm water"],
      application: [
        "Mix cinnamon powder in warm water",
        "Let it steep for 10 minutes",
        "Add honey and stir well",
        "Drink before meals"
      ],
      benefits: "Improves insulin sensitivity and helps maintain healthy blood sugar levels.",
      frequency: "Twice daily before main meals"
    },
    {
      title: "Garlic-Lemon BP Control",
      icon: <Sun className="w-8 h-8 text-gold" />,
      ingredients: ["2-3 garlic cloves", "1/2 lemon juice", "1 cup warm water"],
      application: [
        "Crush garlic cloves",
        "Mix with lemon juice",
        "Add to warm water",
        "Drink on empty stomach"
      ],
      benefits: "Helps lower blood pressure naturally and supports cardiovascular health.",
      frequency: "Daily in the morning"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Diabetes & Blood Pressure Management</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Support healthy blood sugar and blood pressure levels with these natural Ayurvedic remedies.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Important:</strong> These remedies are complementary to medical treatment. Always consult your healthcare provider before making changes to your diabetes or blood pressure management plan.
            </p>
          </div>

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
