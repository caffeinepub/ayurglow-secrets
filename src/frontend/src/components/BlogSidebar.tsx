import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { useRemedySearch } from '@/hooks/useRemedySearch';
import { useState, useRef, useEffect } from 'react';
import type { BlogPostView } from '../backend';

interface BlogSidebarProps {
  posts: BlogPostView[];
}

export default function BlogSidebar({ posts }: BlogSidebarProps) {
  const { searchQuery, setSearchQuery, filteredRemedies } = useRemedySearch();
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const popularPosts = posts.slice(0, 5);
  
  const categories = posts.reduce((acc, post) => {
    const category = post.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  useEffect(() => {
    setShowResults(searchQuery.length > 0);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
    searchInputRef.current?.blur();
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      {/* Search Widget */}
      <Card className="border-sage-green/20">
        <CardHeader>
          <CardTitle className="text-lg font-serif text-earth-green">Search Remedies</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={searchContainerRef} className="relative">
            <SearchBar
              ref={searchInputRef}
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={handleClearSearch}
              onEscape={() => setShowResults(false)}
              onArrowDown={() => setShowResults(true)}
            />
            <SearchResults
              results={filteredRemedies}
              isVisible={showResults}
              query={searchQuery}
              onClose={handleCloseResults}
            />
          </div>
        </CardContent>
      </Card>

      {/* Popular Posts */}
      <Card className="border-sage-green/20">
        <CardHeader>
          <CardTitle className="text-lg font-serif text-earth-green">Popular Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {popularPosts.map((post) => {
            const imageUrl = post.image?.getDirectURL() || '/assets/generated/blog-ayurveda-herbs.dim_1200x600.png';
            return (
              <Link 
                key={post.id} 
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="flex gap-3 group"
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-earth-green line-clamp-2 group-hover:text-gold transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs text-warm-brown/60 mt-1">
                    {new Date(Number(post.publishedDate)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </Link>
            );
          })}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="border-sage-green/20">
        <CardHeader>
          <CardTitle className="text-lg font-serif text-earth-green">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(categories).map(([category, count]) => (
              <div 
                key={category}
                className="flex items-center justify-between py-2 border-b border-sage-green/10 last:border-0"
              >
                <span className="text-sm text-warm-brown/80 hover:text-earth-green transition-colors cursor-pointer">
                  {category}
                </span>
                <Badge variant="secondary" className="bg-sage-green/20 text-earth-green">
                  {count.toString()}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
