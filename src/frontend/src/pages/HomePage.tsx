import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FeaturedPost from '@/components/FeaturedPost';
import PostCard from '@/components/PostCard';
import { useGetPublishedPosts } from '@/hooks/useQueries';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { data: posts = [], isLoading } = useGetPublishedPosts();

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section 
        className="relative h-[400px] md:h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/hero-natural-health.dim_1920x600.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-earth-green/90 via-earth-green/70 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 text-cream max-w-2xl">
          <img 
            src="/assets/generated/ayur-leaf.dim_64x64.png" 
            alt="Ayurvedic Leaf" 
            className="w-16 h-16 mb-6"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif leading-tight">
            Natural Health & Wellness Tips
          </h1>
          <p className="text-lg md:text-xl text-cream/90 leading-relaxed">
            Discover ancient Ayurvedic wisdom for modern living. Natural remedies for health, beauty, and wellness.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-earth-green" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-warm-brown/70 text-lg mb-6">No blog posts available yet.</p>
              <Button 
                onClick={() => navigate({ to: '/admin/create-post' })}
                className="bg-earth-green hover:bg-earth-green/90"
              >
                Create Your First Post
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-12">
                  <FeaturedPost post={featuredPost} />
                </div>
              )}

              {/* Recent Posts Grid */}
              {recentPosts.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-earth-green mb-8 font-serif">Latest Articles</h2>
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
                    className="border-earth-green text-earth-green hover:bg-earth-green hover:text-cream"
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
      <section className="py-16 bg-sage-green/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-green mb-4 font-serif">
              Explore Our Remedies
            </h2>
            <p className="text-warm-brown/70 text-lg max-w-2xl mx-auto">
              Natural solutions for your health and wellness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card 
              className="border-sage-green/30 hover:border-earth-green hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => navigate({ to: '/health-remedies' })}
            >
              <CardContent className="p-6 text-center">
                <img 
                  src="/assets/generated/icon-immunity.dim_128x128.png" 
                  alt="Health Remedies"
                  className="w-20 h-20 mx-auto mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-xl font-semibold text-earth-green mb-2 font-serif">
                  Health Remedies
                </h3>
                <p className="text-warm-brown/70 text-sm">
                  Boost immunity, improve digestion, and enhance overall wellness
                </p>
              </CardContent>
            </Card>

            <Card 
              className="border-sage-green/30 hover:border-earth-green hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => navigate({ to: '/skin-care' })}
            >
              <CardContent className="p-6 text-center">
                <img 
                  src="/assets/generated/icon-skin.dim_128x128.png" 
                  alt="Skin Care"
                  className="w-20 h-20 mx-auto mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-xl font-semibold text-earth-green mb-2 font-serif">
                  Skin Care
                </h3>
                <p className="text-warm-brown/70 text-sm">
                  Achieve radiant, healthy skin through natural treatments
                </p>
              </CardContent>
            </Card>

            <Card 
              className="border-sage-green/30 hover:border-earth-green hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => navigate({ to: '/hair-care' })}
            >
              <CardContent className="p-6 text-center">
                <img 
                  src="/assets/generated/icon-hair.dim_128x128.png" 
                  alt="Hair Care"
                  className="w-20 h-20 mx-auto mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-xl font-semibold text-earth-green mb-2 font-serif">
                  Hair Care
                </h3>
                <p className="text-warm-brown/70 text-sm">
                  Strengthen your hair naturally with Ayurvedic solutions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
