import { Heart, Leaf, BookOpen } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-sage-green/20 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <img
              src="/assets/generated/ayurglow-logo.dim_400x400.png"
              alt="AyurGlow Secrets Logo"
              className="w-28 h-28 mx-auto mb-6 object-contain drop-shadow-md"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-earth-green mb-6 font-serif">
              About AyurGlow Secrets
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Your trusted source for authentic Ayurvedic wisdom
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-sage-green/10 rounded-2xl shadow-md p-8 md:p-12 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-earth-green/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-earth-green" />
                </div>
                <h2 className="text-3xl font-bold text-earth-green font-serif">Our Mission</h2>
              </div>
              <p className="text-lg text-foreground leading-relaxed">
                AyurGlow Secrets is a wellness platform dedicated to sharing the healing power of Ayurveda
                for a healthier life, glowing skin, and stronger hair. Inspired by ancient Ayurvedic texts
                and traditional Indian home remedies, our goal is to help people adopt natural solutions
                over chemical-based treatments.
              </p>
            </div>

            <div className="bg-sage-green/10 rounded-2xl shadow-md p-8 md:p-12 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-earth-green/20 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-earth-green" />
                </div>
                <h2 className="text-3xl font-bold text-earth-green font-serif">Our Philosophy</h2>
              </div>
              <p className="text-lg text-foreground leading-relaxed">
                We believe true beauty and health begin from within. Through balanced nutrition, herbal
                remedies, and mindful living, Ayurveda offers sustainable healing without side effects.
                Our content is carefully researched and simplified to help you easily follow Ayurvedic
                practices in your daily life.
              </p>
            </div>

            <div className="bg-sage-green/10 rounded-2xl shadow-md p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-earth-green/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-earth-green" />
                </div>
                <h2 className="text-3xl font-bold text-earth-green font-serif">What We Offer</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-white shadow-sm">
                  <h3 className="text-xl font-semibold text-earth-green mb-3 font-serif">Natural Remedies</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Time-tested Ayurvedic solutions for common health concerns, all using natural ingredients.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-white shadow-sm">
                  <h3 className="text-xl font-semibold text-earth-green mb-3 font-serif">Expert Guidance</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Carefully researched content based on ancient texts and traditional practices.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-white shadow-sm">
                  <h3 className="text-xl font-semibold text-earth-green mb-3 font-serif">Holistic Approach</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Complete wellness solutions addressing body, mind, and spirit in harmony.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-white shadow-sm">
                  <h3 className="text-xl font-semibold text-earth-green mb-3 font-serif">Easy to Follow</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Simple, practical advice that fits seamlessly into your modern lifestyle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-earth-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
            Start Your Wellness Journey
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore our comprehensive guides and discover natural solutions for your health concerns
          </p>
          <a
            href="/blog"
            className="inline-block px-8 py-3 bg-white text-earth-green rounded-full font-semibold hover:bg-white/90 transition-colors shadow-lg"
          >
            Read Our Articles
          </a>
        </div>
      </section>
    </div>
  );
}
