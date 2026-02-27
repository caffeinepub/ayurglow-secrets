import { Link } from '@tanstack/react-router';
import { BlogPostView } from '../backend';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

interface FeaturedPostProps {
  post: BlogPostView;
}

function formatPostDate(post: BlogPostView): string {
  const timestamp = post.publicationDate ?? post.publishedDate ?? post.createdDate;
  return new Date(Number(timestamp) / 1_000_000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const imageUrl = post.featuredImage?.blob
    ? post.featuredImage.blob.getDirectURL()
    : '/assets/generated/blog-featured-placeholder.dim_800x450.png';
  const formattedDate = formatPostDate(post);

  return (
    <article className="relative rounded-2xl overflow-hidden shadow-card-hover group">
      <Link to="/blog/$postId" params={{ postId: post.slug }} className="block">
        <div className="relative h-80 md:h-96">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                '/assets/generated/blog-featured-placeholder.dim_800x450.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <div className="mb-3">
            <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              Featured · {post.category}
            </span>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3 line-clamp-2 group-hover:text-white/90 transition-colors">
            {post.title}
          </h2>

          <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-4">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-white/70 text-xs">
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {Number(post.readTime)} min read
              </span>
            </div>

            <span className="flex items-center gap-1 text-white text-sm font-medium group-hover:gap-2 transition-all">
              Read More <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
