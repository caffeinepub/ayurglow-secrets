import { Link } from '@tanstack/react-router';
import { ArrowRight, Leaf, Shield, Heart, Star, Users, BookOpen } from 'lucide-react';
import { useGetPublishedPosts } from '../hooks/useQueries';
import PostCard from '../components/PostCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const categories = [
  {
    title: 'Health Remedies',
    description: 'Natural solutions for immunity, digestion, weight management, and more.',
    image: '/assets/generated/category-health.dim_400x250.png',
    path: '/health-remedies',
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    title: 'Skin Care',
    description: 'Ayurvedic beauty secrets for glowing, healthy skin naturally.',
    image: '/assets/generated/category-skin.dim_400x250.png',
    path: '/skin-care',
    color: 'from-rose-500/20 to-pink-500/20',
  },
  {
    title: 'Hair Care',
    description: 'Ancient wisdom for strong, lustrous, and healthy hair.',
    image: '/assets/generated/category-hair.dim_400x250.png',
    path: '/hair-care',
    color: 'from-amber-500/20 to-orange-500/20',
  },
];

const benefits = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'All remedies use pure, natural ingredients sourced from nature.',
  },
  {
    icon: Shield,
    title: 'Time-Tested',
    description: 'Ancient Ayurvedic wisdom passed down through thousands of years.',
  },
  {
    icon: Heart,
    title: 'Holistic Approach',
    description: 'Treating the whole person — mind, body, and spirit.',
  },
  {
    icon: Star,
    title: 'Expert Curated',
    description: 'Carefully researched and verified by Ayurvedic practitioners.',
  },
];

const stats = [
  { icon: Users, value: '10,000+', label: 'Happy Readers' },
  { icon: BookOpen, value: '500+', label: 'Remedies Shared' },
  { icon: Leaf, value: '50+', label: 'Natural Ingredients' },
  { icon: Star, value: '4.9/5', label: 'Average Rating' },
];

export default function HomePage() {
  const { data: posts = [], isLoading } = useGetPublishedPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/generated/hero-natural-health.dim_1920x600.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/40 to-forest/70" />

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <img
              src="/assets/generated/ayurglow-logo.dim_400x120.png"
              alt="AyurGlow Secrets"
              className="h-16 sm:h-20 lg:h-24 w-auto mx-auto mb-4 drop-shadow-lg"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-cream mb-6 leading-tight drop-shadow-md">
            Ancient Wisdom for
            <span className="text-gold block">Modern Wellness</span>
          </h1>
          <p className="text-lg sm:text-xl text-cream/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover the transformative power of Ayurveda. Natural remedies, holistic health tips,
            and time-tested secrets for radiant skin, lustrous hair, and vibrant health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold/90 text-forest font-semibold px-8"
            >
              <Link to="/blog">Explore Blog</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-cream text-cream hover:bg-cream/10 px-8"
            >
              <Link to="/health-remedies">View Remedies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-8 w-8 text-primary-foreground/70 mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive collection of Ayurvedic knowledge across key wellness categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.path}
                to={cat.path}
                className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{cat.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Explore
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">
              Why AyurGlow Secrets?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We bring you the best of Ayurvedic wisdom, carefully curated for modern lifestyles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="bg-primary/10 rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-2">
                Latest Articles
              </h2>
              <p className="text-muted-foreground">
                Fresh insights from our Ayurvedic wellness experts.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link to="/blog">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-xl border border-border">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                We're preparing amazing Ayurvedic content for you. Check back soon!
              </p>
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Button asChild variant="outline">
              <Link to="/blog">
                View All Articles
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
