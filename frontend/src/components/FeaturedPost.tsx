import { Link } from '@tanstack/react-router';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BlogPostView } from '../backend';

interface FeaturedPostProps {
  post: BlogPostView;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const featuredImageUrl = post.featuredImage?.blob.getDirectURL();

  const formatDate = (timestamp: bigint | undefined) => {
    if (!timestamp) return '';
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="relative bg-card border border-border rounded-2xl overflow-hidden group">
      <div className="h-72 sm:h-96 overflow-hidden">
        {featuredImageUrl ? (
          <img
            src={featuredImageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <img
            src="/assets/generated/blog-featured-placeholder.dim_800x450.png"
            alt="Featured post"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        {post.category && (
          <Badge className="mb-3 bg-primary/80 text-white border-0 text-xs">
            {post.category}
          </Badge>
        )}
        <h2 className="text-2xl sm:text-3xl font-playfair font-bold mb-2 line-clamp-2">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-white/80 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-4 text-xs text-white/70 mb-4 flex-wrap">
          {post.author && (
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {post.author}
            </span>
          )}
          {post.publishedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.publishedDate)}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {Number(post.readTime)} min read
            </span>
          )}
        </div>
        <Link
          to="/blog/$postId"
          params={{ postId: post.slug || post.id }}
          className="inline-flex items-center gap-2 text-sm font-medium text-white bg-primary/80 hover:bg-primary px-4 py-2 rounded-full transition-colors"
        >
          Read Article
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
