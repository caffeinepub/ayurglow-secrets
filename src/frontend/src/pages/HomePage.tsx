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
        <div className="absolute inset-0 bg-gradient-to-br from-earth-green/95 via-forest-green/85 to-sage-green/75" />
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <img 
            src="/assets/website-logo.png" 
            alt="AyurGlow Secrets" 
            className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white font-serif leading-tight">
            Welcome to AyurGlow Secrets
          </h1>
          <p className="text-lg md:text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-4">
            Discover time-tested Ayurvedic remedies for overall health, radiant skin, and strong, healthy hair. 
            We bring you natural, chemical-free solutions rooted in ancient Indian wisdom and backed by modern understanding.
          </p>
          <p className="text-base md:text-lg text-white/90 italic">
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
                <Heart className="w-6 h-6 text-earth-green" />
              </div>
              <h3 className="text-lg font-semibold text-earth-green mb-2 font-serif">
                Simple Home Remedies
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Easy-to-follow treatments using everyday ingredients
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mb-4 rounded-full bg-earth-green/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-earth-green" />
              </div>
              <h3 className="text-lg font-semibold text-earth-green mb-2 font-serif">
                Safe, Affordable, and Effective
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Proven results without harmful side effects or high costs
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mb-4 rounded-full bg-earth-green/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-earth-green" />
              </div>
              <h3 className="text-lg font-semibold text-earth-green mb-2 font-serif">
                Suitable for All Age Groups
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Gentle, natural solutions for the whole family
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-earth-green" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-foreground/70 text-lg mb-4">No blog posts available yet.</p>
              <p className="text-sm text-muted-foreground mb-6">
                Create your first blog post to get started.
              </p>
              <Button 
                onClick={() => navigate({ to: '/admin/create-post' })}
                className="bg-earth-green hover:bg-earth-green/90 text-white"
              >
                Create Your First Post
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-earth-green mb-6 font-serif">Featured Article</h2>
                  <FeaturedPost post={featuredPost} />
                </div>
              )}

              {/* Recent Posts Grid */}
              {recentPosts.length > 0 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-earth-green mb-8 font-serif">Latest Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              )}

              {/* View All Button */}
              {posts.length > 7 && (
                <div className="text-center mt-12">
                  <Button 
                    onClick={() => navigate({ to: '/blog' })}
                    variant="outline"
                    className="border-earth-green text-earth-green hover:bg-earth-green hover:text-white"
                  >
                    View All Posts
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-sage-green/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-green mb-4 font-serif">
              Explore Our Remedies
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Natural solutions for your health and wellness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card 
              className="border-sage-green/30 hover:border-earth-green hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => navigate({ to: '/health-remedies' })}
            >
              <CardContent className="p-6 text-center">
                <img 
                  src="/assets/generated/icon-immunity.dim_128x128.png" 
                  alt="Health Remedies"
                  className="w-24 h-24 mx-auto mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-xl md:text-2xl font-semibold text-earth-green mb-3 font-serif">
                  Health Remedies
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Boost immunity, improve digestion, and enhance overall wellness
                </p>
              </CardContent>
            </Card>

            <Card 
              className="border-sage-green/30 hover:border-earth-green hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => navigate({ to: '/skin-care' })}
            >
              <CardContent className="p-6 text-center">
                <img 
                  src="/assets/generated/icon-skin.dim_128x128.png" 
                  alt="Skin Care"
                  className="w-24 h-24 mx-auto mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-xl md:text-2xl font-semibold text-earth-green mb-3 font-serif">
                  Skin Care
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Achieve radiant, healthy skin through natural treatments
                </p>
              </CardContent>
            </Card>

            <Card 
              className="border-sage-green/30 hover:border-earth-green hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => navigate({ to: '/hair-care' })}
            >
              <CardContent className="p-6 text-center">
                <img 
                  src="/assets/generated/icon-hair.dim_128x128.png" 
                  alt="Hair Care"
                  className="w-24 h-24 mx-auto mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-xl md:text-2xl font-semibold text-earth-green mb-3 font-serif">
                  Hair Care
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Nourish and strengthen your hair with natural remedies
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
