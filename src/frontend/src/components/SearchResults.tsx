import { Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { Badge } from '@/components/ui/badge';

interface RemedyPage {
  path: string;
  title: string;
  category: string;
  keywords: string[];
}

interface SearchResultsProps {
  results: RemedyPage[];
  isVisible: boolean;
  query: string;
  onClose: () => void;
}

export default function SearchResults({ results, isVisible, query, onClose }: SearchResultsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    setSelectedIndex(0);
    itemRefs.current = [];
  }, [results]);

  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.focus();
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
      e.preventDefault();
      navigate({ to: results[selectedIndex].path });
      onClose();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const handleResultClick = (path: string) => {
    navigate({ to: path });
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      ref={resultsRef}
      className="absolute top-full left-0 right-0 mt-2 bg-cream border-2 border-earth-green/30 rounded-2xl shadow-xl max-h-96 overflow-y-auto z-50"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {results.length > 0 ? (
        <div className="py-2">
          {results.map((result, index) => (
            <Link
              key={result.path}
              to={result.path}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => handleResultClick(result.path)}
              className={`block px-4 py-3 transition-colors ${
                index === selectedIndex
                  ? 'bg-earth-green/10'
                  : 'hover:bg-sage-green/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="text-earth-green font-semibold mb-1">{result.title}</h4>
                  <Badge
                    variant="outline"
                    className="text-xs border-earth-green/30 text-warm-brown"
                  >
                    {result.category}
                  </Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : query ? (
        <div className="px-4 py-8 text-center text-warm-brown/60">
          <p>No remedies found for "{query}"</p>
          <p className="text-sm mt-2">Try searching for health, skin, or hair remedies</p>
        </div>
      ) : null}
    </div>
  );
}
