import { Sun, Leaf, Droplet, Sparkles } from "lucide-react";

export default function PigmentationPage() {
  const remedies = [
    {
      title: "Lemon-Honey Brightening Mask",
      icon: <Sun className="w-8 h-8 text-gold" />,
      ingredients: ["1 tbsp fresh lemon juice", "2 tbsp honey", "1 tsp yogurt"],
      application: [
        "Mix lemon juice with honey and yogurt",
        "Apply on pigmented areas",
        "Leave for 15-20 minutes",
        "Rinse with cool water"
      ],
      benefits: "Lemon's vitamin C lightens dark spots. Honey moisturizes while yogurt gently exfoliates.",
      frequency: "3 times per week (evening only)"
    },
    {
      title: "Potato-Cucumber Depigmentation Pack",
      icon: <Droplet className="w-8 h-8 text-sage-green" />,
      ingredients: ["1/4 potato juice", "1/4 cucumber juice", "1 tbsp aloe vera gel"],
      application: [
        "Extract fresh potato and cucumber juice",
        "Mix with aloe vera gel",
        "Apply on affected areas",
        "Wash off after 20 minutes"
      ],
      benefits: "Potato contains natural bleaching agents. Cucumber soothes and hydrates.",
      frequency: "Daily for visible results"
    },
    {
      title: "Saffron-Milk Complexion Enhancer",
      icon: <Sparkles className="w-8 h-8 text-gold" />,
      ingredients: ["5-6 saffron strands", "3 tbsp raw milk", "1 tsp gram flour (besan)"],
      application: [
        "Soak saffron in milk for 1 hour",
        "Add gram flour to make paste",
        "Apply evenly on face",
        "Rinse when dry"
      ],
      benefits: "Saffron lightens pigmentation and evens skin tone naturally over time.",
      frequency: "3-4 times per week"
    },
    {
      title: "Orange Peel-Yogurt Vitamin C Mask",
      icon: <Leaf className="w-8 h-8 text-earth-green" />,
      ingredients: ["2 tbsp dried orange peel powder", "2 tbsp plain yogurt", "1 tsp honey"],
      application: [
        "Mix orange peel powder with yogurt",
        "Add honey and blend well",
        "Apply on pigmented areas",
        "Wash off after 15 minutes"
      ],
      benefits: "Orange peel is rich in vitamin C that fades dark spots and brightens complexion.",
      frequency: "2-3 times weekly"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Pigmentation Reduction Remedies</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Fade dark spots and even out skin tone with these natural Ayurvedic brightening treatments.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Sun Protection:</strong> Always use sunscreen during the day when using these remedies, as some ingredients can increase sun sensitivity.
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
