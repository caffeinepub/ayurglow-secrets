import { Link } from '@tanstack/react-router';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BlogPostView } from '../backend';

interface PostCardProps {
  post: BlogPostView;
}

export default function PostCard({ post }: PostCardProps) {
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
    <article className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
      <div className="h-48 overflow-hidden">
        {featuredImageUrl ? (
          <img
            src={featuredImageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <img
              src="/assets/generated/blog-featured-placeholder.dim_800x450.png"
              alt="Blog post"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        )}
      </div>
      <div className="p-5">
        {post.category && (
          <Badge className="mb-2 bg-primary/10 text-primary border-primary/20 text-xs">
            {post.category}
          </Badge>
        )}
        <h3 className="text-lg font-playfair font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 flex-wrap">
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
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Read More
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  );
}
