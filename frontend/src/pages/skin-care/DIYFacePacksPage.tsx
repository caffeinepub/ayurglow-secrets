import { Sparkles, Leaf, Droplet, Sun } from "lucide-react";

export default function DIYFacePacksPage() {
  const facePacks = [
    {
      title: "Multani Mitti Deep Cleanse Pack",
      icon: <Leaf className="w-8 h-8 text-earth-green" />,
      skinType: "Oily & Combination",
      ingredients: ["2 tbsp multani mitti (Fuller's earth)", "1 tbsp rose water", "1 tsp lemon juice", "1 tsp honey"],
      application: [
        "Mix multani mitti with rose water",
        "Add lemon juice and honey",
        "Apply evenly on face",
        "Let dry completely (15-20 min)",
        "Rinse with lukewarm water"
      ],
      benefits: "Absorbs excess oil, unclogs pores, removes impurities, and tightens skin naturally.",
      frequency: "Twice weekly"
    },
    {
      title: "Besan-Turmeric Brightening Pack",
      icon: <Sun className="w-8 h-8 text-gold" />,
      skinType: "All Skin Types",
      ingredients: ["2 tbsp gram flour (besan)", "1/2 tsp turmeric", "2 tbsp milk or yogurt", "1 tsp honey"],
      application: [
        "Mix besan with turmeric",
        "Add milk/yogurt to make paste",
        "Mix in honey",
        "Apply and leave for 15 minutes",
        "Scrub gently while rinsing"
      ],
      benefits: "Brightens complexion, removes tan, exfoliates dead skin, and gives instant glow.",
      frequency: "2-3 times per week"
    },
    {
      title: "Oatmeal-Honey Soothing Pack",
      icon: <Droplet className="w-8 h-8 text-sage-green" />,
      skinType: "Sensitive & Dry",
      ingredients: ["2 tbsp ground oatmeal", "1 tbsp honey", "1 tbsp yogurt", "Few drops almond oil"],
      application: [
        "Grind oatmeal into fine powder",
        "Mix with honey and yogurt",
        "Add almond oil",
        "Apply gently on face",
        "Rinse after 15-20 minutes"
      ],
      benefits: "Soothes irritation, deeply moisturizes, reduces redness, and calms sensitive skin.",
      frequency: "2-3 times weekly"
    },
    {
      title: "Sandalwood-Rose Cooling Pack",
      icon: <Sparkles className="w-8 h-8 text-gold" />,
      skinType: "All Skin Types",
      ingredients: ["2 tbsp sandalwood powder", "3 tbsp rose water", "1 tsp honey", "Pinch of turmeric"],
      application: [
        "Mix sandalwood with rose water",
        "Add honey and turmeric",
        "Apply evenly on face and neck",
        "Leave until completely dry",
        "Rinse with cool water"
      ],
      benefits: "Cools and soothes skin, reduces inflammation, evens tone, and provides natural glow.",
      frequency: "2-3 times per week"
    },
    {
      title: "Banana-Honey Nourishing Pack",
      icon: <Sun className="w-8 h-8 text-gold" />,
      skinType: "Dry & Mature",
      ingredients: ["1/2 ripe banana", "1 tbsp honey", "1 tsp olive oil", "Few drops lemon juice"],
      application: [
        "Mash banana into smooth paste",
        "Mix with honey and olive oil",
        "Add lemon juice",
        "Apply thick layer",
        "Wash off after 20 minutes"
      ],
      benefits: "Deeply nourishes, hydrates dry skin, reduces fine lines, and restores elasticity.",
      frequency: "Twice weekly"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">DIY Face Packs</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Create spa-quality face packs at home with these simple, natural Ayurvedic recipes for every skin type.
          </p>

          <div className="space-y-8">
            {facePacks.map((pack, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <div className="flex items-center gap-3 mb-2">
                  {pack.icon}
                  <h2 className="text-2xl font-semibold text-card-foreground">{pack.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4 ml-11">
                  <span className="font-semibold">Best for:</span> {pack.skinType}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Ingredients:</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {pack.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Application:</h3>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      {pack.application.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-muted-foreground mb-2">
                    <span className="font-semibold text-card-foreground">Benefits:</span> {pack.benefits}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-card-foreground">Frequency:</span> {pack.frequency}
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
