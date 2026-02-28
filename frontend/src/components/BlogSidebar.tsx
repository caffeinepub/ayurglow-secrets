import { Link } from '@tanstack/react-router';
import { Search, TrendingUp, Tag } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import type { BlogPostView } from '../backend';

interface BlogSidebarProps {
  posts: BlogPostView[];
}

const CATEGORIES = [
  { name: 'Health Remedies', path: '/health-remedies' },
  { name: 'Skin Care', path: '/skin-care' },
  { name: 'Hair Care', path: '/hair-care' },
  { name: 'Lifestyle & Wellness', path: '/' },
];

export default function BlogSidebar({ posts }: BlogSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const popularPosts = posts
    .filter((p) => p.isPublished)
    .slice(0, 5);

  const filteredPosts = searchQuery
    ? popularPosts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : popularPosts;

  return (
    <aside className="space-y-6">
      {/* Search */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          Search Posts
        </h3>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search blog posts..."
          className="text-sm"
        />
      </div>

      {/* Popular Posts */}
      {filteredPosts.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Popular Posts
          </h3>
          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to="/blog/$postId"
                params={{ postId: post.slug || post.id }}
                className="block group"
              >
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </p>
                {post.category && (
                  <span className="text-xs text-muted-foreground">{post.category}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Tag className="h-4 w-4 text-primary" />
          Categories
        </h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.path}
              to={cat.path}
              className="flex items-center justify-between py-1.5 text-sm text-foreground hover:text-primary transition-colors group"
            >
              <span>{cat.name}</span>
              <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
