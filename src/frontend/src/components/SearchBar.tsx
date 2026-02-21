import { Search, X } from 'lucide-react';
import { forwardRef, KeyboardEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onEnterKey?: () => void;
  onEscape?: () => void;
  onArrowDown?: () => void;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, onClear, onEnterKey, onEscape, onArrowDown }, ref) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onEnterKey) {
        e.preventDefault();
        onEnterKey();
      } else if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
      } else if (e.key === 'ArrowDown' && onArrowDown) {
        e.preventDefault();
        onArrowDown();
      }
    };

    return (
      <div className="relative w-full max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-green/60" />
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search remedies..."
            className="w-full pl-10 pr-10 py-2.5 bg-cream border-2 border-sage-green/30 rounded-full text-warm-brown placeholder:text-warm-brown/50 focus:outline-none focus:ring-2 focus:ring-earth-green/50 focus:border-earth-green transition-all"
          />
          {value && (
            <button
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-sage-green/20 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-earth-green/60" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
