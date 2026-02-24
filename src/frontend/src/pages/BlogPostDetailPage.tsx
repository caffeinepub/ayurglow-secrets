import { useParams, Link } from '@tanstack/react-router';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BlogSidebar from '@/components/BlogSidebar';
import CommentSection from '@/components/CommentSection';
import { useGetPost, useGetPublishedPosts } from '@/hooks/useQueries';
import { Loader2 } from 'lucide-react';

export default function BlogPostDetailPage() {
  const { slug } = useParams({ from: '/blog/$slug' });
  const { data: posts = [] } = useGetPublishedPosts();
  const post = posts.find(p => p.slug === slug);
  const { isLoading } = useGetPost(post?.id || '');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-earth-green" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-earth-green mb-4">Post Not Found</h1>
        <p className="text-foreground/70 mb-6">The blog post you're looking for doesn't exist.</p>
        <Link to="/blog">
          <Button className="bg-earth-green hover:bg-earth-green/90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  const imageUrl = post.image?.getDirectURL() || '/assets/generated/blog-ayurveda-herbs.dim_1200x600.png';
  const publishDate = new Date(Number(post.publishedDate));
  const beginningImage = post.contentImages && post.contentImages.length > 0 ? post.contentImages[0] : null;

  return (
    <div className="w-full bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/blog">
            <Button variant="ghost" className="text-earth-green hover:text-earth-green/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            <div className="mb-6">
              <Badge className="mb-3 bg-sage-green/30 text-earth-green hover:bg-sage-green/40">
                {post.category}
              </Badge>
              
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-earth-green mb-4 font-serif leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/70 mb-6">
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
            </div>

            <div className="mb-8">
              <img 
                src={imageUrl} 
                alt={post.title}
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>

            {beginningImage && (
              <div className="mb-8">
                <img 
                  src={beginningImage.getDirectURL()} 
                  alt="Post beginning"
                  className="w-full h-auto rounded-xl shadow-md"
                />
              </div>
            )}

            <div 
              className="prose prose-lg max-w-none prose-headings:text-earth-green prose-headings:font-serif prose-p:text-foreground prose-p:leading-relaxed prose-a:text-earth-green prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-sage-green/20">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="border-sage-green/30 text-earth-green"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12">
              <CommentSection postId={post.id} />
            </div>
          </article>

          <aside className="lg:col-span-1">
            <BlogSidebar posts={posts} />
          </aside>
        </div>
      </div>
    </div>
  );
}
