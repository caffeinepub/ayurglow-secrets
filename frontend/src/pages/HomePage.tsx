import { Link } from '@tanstack/react-router';
import { ArrowRight, CheckCircle, Leaf, Star, Users, BookOpen } from 'lucide-react';
import { useGetPublishedPosts } from '../hooks/useQueries';
import PostCard from '../components/PostCard';

const offers = [
  { emoji: '🌿', title: 'Natural Ayurvedic Health Remedies', desc: 'Time-tested herbal solutions for immunity, digestion, and overall wellness.' },
  { emoji: '💆', title: 'Skin Care Tips for Natural Glow', desc: 'Achieve radiant, glowing skin with chemical-free Ayurvedic beauty secrets.' },
  { emoji: '💇', title: 'Hair Fall & Hair Growth Treatments', desc: 'Strengthen roots and stimulate growth with ancient hair care wisdom.' },
  { emoji: '🧘', title: 'Holistic Lifestyle & Wellness Advice', desc: 'Balance mind, body, and spirit through Ayurvedic daily routines.' },
];

const whyUs = [
  '100% natural & Ayurvedic approach',
  'Simple home remedies anyone can follow',
  'Safe, affordable, and effective solutions',
  'Suitable for all age groups',
];

const categories = [
  { name: 'Health Remedies', path: '/health-remedies', image: '/assets/generated/category-health.dim_400x250.png', emoji: '🌿', color: 'from-primary/80 to-primary/60' },
  { name: 'Skin Care', path: '/skin-care', image: '/assets/generated/category-skin.dim_400x250.png', emoji: '💆', color: 'from-secondary/80 to-secondary/60' },
  { name: 'Hair Care', path: '/hair-care', image: '/assets/generated/category-hair.dim_400x250.png', emoji: '💇', color: 'from-leaf/80 to-leaf/60' },
  { name: 'Weight Management', path: '/weight-management', image: '/assets/generated/category-weight.dim_400x250.png', emoji: '⚖️', color: 'from-calm/80 to-calm/60' },
  { name: 'Lifestyle & Wellness', path: '/lifestyle-wellness', image: '/assets/generated/category-lifestyle.dim_400x250.png', emoji: '🧘', color: 'from-forest/80 to-forest/60' },
];

const stats = [
  { icon: BookOpen, value: '100+', label: 'Ayurvedic Remedies' },
  { icon: Users, value: '50K+', label: 'Happy Readers' },
  { icon: Star, value: '5000+', label: 'Years of Wisdom' },
  { icon: Leaf, value: '100%', label: 'Natural Ingredients' },
];

export default function HomePage() {
  const { data: posts = [], isLoading } = useGetPublishedPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/assets/generated/hero-bg.dim_1920x1080.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 ayur-hero-gradient" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <img
              src="/assets/generated/ayurglow-logo.dim_400x120.png"
              alt="AyurGlow Secrets"
              className="h-16 md:h-20 w-auto brightness-0 invert"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/20">
            <Leaf className="w-4 h-4" />
            Ancient Wisdom, Modern Wellness
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Welcome to AyurGlow Secrets
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ancient Ayurvedic Wisdom for Healthy Body, Glowing Skin & Strong Hair. Discover time-tested natural remedies rooted in ancient Indian wisdom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/health-remedies"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
            >
              Explore Remedies <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-all"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-primary-foreground/80 mx-auto mb-2" />
                <div className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-primary-foreground/75 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="ayur-section-heading mb-3">What We Offer</h2>
            <div className="ayur-divider" />
            <p className="text-muted-foreground max-w-xl mx-auto mt-4">
              Comprehensive Ayurvedic guidance for every aspect of your health and beauty journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.title}
                className="bg-card rounded-2xl p-6 border border-border shadow-card ayur-card-hover text-center"
              >
                <div className="text-4xl mb-4">{offer.emoji}</div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{offer.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{offer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AyurGlow Secrets */}
      <section className="py-16 md:py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="ayur-section-heading mb-3">Why AyurGlow Secrets?</h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-6" />
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We believe true beauty and health begin from within. Through balanced nutrition, herbal remedies, and mindful living, Ayurveda offers sustainable healing without side effects.
              </p>
              <ul className="space-y-4">
                {whyUs.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground font-medium">{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-8 text-primary font-semibold hover:gap-3 transition-all"
              >
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/hero-natural-health.dim_1920x600.png"
                alt="Ayurvedic herbs and remedies"
                className="rounded-3xl shadow-card-hover w-full object-cover h-80"
                onError={(e) => {
                  e.currentTarget.src = '/assets/generated/hero-bg.dim_1920x1080.png';
                }}
              />
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-2xl p-4 shadow-herb">
                <div className="font-serif text-2xl font-bold">5000+</div>
                <div className="text-primary-foreground/80 text-xs">Years of Ayurvedic Wisdom</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="ayur-section-heading mb-3">Explore Categories</h2>
            <div className="ayur-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.path}
                to={cat.path}
                className="group relative overflow-hidden rounded-2xl shadow-card ayur-card-hover"
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent`} />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="text-2xl mb-1">{cat.emoji}</div>
                    <h3 className="font-serif font-semibold text-sm leading-tight">{cat.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {(latestPosts.length > 0 || isLoading) && (
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="ayur-section-heading mb-2">Latest Articles</h2>
                <div className="w-16 h-1 bg-primary rounded-full" />
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-sm"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border animate-pulse">
                    <div className="h-48 bg-muted" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-muted rounded w-1/3" />
                      <div className="h-5 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latestPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <h2 className="ayur-section-heading mb-3">About AyurGlow Secrets</h2>
          <div className="ayur-divider" />
          <p className="text-muted-foreground leading-relaxed mt-6 text-lg">
            AyurGlow Secrets is a wellness platform dedicated to sharing the healing power of Ayurveda for a healthier life, glowing skin, and stronger hair. Inspired by ancient Ayurvedic texts and traditional Indian home remedies, our goal is to help people adopt natural solutions over chemical-based treatments.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            We believe true beauty and health begin from within. Through balanced nutrition, herbal remedies, and mindful living, Ayurveda offers sustainable healing without side effects. Our content is carefully researched and simplified to help you easily follow Ayurvedic practices in your daily life.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 mt-8 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full hover:bg-primary/90 transition-all shadow-herb"
          >
            Read Our Story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
