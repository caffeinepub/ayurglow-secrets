import React, { useMemo } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { Calendar, User, Clock, Tag, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetPost } from '../hooks/useQueries';
import CommentSection from '../components/CommentSection';
import { replaceInlineImageMarkers } from '../utils/imageUtils';

export default function BlogPostDetailPage() {
  const { postId } = useParams({ from: '/blog/$postId' });
  const { data: post, isLoading, error } = useGetPost(postId);

  const renderedContent = useMemo(() => {
    if (!post) return '';

    let content = post.content;

    // Replace inline image markers with actual images
    if (post.inlineImages && post.inlineImages.length > 0) {
      content = replaceInlineImageMarkers(content, post.inlineImages as any);
    }

    // Convert newlines to paragraphs for plain text content
    // But preserve HTML if it already contains tags
    const hasHtmlTags = /<[a-z][\s\S]*>/i.test(content);
    if (!hasHtmlTags) {
      content = content
        .split('\n\n')
        .filter((p) => p.trim())
        .map((p) => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
        .join('');
    }

    return content;
  }, [post]);

  const formatDate = (timestamp: bigint | undefined) => {
    if (!timestamp) return '';
    const ms = Number(timestamp) / 1_000_000;
    return new Date(ms).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Post Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const featuredImageUrl = post.featuredImage?.blob?.getDirectURL();

  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Back link */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground -ml-2">
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Category & Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-primary/10 text-primary border-primary/20 capitalize">
            {post.category.replace(/-/g, ' ')}
          </Badge>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair text-foreground mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {post.author}
          </span>
          {(post.publishedDate || post.createdDate) && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedDate || post.createdDate)}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {Number(post.readTime)} min read
          </span>
        </div>

        {/* Featured Image */}
        {featuredImageUrl && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={featuredImageUrl}
              alt={post.title}
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-muted-foreground italic border-l-4 border-primary/40 pl-4 mb-8">
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none dark:prose-invert
            prose-headings:font-playfair prose-headings:text-foreground
            prose-p:text-foreground/90 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-ul:text-foreground/90 prose-ol:text-foreground/90
            prose-blockquote:border-primary/40 prose-blockquote:text-muted-foreground
            [&_.inline-blog-image]:rounded-lg [&_.inline-blog-image]:shadow-md
            [&_.inline-blog-image]:my-6 [&_.inline-blog-image]:block
            [&_.inline-blog-image--small]:max-w-xs [&_.inline-blog-image--small]:mx-auto
            [&_.inline-blog-image--medium]:max-w-xl [&_.inline-blog-image--medium]:mx-auto
            [&_.inline-blog-image--large]:w-full"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />

        {/* Comments */}
        <div className="mt-12 pt-8 border-t border-border">
          <CommentSection postId={post.id} comments={post.comments} />
        </div>
      </article>
    </div>
  );
}
