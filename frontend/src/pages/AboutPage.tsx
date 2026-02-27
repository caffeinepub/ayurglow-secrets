import { Link } from '@tanstack/react-router';
import { Leaf, Heart, Shield, Star, ArrowRight } from 'lucide-react';

const values = [
  { icon: Leaf, title: 'Natural & Pure', desc: '100% natural ingredients sourced from Ayurvedic traditions, free from harmful chemicals.' },
  { icon: Heart, title: 'Holistic Healing', desc: 'We address root causes, not just symptoms, for lasting health and beauty.' },
  { icon: Shield, title: 'Safe & Trusted', desc: 'All remedies are time-tested and safe for all age groups when used as directed.' },
  { icon: Star, title: 'Ancient Wisdom', desc: 'Rooted in 5000+ years of Ayurvedic knowledge from ancient Indian texts.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-secondary py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <img
              src="/assets/generated/ayurglow-logo.dim_400x400.png"
              alt="AyurGlow Secrets"
              className="w-28 h-28 object-contain brightness-0 invert"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">About AyurGlow Secrets</h1>
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Dedicated to sharing the healing power of Ayurveda for a healthier life, glowing skin, and stronger hair.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <div className="w-12 h-1 bg-primary rounded-full mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                AyurGlow Secrets is a wellness platform dedicated to sharing the healing power of Ayurveda for a healthier life, glowing skin, and stronger hair. Inspired by ancient Ayurvedic texts and traditional Indian home remedies, our goal is to help people adopt natural solutions over chemical-based treatments.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe true beauty and health begin from within. Through balanced nutrition, herbal remedies, and mindful living, Ayurveda offers sustainable healing without side effects. Our content is carefully researched and simplified to help you easily follow Ayurvedic practices in your daily life.
              </p>
            </div>
            <div className="bg-accent/30 rounded-3xl p-8">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Our Philosophy</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ayurveda, the "Science of Life," is one of the world's oldest holistic healing systems. It was developed more than 3,000 years ago in India and is based on the belief that health and wellness depend on a delicate balance between the mind, body, and spirit.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At AyurGlow Secrets, we translate this ancient wisdom into practical, everyday remedies that anyone can follow at home using simple, affordable ingredients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">Our Core Values</h2>
            <div className="w-12 h-1 bg-primary rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div key={val.title} className="bg-card rounded-2xl p-6 border border-border shadow-card text-center ayur-card-hover">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                  <val.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{val.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-3">What We Offer</h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[
              { emoji: '🌿', title: 'Health Remedies', desc: 'Natural solutions for immunity, digestion, weight management, diabetes support, and stress relief.' },
              { emoji: '💆', title: 'Skin Care', desc: 'Ayurvedic beauty secrets for glowing skin, acne treatment, anti-aging, and DIY face packs.' },
              { emoji: '💇', title: 'Hair Care', desc: 'Proven remedies for hair fall, hair growth, dandruff, grey hair, and nourishing oil treatments.' },
              { emoji: '🧘', title: 'Lifestyle & Wellness', desc: 'Daily Ayurvedic routines, yoga, meditation, and morning rituals for holistic well-being.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 bg-accent/20 rounded-2xl border border-border">
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <h3 className="font-serif font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/health-remedies"
            className="inline-flex items-center gap-2 mt-10 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full hover:bg-primary/90 transition-all shadow-herb"
          >
            Explore Remedies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
