import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetPublishedPosts } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, User, Loader2 } from 'lucide-react';

export default function BlogPostDetailPage() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const navigate = useNavigate();
  const { data: posts, isLoading } = useGetPublishedPosts();

  const post = posts?.find((p) => p.slug === slug);

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-earth-green mx-auto mb-4" />
          <p className="text-warm-brown">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full min-h-screen bg-cream flex items-center justify-center">
        <Card className="max-w-md border-2 border-sage-green/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-serif text-earth-green mb-4">
              Post Not Found
            </h2>
            <p className="text-warm-brown mb-6">
              The blog post you're looking for doesn't exist or hasn't been published yet.
            </p>
            <Button
              onClick={() => navigate({ to: '/blog' })}
              className="bg-earth-green hover:bg-earth-green/90 text-cream"
            >
              Back to Blog
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full bg-cream">
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-sage-green/20 to-cream">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/blog' })}
            className="mb-6 text-earth-green hover:text-warm-brown"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>

          <Badge className={`mb-4 ${getCategoryColor(post.category)}`}>
            {post.category}
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-6 font-serif leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-warm-brown/70">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{formatDate(post.publishedDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{Number(post.readTime)} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-2 border-sage-green/30 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-warm-brown/80 leading-relaxed mb-8 font-medium">
                  {post.excerpt}
                </p>
                <div
                  className="text-warm-brown leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  style={{
                    fontSize: '1.125rem',
                    lineHeight: '1.75',
                  }}
                />
              </div>

              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-sage-green/30">
                  <h3 className="text-sm font-semibold text-warm-brown/60 mb-3">
                    TAGS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-sage-green/30 text-earth-green"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-earth-green text-cream">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <img
            src="/assets/generated/ayur-leaf.dim_64x64.png"
            alt="Leaf"
            className="w-12 h-12 mx-auto mb-6 opacity-80"
          />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            Explore More Articles
          </h2>
          <p className="text-lg text-cream/90 mb-8">
            Discover more Ayurvedic wisdom and natural remedies
          </p>
          <Button
            onClick={() => navigate({ to: '/blog' })}
            className="bg-gold text-earth-green hover:bg-gold/90 font-semibold"
          >
            View All Posts
          </Button>
        </div>
      </section>
    </div>
  );
}
