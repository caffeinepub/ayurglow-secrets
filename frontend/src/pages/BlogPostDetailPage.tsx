import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { useGetPublishedPosts } from '../hooks/useQueries';
import CommentSection from '../components/CommentSection';

function getImageSizeStyle(imageSize: string | null | undefined): React.CSSProperties {
  if (!imageSize || imageSize === 'full') return { width: '100%' };
  if (imageSize === 'small') return { width: '25%', maxWidth: '100%' };
  if (imageSize === 'medium') return { width: '50%', maxWidth: '100%' };
  if (imageSize === 'large') return { width: '75%', maxWidth: '100%' };
  if (imageSize.startsWith('custom:')) {
    const dims = imageSize.replace('custom:', '');
    const [w, h] = dims.split('x');
    const style: React.CSSProperties = { maxWidth: '100%' };
    if (w && w !== 'auto') style.width = w;
    if (h && h !== 'auto') style.height = h;
    return style;
  }
  return { width: '100%' };
}

export default function BlogPostDetailPage() {
  const { slug } = useParams({ from: '/blog/$slug' });
  const { data: posts, isLoading, isError } = useGetPublishedPosts();

  const post = posts?.find((p) => p.slug === slug);

  const formattedDate = post
    ? new Date(Number(post.publishedDate) / 1_000_000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-earth-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-lg mb-4">Failed to load post.</p>
          <Link to="/blog" className="text-earth-green hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="text-earth-green hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const featuredImageUrl = post.image ? post.image.getDirectURL() : null;
  const beginningImageUrl = post.contentImages && post.contentImages.length > 0
    ? post.contentImages[0].getDirectURL()
    : null;

  const imageSizeStyle = getImageSizeStyle(post.imageSize);
  const isFullWidth = !post.imageSize || post.imageSize === 'full';

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="bg-cream/50 border-b border-sage-green/20">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-earth-green hover:text-forest-green transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="bg-earth-green/10 text-earth-green text-sm font-medium px-3 py-1 rounded-full border border-earth-green/20">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-sage-green/20">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-earth-green" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-earth-green" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-earth-green" />
            {Number(post.readTime)} min read
          </span>
        </div>

        {/* Featured Image */}
        {featuredImageUrl && (
          <div className="mb-8">
            <div
              className={isFullWidth ? 'rounded-2xl overflow-hidden shadow-md' : 'rounded-2xl overflow-hidden shadow-md inline-block'}
              style={isFullWidth ? undefined : imageSizeStyle}
            >
              <img
                src={featuredImageUrl}
                alt={post.title}
                style={isFullWidth ? { width: '100%' } : { width: '100%', height: 'auto' }}
                className={isFullWidth ? 'h-64 md:h-96 object-cover' : 'object-cover'}
              />
            </div>
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-muted-foreground italic border-l-4 border-earth-green pl-4 mb-8">
            {post.excerpt}
          </p>
        )}

        {/* Beginning Image */}
        {beginningImageUrl && (
          <div className="mb-8">
            <div
              className={isFullWidth ? 'rounded-xl overflow-hidden shadow-sm' : 'rounded-xl overflow-hidden shadow-sm inline-block'}
              style={isFullWidth ? undefined : imageSizeStyle}
            >
              <img
                src={beginningImageUrl}
                alt="Article illustration"
                style={isFullWidth ? { width: '100%' } : { width: '100%', height: 'auto' }}
                className={isFullWidth ? 'w-full object-cover max-h-80' : 'object-cover'}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-earth-green prose-strong:text-foreground prose-li:text-foreground/90"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-sage-green/20">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-earth-green" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-sage-green/20 text-forest-green text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Comment Section */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}
