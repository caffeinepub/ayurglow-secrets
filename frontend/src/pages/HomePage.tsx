import { Link } from '@tanstack/react-router';
import { Leaf, Shield, BookOpen, Sparkles, ArrowRight, Heart, Star } from 'lucide-react';
import { useGetPublishedPosts } from '../hooks/useQueries';
import PostCard from '../components/PostCard';
import FeaturedPost from '../components/FeaturedPost';

export default function HomePage() {
  const { data: posts, isLoading } = useGetPublishedPosts();

  const featuredPost = posts && posts.length > 0 ? posts[0] : null;
  const recentPosts = posts && posts.length > 1 ? posts.slice(1, 4) : [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/generated/hero-natural-health.dim_1920x600.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/assets/generated/ayurglow-logo.dim_400x120.png"
              alt="AyurGlow Secrets Logo"
              className="w-48 md:w-64 lg:w-72 object-contain drop-shadow-lg"
            />
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md">
            Welcome to AyurGlow Secrets
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-4 max-w-2xl mx-auto drop-shadow">
            Discover the ancient wisdom of Ayurveda for modern wellness. Natural remedies, holistic health, and timeless beauty secrets.
          </p>
          <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl mx-auto drop-shadow">
            Your trusted guide to natural health, radiant skin, and lustrous hair through the power of Ayurvedic traditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-earth-green text-white px-8 py-3 rounded-full font-semibold hover:bg-forest-green transition-colors shadow-lg"
            >
              Explore Blog <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/health-remedies"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border border-white/40 px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors"
            >
              View Remedies <Leaf className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-cream/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              What We Offer
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive Ayurvedic knowledge for your complete wellness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-sage-green/20 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-earth-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/assets/generated/icon-immunity.dim_128x128.png" alt="Health" className="w-8 h-8 object-contain" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Health Remedies</h3>
              <p className="text-muted-foreground text-sm">Natural solutions for immunity, digestion, weight management, and more.</p>
              <Link to="/health-remedies" className="inline-flex items-center gap-1 text-earth-green text-sm font-medium mt-3 hover:gap-2 transition-all">
                Explore <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft border border-sage-green/20 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-earth-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/assets/generated/icon-skin.dim_128x128.png" alt="Skin Care" className="w-8 h-8 object-contain" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Skin Care</h3>
              <p className="text-muted-foreground text-sm">Ayurvedic beauty secrets for glowing, healthy, and youthful skin.</p>
              <Link to="/skin-care" className="inline-flex items-center gap-1 text-earth-green text-sm font-medium mt-3 hover:gap-2 transition-all">
                Explore <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft border border-sage-green/20 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-earth-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/assets/generated/icon-hair.dim_128x128.png" alt="Hair Care" className="w-8 h-8 object-contain" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Hair Care</h3>
              <p className="text-muted-foreground text-sm">Traditional hair treatments for growth, strength, and natural shine.</p>
              <Link to="/hair-care" className="inline-flex items-center gap-1 text-earth-green text-sm font-medium mt-3 hover:gap-2 transition-all">
                Explore <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft border border-sage-green/20 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-earth-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/assets/generated/icon-wellness.dim_128x128.png" alt="Blog" className="w-8 h-8 object-contain" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Wellness Blog</h3>
              <p className="text-muted-foreground text-sm">In-depth articles on Ayurvedic lifestyle, herbs, and holistic wellness.</p>
              <Link to="/blog" className="inline-flex items-center gap-1 text-earth-green text-sm font-medium mt-3 hover:gap-2 transition-all">
                Read Blog <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why AyurGlow Secrets Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why AyurGlow Secrets?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We bring you authentic Ayurvedic wisdom backed by tradition and modern understanding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-earth-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Leaf className="w-6 h-6 text-earth-green" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">100% Natural Ingredients</h3>
                <p className="text-muted-foreground">All our remedies use natural, plant-based ingredients that have been trusted for thousands of years in Ayurvedic practice.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-earth-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-earth-green" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Trusted Traditions</h3>
                <p className="text-muted-foreground">Our knowledge is rooted in authentic Ayurvedic texts and practices passed down through generations of healers and practitioners.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-earth-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-earth-green" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Expert Knowledge</h3>
                <p className="text-muted-foreground">Each remedy and article is carefully researched and presented with detailed instructions to ensure safe and effective application.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-earth-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-earth-green" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Holistic Approach</h3>
                <p className="text-muted-foreground">We address health from a whole-body perspective, combining physical, mental, and spiritual wellness for complete balance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 bg-cream/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                Latest from the Blog
              </h2>
              <p className="text-muted-foreground">Discover our latest Ayurvedic insights and wellness tips</p>
            </div>
            <Link
              to="/blog"
              className="hidden md:inline-flex items-center gap-2 text-earth-green font-medium hover:gap-3 transition-all"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-earth-green border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="space-y-8">
              {featuredPost && <FeaturedPost post={featuredPost} />}
              {recentPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-sage-green/20">
              <Leaf className="w-12 h-12 text-earth-green/40 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No blog posts yet. Check back soon!</p>
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-earth-green font-medium"
            >
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore by Category
            </h2>
            <p className="text-muted-foreground text-lg">
              Find the perfect Ayurvedic solution for your wellness needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/health-remedies" className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-md transition-shadow">
              <div className="h-56 bg-gradient-to-br from-earth-green to-forest-green flex items-center justify-center">
                <img src="/assets/generated/icon-immunity.dim_128x128.png" alt="Health Remedies" className="w-20 h-20 object-contain opacity-80 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-5 bg-white border border-sage-green/20 border-t-0 rounded-b-2xl">
                <h3 className="font-heading text-xl font-bold text-foreground mb-1">Health Remedies</h3>
                <p className="text-muted-foreground text-sm">Immunity, digestion, weight management & more</p>
                <span className="inline-flex items-center gap-1 text-earth-green text-sm font-medium mt-2 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            <Link to="/skin-care" className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-md transition-shadow">
              <div className="h-56 bg-gradient-to-br from-warm-brown to-gold flex items-center justify-center">
                <img src="/assets/generated/icon-skin.dim_128x128.png" alt="Skin Care" className="w-20 h-20 object-contain opacity-80 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-5 bg-white border border-sage-green/20 border-t-0 rounded-b-2xl">
                <h3 className="font-heading text-xl font-bold text-foreground mb-1">Skin Care</h3>
                <p className="text-muted-foreground text-sm">Natural glow, acne treatment, anti-aging & more</p>
                <span className="inline-flex items-center gap-1 text-earth-green text-sm font-medium mt-2 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            <Link to="/hair-care" className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-md transition-shadow">
              <div className="h-56 bg-gradient-to-br from-ocean-blue to-teal flex items-center justify-center">
                <img src="/assets/generated/icon-hair.dim_128x128.png" alt="Hair Care" className="w-20 h-20 object-contain opacity-80 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-5 bg-white border border-sage-green/20 border-t-0 rounded-b-2xl">
                <h3 className="font-heading text-xl font-bold text-foreground mb-1">Hair Care</h3>
                <p className="text-muted-foreground text-sm">Hair growth, dandruff control, oils & masks</p>
                <span className="inline-flex items-center gap-1 text-earth-green text-sm font-medium mt-2 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials / Trust Section */}
      <section className="py-16 bg-earth-green/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Wellness Seekers
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Join thousands who have discovered the power of Ayurvedic wisdom
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Heart, label: 'Natural Remedies', value: '100+' },
              { icon: Star, label: 'Happy Readers', value: '10K+' },
              { icon: BookOpen, label: 'Expert Articles', value: '50+' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white rounded-2xl p-6 shadow-soft border border-sage-green/20">
                <Icon className="w-8 h-8 text-earth-green mx-auto mb-3" />
                <div className="font-heading text-3xl font-bold text-foreground mb-1">{value}</div>
                <div className="text-muted-foreground text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
