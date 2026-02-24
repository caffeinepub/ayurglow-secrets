import { Link } from '@tanstack/react-router';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { BlogPostView } from '../backend';

interface PostCardProps {
  post: BlogPostView;
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl = post.image?.getDirectURL() || '/assets/generated/blog-ayurveda-herbs.dim_1200x600.png';
  const excerpt = post.excerpt.length > 120 ? post.excerpt.substring(0, 120) + '...' : post.excerpt;
  const publishDate = new Date(Number(post.publishedDate));

  return (
    <Link to="/blog/$slug" params={{ slug: post.slug }}>
      <Card className="h-full overflow-hidden border-sage-green/20 hover:border-earth-green hover:shadow-xl transition-all duration-300 group">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = '/assets/generated/blog-ayurveda-herbs.dim_1200x600.png';
            }}
          />
        </div>
        
        <CardContent className="p-5">
          <Badge className="mb-3 bg-sage-green/30 text-earth-green hover:bg-sage-green/40 text-xs">
            {post.category}
          </Badge>
          
          <h3 className="text-lg md:text-xl font-bold text-earth-green mb-2 font-serif line-clamp-2 group-hover:text-forest-green transition-colors leading-snug">
            {post.title}
          </h3>
          
          <p className="text-foreground/70 text-sm mb-4 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{Number(post.readTime)} min</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
