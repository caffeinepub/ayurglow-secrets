import { Link } from '@tanstack/react-router';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BlogPostView } from '../backend';

interface FeaturedPostProps {
  post: BlogPostView;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const imageUrl = post.image?.getDirectURL() || '/assets/generated/blog-featured-placeholder.dim_800x450.png';
  const excerpt = post.excerpt.length > 200 ? post.excerpt.substring(0, 200) + '...' : post.excerpt;
  const publishDate = new Date(Number(post.publishedDate));

  return (
    <Link to="/blog/$slug" params={{ slug: post.slug }} className="block group">
      <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="relative h-[450px] md:h-[500px]">
          <img 
            src={imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <Badge className="mb-3 bg-gold text-earth-green hover:bg-gold/90">
              {post.category}
            </Badge>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-serif leading-tight">
              {post.title}
            </h2>
            
            <p className="text-lg text-white/90 mb-4 leading-relaxed">
              {excerpt}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{Number(post.readTime)} min read</span>
              </div>
            </div>
            
            <div className="mt-4">
              <span className="inline-flex items-center text-gold font-semibold group-hover:gap-2 transition-all">
                Read More
                <span className="ml-1 group-hover:ml-0 transition-all">→</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
