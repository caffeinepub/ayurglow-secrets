import { Link } from '@tanstack/react-router';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { useGetPublishedPosts } from '../hooks/useQueries';
import BlogSidebar from '../components/BlogSidebar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { BlogPostView } from '../backend';

function PostCard({ post }: { post: BlogPostView }) {
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
      {featuredImageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={featuredImageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      {!featuredImageUrl && (
        <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
          <img
            src="/assets/generated/blog-featured-placeholder.dim_800x450.png"
            alt="Blog post"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
      )}
      <div className="p-6">
        {post.category && (
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 text-xs">
            {post.category}
          </Badge>
        )}
        <h2 className="text-xl font-playfair font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 flex-wrap">
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

export default function BlogPage() {
  const { data: posts = [], isLoading } = useGetPublishedPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">
          AyurGlow Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of Ayurvedic wisdom, natural remedies, and holistic wellness tips
          for a healthier, more balanced life.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 bg-muted/30 rounded-xl border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-2">No posts yet</h3>
              <p className="text-muted-foreground">
                Check back soon! We're working on bringing you amazing Ayurvedic content.
                Posts need to be published by an admin to appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <BlogSidebar posts={posts} />
        </div>
      </div>
    </div>
  );
}
