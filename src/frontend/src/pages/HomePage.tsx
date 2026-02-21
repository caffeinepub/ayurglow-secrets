import { Leaf, Sparkles, Heart, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  const services = [
    {
      emoji: '🌿',
      icon: '/assets/generated/icon-immunity.dim_128x128.png',
      title: 'Natural Ayurvedic Health Remedies',
      description: 'Boost immunity, improve digestion, and enhance overall wellness with time-tested remedies.',
    },
    {
      emoji: '💆',
      icon: '/assets/generated/icon-skin.dim_128x128.png',
      title: 'Skin Care Tips for Natural Glow',
      description: 'Achieve radiant, healthy skin through natural Ayurvedic treatments and herbal solutions.',
    },
    {
      emoji: '💇',
      icon: '/assets/generated/icon-hair.dim_128x128.png',
      title: 'Hair Fall & Hair Growth Treatments',
      description: 'Strengthen your hair naturally with Ayurvedic oils, masks, and proven remedies.',
    },
    {
      emoji: '🧘',
      icon: '/assets/generated/icon-wellness.dim_128x128.png',
      title: 'Holistic Lifestyle & Wellness Advice',
      description: 'Embrace mindful living with Ayurvedic practices for balanced body, mind, and spirit.',
    },
  ];

  const benefits = [
    {
      icon: Leaf,
      title: '100% Natural & Ayurvedic Approach',
      description: 'Pure, chemical-free solutions rooted in ancient wisdom',
    },
    {
      icon: Sparkles,
      title: 'Simple Home Remedies',
      description: 'Easy-to-follow practices you can do at home',
    },
    {
      icon: Heart,
      title: 'Safe, Affordable, and Effective',
      description: 'Proven remedies without harmful side effects',
    },
    {
      icon: Users,
      title: 'Suitable for All Age Groups',
      description: 'Natural healing for everyone in the family',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/hero-background.dim_1920x1080.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-earth-green/80 via-earth-green/70 to-sage-green/60" />
        <div className="relative z-10 container mx-auto px-4 text-center text-cream">
          <img 
            src="/assets/generated/ayur-leaf.dim_64x64.png" 
            alt="Ayurvedic Leaf" 
            className="w-16 h-16 mx-auto mb-6 animate-pulse"
          />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif leading-tight">
            Welcome to AyurGlow Secrets
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cream/90 max-w-3xl mx-auto font-light">
            Ancient Ayurvedic Wisdom for Healthy Body, Glowing Skin & Strong Hair
          </p>
          <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-cream/80">
            Discover time-tested Ayurvedic remedies for overall health, radiant skin, and strong, healthy hair. 
            We bring you natural, chemical-free solutions rooted in ancient Indian wisdom and backed by modern understanding.
          </p>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <img 
              src="/assets/generated/ayur-leaf.dim_64x64.png" 
              alt="Divider" 
              className="w-12 h-12 mx-auto mb-4 opacity-60"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">What We Offer</h2>
            <p className="text-warm-brown/70 text-lg max-w-2xl mx-auto">
              Comprehensive Ayurvedic solutions for your wellness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="border-2 border-sage-green/30 hover:border-earth-green hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 relative">
                    <img 
                      src={service.icon} 
                      alt={service.title}
                      className="w-24 h-24 mx-auto group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="absolute top-0 right-1/4 text-4xl">{service.emoji}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-earth-green mb-3 font-serif">
                    {service.title}
                  </h3>
                  <p className="text-warm-brown/70 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why AyurGlow Secrets Section */}
      <section className="py-20 bg-sage-green/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <img 
              src="/assets/generated/ayur-leaf.dim_64x64.png" 
              alt="Divider" 
              className="w-12 h-12 mx-auto mb-4 opacity-60"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Why AyurGlow Secrets?
            </h2>
            <p className="text-warm-brown/70 text-lg max-w-2xl mx-auto">
              Your trusted partner in natural wellness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-earth-green/10 flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-earth-green" />
                </div>
                <h3 className="text-lg font-semibold text-earth-green mb-2 font-serif">
                  {benefit.title}
                </h3>
                <p className="text-warm-brown/70 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-earth-green text-cream">
        <div className="container mx-auto px-4 text-center">
          <img 
            src="/assets/generated/ayur-leaf.dim_64x64.png" 
            alt="Divider" 
            className="w-12 h-12 mx-auto mb-6 opacity-80"
          />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
            Begin Your Ayurvedic Journey Today
          </h2>
          <p className="text-xl text-cream/90 mb-8 max-w-2xl mx-auto">
            Explore our comprehensive guides and discover the natural path to wellness
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="/health-remedies" 
              className="px-8 py-3 bg-gold text-earth-green rounded-full font-semibold hover:bg-gold/90 transition-colors shadow-lg"
            >
              Explore Health Remedies
            </a>
            <a 
              href="/blog" 
              className="px-8 py-3 bg-cream/10 text-cream border-2 border-cream rounded-full font-semibold hover:bg-cream/20 transition-colors"
            >
              Read Our Blog
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
