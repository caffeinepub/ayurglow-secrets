import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FeaturedPost from '@/components/FeaturedPost';
import PostCard from '@/components/PostCard';
import { useGetPublishedPosts } from '@/hooks/useQueries';
import { Loader2, Leaf, Sparkles, Heart, Users } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { data: posts = [], isLoading } = useGetPublishedPosts();

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/hero-natural-health.dim_1920x600.png)' }}
      >
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <img 
            src="/assets/generated/ayurglow-logo.dim_400x120.png" 
            alt="AyurGlow Secrets" 
            className="w-64 md:w-80 h-auto mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black font-serif leading-tight">
            Welcome to AyurGlow Secrets
          </h1>
          <p className="text-lg md:text-xl text-black leading-relaxed max-w-3xl mx-auto mb-4">
            Discover time-tested Ayurvedic remedies for overall health, radiant skin, and strong, healthy hair. 
            We bring you natural, chemical-free solutions rooted in ancient Indian wisdom and backed by modern understanding.
          </p>
          <p className="text-base md:text-lg text-black italic font-medium">
            Ancient Ayurvedic Wisdom for Healthy Body, Glowing Skin & Strong Hair
          </p>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-green mb-4 font-serif">
              What We Offer
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Comprehensive natural wellness solutions for your entire family
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="border-sage-green/30 hover:border-earth-green hover:shadow-lg transition-all duration-300 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage-green/20 flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-earth-green" />
                </div>
                <h3 className="text-xl font-semibold text-earth-green mb-3 font-serif">
                  🌿 Natural Ayurvedic Health Remedies
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Boost immunity, improve digestion, and enhance overall wellness naturally
                </p>
              </CardContent>
            </Card>

            <Card className="border-sage-green/30 hover:border-earth-green hover:shadow-lg transition-all duration-300 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage-green/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-earth-green" />
                </div>
                <h3 className="text-xl font-semibold text-earth-green mb-3 font-serif">
                  💆 Skin Care Tips for Natural Glow
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Achieve radiant, healthy skin through time-tested natural treatments
                </p>
              </CardContent>
            </Card>

            <Card className="border-sage-green/30 hover:border-earth-green hover:shadow-lg transition-all duration-300 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage-green/20 flex items-center justify-center">
                  <img 
                    src="/assets/generated/icon-hair.dim_128x128.png" 
                    alt="Hair Care"
                    className="w-10 h-10"
                  />
                </div>
                <h3 className="text-xl font-semibold text-earth-green mb-3 font-serif">
                  💇 Hair Fall & Hair Growth Treatments
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Nourish and strengthen your hair with powerful natural remedies
                </p>
              </CardContent>
            </Card>

            <Card className="border-sage-green/30 hover:border-earth-green hover:shadow-lg transition-all duration-300 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage-green/20 flex items-center justify-center">
                  <img 
                    src="/assets/generated/icon-wellness.dim_128x128.png" 
                    alt="Wellness"
                    className="w-10 h-10"
                  />
                </div>
                <h3 className="text-xl font-semibold text-earth-green mb-3 font-serif">
                  🧘 Holistic Lifestyle & Wellness Advice
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Complete mind-body wellness through ancient Ayurvedic practices
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why AyurGlow Secrets Section */}
      <section className="py-16 bg-sage-green/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-green mb-4 font-serif">
              Why AyurGlow Secrets?
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Your trusted partner in natural wellness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mb-4 rounded-full bg-earth-green/10 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-earth-green" />
              </div>
              <h3 className="text-lg font-semibold text-earth-green mb-2 font-serif">
                100% Natural & Ayurvedic Approach
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Pure, chemical-free remedies based on ancient wisdom
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mb-4 rounded-full bg-earth-green/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-earth-green" />
              </div>
              <h3 className="text-lg font-semibold text-earth-green mb-2 font-serif">
                Proven & Time-Tested Solutions
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Remedies used for centuries, validated by modern science
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mb-4 rounded-full bg-earth-green/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-earth-green" />
              </div>
              <h3 className="text-lg font-semibold text-earth-green mb-2 font-serif">
                Holistic Wellness Focus
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Treating root causes, not just symptoms
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mb-4 rounded-full bg-earth-green/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-earth-green" />
              </div>
              <h3 className="text-lg font-semibold text-earth-green mb-2 font-serif">
                For the Whole Family
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Safe, gentle solutions suitable for all ages
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-green mb-4 font-serif">
              Latest from Our Blog
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Discover insights, tips, and stories about natural wellness
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-earth-green" />
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-12">
              {featuredPost && (
                <div className="max-w-5xl mx-auto">
                  <FeaturedPost post={featuredPost} />
                </div>
              )}

              {recentPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {recentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              <div className="text-center">
                <Button
                  onClick={() => navigate({ to: '/blog' })}
                  size="lg"
                  className="bg-earth-green hover:bg-forest-green text-white"
                >
                  View All Posts
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/60 text-lg mb-6">
                No blog posts available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-sage-green/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-green mb-4 font-serif">
              Explore Our Categories
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Find the perfect remedy for your wellness needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card 
              className="border-sage-green/30 hover:border-earth-green hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => navigate({ to: '/health-remedies' })}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/assets/generated/icon-immunity.dim_128x128.png" 
                  alt="Health Remedies"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-green/90 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white font-serif">
                  Health Remedies
                </h3>
              </div>
              <CardContent className="p-6">
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Natural solutions for immunity, digestion, weight management, and overall wellness
                </p>
              </CardContent>
            </Card>

            <Card 
              className="border-sage-green/30 hover:border-earth-green hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => navigate({ to: '/skin-care' })}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/assets/generated/icon-skin.dim_128x128.png" 
                  alt="Skin Care"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-green/90 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white font-serif">
                  Skin Care
                </h3>
              </div>
              <CardContent className="p-6">
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Achieve radiant, glowing skin with natural face packs, treatments, and remedies
                </p>
              </CardContent>
            </Card>

            <Card 
              className="border-sage-green/30 hover:border-earth-green hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => navigate({ to: '/hair-care' })}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/assets/generated/icon-hair.dim_128x128.png" 
                  alt="Hair Care"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-green/90 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white font-serif">
                  Hair Care
                </h3>
              </div>
              <CardContent className="p-6">
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Strengthen hair, prevent hair fall, and promote growth with Ayurvedic treatments
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
