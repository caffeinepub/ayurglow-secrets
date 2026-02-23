import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetPublishedPosts } from '@/hooks/useQueries';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BlogSidebar from '@/components/BlogSidebar';
import CommentSection from '@/components/CommentSection';
import { Loader2 } from 'lucide-react';

export default function BlogPostDetailPage() {
  const { slug } = useParams({ strict: false });
  const navigate = useNavigate();
  const { data: posts = [], isLoading } = useGetPublishedPosts();

  const post = posts.find((p) => p.slug === slug);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-earth-green" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-earth-green mb-4">Post Not Found</h1>
          <p className="text-warm-brown/70 mb-6">The blog post you're looking for doesn't exist.</p>
          <Button 
            onClick={() => navigate({ to: '/blog' })}
            className="bg-earth-green hover:bg-earth-green/90"
          >
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const imageUrl = post.image?.getDirectURL() || '/assets/generated/blog-ayurveda-herbs.dim_1200x600.png';
  const publishDate = new Date(Number(post.publishedDate));

  return (
    <div className="bg-background min-h-screen">
      {/* Featured Image */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <article className="flex-1">
            <div className="bg-background rounded-xl shadow-xl p-6 md:p-10 max-w-4xl">
              <Button
                variant="ghost"
                onClick={() => navigate({ to: '/blog' })}
                className="mb-6 text-warm-brown/70 hover:text-earth-green -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>

              <Badge className="mb-4 bg-sage-green/20 text-earth-green">
                {post.category}
              </Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-earth-green mb-4 font-serif leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-warm-brown/60 mb-8 pb-6 border-b border-sage-green/20">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{publishDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{Number(post.readTime)} min read</span>
                </div>
                <span>By {post.author}</span>
              </div>

              <div 
                className="prose prose-lg max-w-none
                  prose-headings:font-serif prose-headings:text-earth-green
                  prose-p:text-warm-brown/80 prose-p:leading-relaxed prose-p:text-lg
                  prose-a:text-earth-green prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-earth-green
                  prose-ul:text-warm-brown/80 prose-ol:text-warm-brown/80
                  prose-li:text-warm-brown/80 prose-li:leading-relaxed
                  prose-img:rounded-lg prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-sage-green/20">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline"
                        className="border-sage-green/30 text-warm-brown/70"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Comment Section */}
              <CommentSection postId={post.id} />
            </div>
          </article>

          {/* Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block lg:w-80">
            <div className="sticky top-24">
              <BlogSidebar posts={posts} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
