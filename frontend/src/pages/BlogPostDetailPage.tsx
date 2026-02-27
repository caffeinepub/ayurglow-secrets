import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Clock, User, Calendar, Tag, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGetPostBySlug } from '../hooks/useQueries';
import CommentSection from '../components/CommentSection';
import { useMemo } from 'react';
import { ImageSize } from '../backend';

function getInlineImageSizeClass(size: ImageSize): string {
  switch (size) {
    case ImageSize.small: return 'max-w-xs';
    case ImageSize.medium: return 'max-w-md';
    case ImageSize.large: return 'max-w-lg';
    default: return 'max-w-full';
  }
}

export default function BlogPostDetailPage() {
  const { slug } = useParams({ from: '/blog/$slug' });
  const navigate = useNavigate();

  const { data: post, isLoading, error } = useGetPostBySlug(slug);

  // Resolve inline image URLs in content by replacing placeholder src with blob direct URLs
  const resolvedContent = useMemo(() => {
    if (!post) return '';
    if (!post.inlineImages || post.inlineImages.length === 0) return post.content;
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, 'text/html');
      const imgs = doc.querySelectorAll('img[data-blob-index]');
      imgs.forEach((img) => {
        const indexAttr = img.getAttribute('data-blob-index');
        if (indexAttr === null) return;
        const idx = parseInt(indexAttr, 10);
        const inlineImg = post.inlineImages.find((ii) => Number(ii.position) === idx);
        if (inlineImg) {
          try {
            const url = inlineImg.image.blob.getDirectURL();
            if (url) img.setAttribute('src', url);
            const sizeClass = getInlineImageSizeClass(inlineImg.image.size);
            img.classList.add(sizeClass, 'mx-auto', 'rounded-lg');
          } catch {
            // keep original src
          }
        }
      });
      return doc.body.innerHTML;
    } catch {
      return post.content;
    }
  }, [post]);

  const featuredImageUrl = useMemo(() => {
    if (!post?.featuredImage?.blob) return null;
    try {
      return post.featuredImage.blob.getDirectURL();
    } catch {
      return null;
    }
  }, [post]);

  const featuredImageSizeClass = useMemo(() => {
    if (!post?.featuredImage) return 'w-full';
    return getInlineImageSizeClass(post.featuredImage.size);
  }, [post]);

  const formatDate = (timestamp: bigint | undefined) => {
    if (!timestamp) return '';
    try {
      const ms = Number(timestamp) / 1_000_000;
      return new Date(ms).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading post...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Error Loading Post</h2>
          <p className="text-muted-foreground mb-4">
            There was an error loading this post. Please try again.
          </p>
          <Button variant="outline" onClick={() => navigate({ to: '/blog' })}>
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Post Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The blog post you're looking for doesn't exist or hasn't been published yet.
          </p>
          <Button variant="outline" onClick={() => navigate({ to: '/blog' })}>
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const displayDate = post.publicationDate
    ? formatDate(post.publicationDate)
    : post.publishedDate
    ? formatDate(post.publishedDate)
    : formatDate(post.createdDate);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate({ to: '/blog' })}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Button>

        {/* Article header */}
        <article>
          <header className="mb-8">
            {/* Category badge */}
            <div className="mb-4">
              <Badge variant="secondary" className="text-xs uppercase tracking-wide">
                {post.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-serif leading-tight mb-4">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {post.excerpt}
              </p>
            )}

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border pb-6">
              {post.author && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              )}
              {displayDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{displayDate}</span>
                </div>
              )}
              {post.readTime && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{Number(post.readTime)} min read</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {featuredImageUrl && (
            <div className="mb-8 rounded-xl overflow-hidden flex justify-center">
              <img
                src={featuredImageUrl}
                alt={post.title}
                className={`${featuredImageSizeClass} h-64 md:h-96 object-cover rounded-xl`}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none text-foreground
              prose-headings:font-serif prose-headings:text-foreground
              prose-p:text-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:text-foreground prose-ol:text-foreground
              prose-li:text-foreground
              prose-blockquote:border-primary prose-blockquote:text-muted-foreground
              prose-img:rounded-lg prose-img:mx-auto"
            dangerouslySetInnerHTML={{ __html: resolvedContent }}
          />
        </article>

        {/* Comment Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <CommentSection postId={post.id} />
        </div>
      </div>
    </div>
  );
}
