import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { useRemedySearch } from '@/hooks/useRemedySearch';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { searchQuery, setSearchQuery, filteredRemedies } = useRemedySearch();
  const [showResults, setShowResults] = useState(false);
  const router = useRouterState();
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
    <nav className="bg-sage-green/10 backdrop-blur-sm border-b border-earth-green/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/assets/generated/ayur-leaf.dim_64x64.png" 
              alt="AyurGlow Secrets Logo" 
              className="w-12 h-12 group-hover:scale-110 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-earth-green font-serif">AyurGlow Secrets</span>
              <span className="text-xs text-warm-brown/70">Ancient Wisdom, Modern Wellness</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-earth-green ${
                    currentPath === link.path
                      ? 'text-earth-green border-b-2 border-earth-green'
                      : 'text-warm-brown/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search Bar */}
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
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-earth-green hover:bg-sage-green/20 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-earth-green/20">
            <div className="flex flex-col gap-4">
              {/* Mobile Search */}
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
                  onClose={() => {
                    handleCloseResults();
                    setIsOpen(false);
                  }}
                />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPath === link.path
                      ? 'bg-earth-green text-cream'
                      : 'text-warm-brown/80 hover:bg-sage-green/20'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
