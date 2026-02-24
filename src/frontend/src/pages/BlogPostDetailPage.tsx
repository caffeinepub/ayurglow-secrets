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
          <Loader2 className="w-8 h-8 animate-spin text-ocean-blue" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-ocean-blue mb-4">Post Not Found</h1>
          <p className="text-foreground/70 mb-6">The blog post you're looking for doesn't exist.</p>
          <Button 
            onClick={() => navigate({ to: '/blog' })}
            className="bg-ocean-blue hover:bg-ocean-blue/90"
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
      <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden">
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
                className="mb-6 text-foreground/70 hover:text-ocean-blue -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>

              <Badge className="mb-4 bg-mint-green/30 text-forest-green">
                {post.category}
              </Badge>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ocean-blue mb-4 font-serif leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mb-8 pb-6 border-b border-sky-blue/20">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{publishDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{Number(post.readTime)} min read</span>
                </div>
                <span>By {post.author}</span>
              </div>

              <div 
                className="prose prose-base max-w-none
                  prose-headings:font-serif prose-headings:text-ocean-blue prose-headings:mb-4 prose-headings:mt-6
                  prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
                  prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:text-base prose-p:mb-4
                  prose-a:text-ocean-blue prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-ocean-blue prose-strong:font-semibold
                  prose-ul:text-foreground/80 prose-ul:my-4 prose-ul:space-y-2
                  prose-ol:text-foreground/80 prose-ol:my-4 prose-ol:space-y-2
                  prose-li:text-foreground/80 prose-li:leading-relaxed prose-li:text-base
                  prose-img:rounded-lg prose-img:shadow-md prose-img:my-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-sky-blue/20">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline"
                        className="border-sky-blue/30 text-foreground/70 text-sm"
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
