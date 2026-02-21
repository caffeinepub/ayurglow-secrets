import { Link, useRouterState, useNavigate } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { filterRemedies } from '@/hooks/useRemedySearch';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const router = useRouterState();
  const navigate = useNavigate();
  const currentPath = router.location.pathname;
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/health-remedies', label: 'Health Remedies' },
    { path: '/skin-care', label: 'Skin Care' },
    { path: '/hair-care', label: 'Hair Care' },
    { path: '/blog', label: 'Blog' },
    { path: '/admin/posts', label: 'Admin' },
  ];

  const filteredResults = filterRemedies(searchQuery);

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

  const handleEnterKey = () => {
    if (filteredResults.length > 0) {
      navigate({ to: filteredResults[0].path });
      handleClearSearch();
    }
  };

  const handleEscape = () => {
    setShowResults(false);
    searchInputRef.current?.blur();
  };

  const handleArrowDown = () => {
    if (filteredResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <nav className="bg-sage-green/10 backdrop-blur-sm border-b border-earth-green/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/assets/generated/ayur-leaf.dim_64x64.png" 
              alt="AyurGlow Leaf" 
              className="w-10 h-10 transition-transform group-hover:scale-110"
            />
            <div>
              <h1 className="text-2xl font-bold text-earth-green font-serif">AyurGlow Secrets</h1>
              <p className="text-xs text-warm-brown/70 hidden sm:block">Ancient Ayurvedic Wisdom</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  currentPath === link.path
                    ? 'bg-earth-green text-cream shadow-md'
                    : 'text-warm-brown hover:bg-sage-green/20 hover:text-earth-green'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-sage-green/20 text-earth-green"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-earth-green/20">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  currentPath === link.path
                    ? 'bg-earth-green text-cream'
                    : 'text-warm-brown hover:bg-sage-green/20'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Search Bar Section */}
        <div className="py-4 border-t border-earth-green/20" ref={searchContainerRef}>
          <div className="relative">
            <SearchBar
              ref={searchInputRef}
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={handleClearSearch}
              onEnterKey={handleEnterKey}
              onEscape={handleEscape}
              onArrowDown={handleArrowDown}
            />
            <SearchResults
              results={filteredResults}
              isVisible={showResults}
              query={searchQuery}
              onClose={handleCloseResults}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
