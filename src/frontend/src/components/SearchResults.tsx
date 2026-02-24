import { useNavigate } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { useEffect, useRef, useState, useCallback } from 'react';

interface SearchResult {
  title: string;
  path: string;
  category: string;
  keywords: string[];
}

interface SearchResultsProps {
  results: SearchResult[];
  isVisible: boolean;
  query: string;
  onClose: () => void;
}

export default function SearchResults({ results, isVisible, query, onClose }: SearchResultsProps) {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const resultsRef = useRef<(HTMLDivElement | null)[]>([]);

  const setResultRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    resultsRef.current[index] = el;
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current[selectedIndex]) {
      resultsRef.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible || results.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          handleResultClick(results[selectedIndex].path);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, results, selectedIndex, onClose]);

  const handleResultClick = (path: string) => {
    navigate({ to: path });
    onClose();
  };

  if (!isVisible || results.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-sky-blue/30 rounded-xl shadow-xl max-h-96 overflow-y-auto z-50">
      <div className="p-2">
        <div className="text-xs text-muted-foreground px-3 py-2">
          {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
        </div>
        {results.map((result, index) => (
          <div
            key={result.path}
            ref={setResultRef(index)}
            onClick={() => handleResultClick(result.path)}
            className={`px-3 py-3 rounded-lg cursor-pointer transition-colors ${
              index === selectedIndex
                ? 'bg-mint-green/20'
                : 'hover:bg-sky-blue/10'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-ocean-blue line-clamp-1">
                  {result.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {result.keywords.slice(0, 3).join(', ')}
                </p>
              </div>
              <Badge className="flex-shrink-0 bg-forest-green/20 text-forest-green text-xs">
                {result.category}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
