import { Leaf, Droplet, Flame, Moon } from "lucide-react";

export default function StressSleepPage() {
  const remedies = [
    {
      title: "Ashwagandha Moon Milk",
      icon: <Moon className="w-8 h-8 text-sage-green" />,
      ingredients: ["1 cup warm milk", "1 tsp ashwagandha powder", "1/4 tsp nutmeg powder", "1 tsp honey", "Pinch of cardamom"],
      application: [
        "Warm milk gently (do not boil)",
        "Add ashwagandha and nutmeg",
        "Stir well and let steep for 2 minutes",
        "Add honey and cardamom before drinking"
      ],
      benefits: "Ashwagandha is a powerful adaptogen that reduces cortisol, calms the mind, and promotes deep sleep.",
      frequency: "Daily 30 minutes before bedtime"
    },
    {
      title: "Brahmi-Tulsi Stress Relief Tea",
      icon: <Leaf className="w-8 h-8 text-earth-green" />,
      ingredients: ["1 tsp dried brahmi leaves", "8-10 fresh tulsi leaves", "2 cups water", "1 tsp honey", "Few drops lemon"],
      application: [
        "Boil water with brahmi and tulsi",
        "Simmer for 5-7 minutes",
        "Strain into a cup",
        "Add honey and lemon"
      ],
      benefits: "Brahmi enhances cognitive function and reduces anxiety. Tulsi balances stress hormones.",
      frequency: "Twice daily, morning and evening"
    },
    {
      title: "Chamomile-Lavender Sleep Blend",
      icon: <Droplet className="w-8 h-8 text-sage-green" />,
      ingredients: ["1 chamomile tea bag", "1 tsp dried lavender flowers", "1 cup hot water", "1 tsp honey"],
      application: [
        "Steep chamomile and lavender in hot water",
        "Cover and let infuse for 10 minutes",
        "Strain and add honey",
        "Sip slowly before bed"
      ],
      benefits: "Chamomile and lavender have natural sedative properties that promote relaxation and restful sleep.",
      frequency: "Every night 30-60 minutes before sleep"
    },
    {
      title: "Warm Almond-Saffron Milk",
      icon: <Flame className="w-8 h-8 text-warm-brown" />,
      ingredients: ["10 soaked almonds", "1 cup warm milk", "2-3 saffron strands", "1/4 tsp cardamom powder", "1 tsp honey"],
      application: [
        "Blend soaked almonds with little milk",
        "Heat remaining milk with saffron",
        "Mix almond paste into warm milk",
        "Add cardamom and honey"
      ],
      benefits: "Almonds contain magnesium for relaxation. Saffron elevates mood and promotes quality sleep.",
      frequency: "Daily before bedtime"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Stress Relief & Better Sleep</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find calm and restful sleep with these soothing Ayurvedic remedies for stress management.
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
