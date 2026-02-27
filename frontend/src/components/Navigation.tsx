import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, ChevronDown, Leaf } from 'lucide-react';

const categories = [
  { name: 'Health Remedies', path: '/health-remedies', emoji: '🌿' },
  { name: 'Skin Care', path: '/skin-care', emoji: '💆' },
  { name: 'Hair Care', path: '/hair-care', emoji: '💇' },
  { name: 'Weight Management', path: '/weight-management', emoji: '⚖️' },
  { name: 'Lifestyle & Wellness', path: '/lifestyle-wellness', emoji: '🧘' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/assets/generated/ayurglow-logo.dim_400x120.png"
              alt="AyurGlow Secrets"
              className="h-10 w-auto"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const sibling = target.nextElementSibling as HTMLElement;
                if (sibling) sibling.style.display = 'flex';
              }}
            />
            <span
              className="hidden items-center gap-1.5 font-serif text-xl font-bold text-primary"
              style={{ display: 'none' }}
            >
              <Leaf className="w-5 h-5 text-primary" />
              AyurGlow Secrets
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" onMouseEnter={() => setCategoriesOpen(true)} onMouseLeave={() => setCategoriesOpen(false)}>
              <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Categories <ChevronDown className="w-4 h-4" />
              </button>
              {categoriesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-card-hover border border-border py-2 z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.path}
                      to={cat.path}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors"
                      onClick={() => setCategoriesOpen(false)}
                    >
                      <span>{cat.emoji}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/blog" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Blog
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link
              to="/admin"
              className="text-sm font-medium bg-primary text-primary-foreground px-4 py-1.5 rounded-full hover:bg-primary/90 transition-colors"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-4 py-4 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-accent hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Categories</p>
              {categories.map((cat) => (
                <Link
                  key={cat.path}
                  to={cat.path}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-foreground hover:bg-accent hover:text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{cat.emoji}</span>
                  {cat.name}
                </Link>
              ))}
            </div>
            <Link
              to="/blog"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-accent hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-accent hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <Link
              to="/admin"
              className="block px-3 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
