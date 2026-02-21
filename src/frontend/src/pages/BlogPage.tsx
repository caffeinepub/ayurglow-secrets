import { useNavigate } from '@tanstack/react-router';
import { useGetPublishedPosts } from '../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react';

export default function BlogPage() {
  const navigate = useNavigate();
  const { data: posts, isLoading } = useGetPublishedPosts();

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Hair Care': 'bg-amber-500/10 text-amber-700',
      'Skin Care': 'bg-rose-500/10 text-rose-700',
      'Health': 'bg-green-500/10 text-green-700',
      'Beauty': 'bg-purple-500/10 text-purple-700',
      'Lifestyle': 'bg-blue-500/10 text-blue-700',
    };
    return colors[category] || 'bg-gray-500/10 text-gray-700';
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-sage-green/20 to-cream">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <img 
              src="/assets/generated/icon-wellness.dim_128x128.png" 
              alt="Blog" 
              className="w-24 h-24 mx-auto mb-6"
            />
            <h1 className="text-5xl md:text-6xl font-bold text-earth-green mb-6 font-serif">
              Our Blog
            </h1>
            <p className="text-xl text-warm-brown/80 leading-relaxed">
              Expert insights and practical guides on Ayurvedic wellness
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-earth-green mx-auto mb-4" />
              <p className="text-warm-brown">Loading posts...</p>
            </div>
          ) : !posts || posts.length === 0 ? (
            <div className="text-center py-12 max-w-2xl mx-auto">
              <img
                src="/assets/generated/icon-wellness.dim_128x128.png"
                alt="No posts"
                className="w-24 h-24 mx-auto mb-6 opacity-50"
              />
              <h2 className="text-3xl font-serif text-earth-green mb-4">
                No Posts Yet
              </h2>
              <p className="text-warm-brown/70">
                Check back soon for Ayurvedic wisdom and wellness tips
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {posts.map((post) => (
                <Card 
                  key={post.id}
                  onClick={() => navigate({ to: `/blog/${post.slug}` })}
                  className="border-2 border-sage-green/30 hover:border-earth-green hover:shadow-xl transition-all duration-300 bg-white group cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-earth-green mb-3 font-serif group-hover:text-warm-brown transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-warm-brown/70 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-warm-brown/60 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(post.publishedDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{Number(post.readTime)} min read</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-earth-green font-medium text-sm group-hover:gap-3 transition-all">
                      <span>Read Article</span>
                      <ArrowRight size={16} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-earth-green text-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <img 
              src="/assets/generated/ayur-leaf.dim_64x64.png" 
              alt="Leaf" 
              className="w-12 h-12 mx-auto mb-6 opacity-80"
            />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Stay Updated
            </h2>
            <p className="text-lg text-cream/90 mb-8">
              Get the latest Ayurvedic tips and remedies delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-earth-green focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button className="px-8 py-3 bg-gold text-earth-green rounded-full font-semibold hover:bg-gold/90 transition-colors shadow-lg whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
