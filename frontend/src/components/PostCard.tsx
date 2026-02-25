import { Link } from '@tanstack/react-router';
import { BlogPostView } from '../backend';
import { Calendar, Clock, User } from 'lucide-react';

interface PostCardProps {
  post: BlogPostView;
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl = post.image ? post.image.getDirectURL() : '/assets/generated/blog-featured-placeholder.dim_800x450.png';
  const formattedDate = new Date(Number(post.publishedDate) / 1_000_000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-md transition-shadow duration-300 border border-sage-green/20 flex flex-col">
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="block overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-earth-green text-white text-xs font-medium px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link to="/blog/$slug" params={{ slug: post.slug }}>
          <h3 className="font-heading text-lg font-semibold text-foreground hover:text-earth-green transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-3 text-xs text-muted-foreground border-t border-sage-green/20 pt-3 mt-auto">
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
            {Number(post.readTime)} min
          </span>
        </div>
      </div>
    </article>
  );
}
