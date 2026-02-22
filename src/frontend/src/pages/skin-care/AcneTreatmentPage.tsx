import { Leaf, Droplet, Flame, Sparkles } from "lucide-react";

export default function AcneTreatmentPage() {
  const remedies = [
    {
      title: "Neem-Turmeric Acne Paste",
      icon: <Leaf className="w-8 h-8 text-earth-green" />,
      ingredients: ["10-12 fresh neem leaves", "1 tsp turmeric powder", "2 tbsp rose water"],
      application: [
        "Grind neem leaves into paste",
        "Mix with turmeric and rose water",
        "Apply on affected areas",
        "Wash off after 15 minutes"
      ],
      benefits: "Neem has powerful antibacterial properties. Turmeric reduces inflammation and prevents scarring.",
      frequency: "Daily or every other day"
    },
    {
      title: "Tea Tree-Aloe Spot Treatment",
      icon: <Droplet className="w-8 h-8 text-sage-green" />,
      ingredients: ["2 tbsp fresh aloe vera gel", "3-4 drops tea tree essential oil", "1 tsp honey"],
      application: [
        "Mix aloe vera gel with tea tree oil",
        "Add honey and blend well",
        "Apply directly on pimples",
        "Leave overnight or for 2 hours"
      ],
      benefits: "Tea tree oil kills acne-causing bacteria. Aloe soothes and heals without drying.",
      frequency: "Daily on active breakouts"
    },
    {
      title: "Sandalwood-Rosewater Face Pack",
      icon: <Sparkles className="w-8 h-8 text-gold" />,
      ingredients: ["2 tbsp sandalwood powder", "3 tbsp rose water", "1 tsp multani mitti (Fuller's earth)"],
      application: [
        "Mix sandalwood and multani mitti",
        "Add rose water to make paste",
        "Apply evenly on face",
        "Rinse when completely dry"
      ],
      benefits: "Sandalwood cools and heals. Multani mitti absorbs excess oil and unclogs pores.",
      frequency: "2-3 times per week"
    },
    {
      title: "Cinnamon-Honey Antibacterial Mask",
      icon: <Flame className="w-8 h-8 text-warm-brown" />,
      ingredients: ["1 tsp cinnamon powder", "2 tbsp raw honey"],
      application: [
        "Mix cinnamon and honey thoroughly",
        "Apply on cleansed face",
        "Leave for 10-15 minutes",
        "Rinse with warm water"
      ],
      benefits: "Cinnamon has antimicrobial properties. Honey moisturizes while fighting bacteria.",
      frequency: "2-3 times weekly"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Acne Treatment Remedies</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Clear acne naturally with these powerful Ayurvedic antibacterial and anti-inflammatory treatments.
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
