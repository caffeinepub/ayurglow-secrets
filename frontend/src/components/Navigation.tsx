import { Link, useRouterState, useNavigate } from '@tanstack/react-router';
import { Menu, X, ChevronDown, LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const queryClient = useQueryClient();
  const { login, clear, loginStatus, identity } = useInternetIdentity();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        if (error?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
  ];

  const categoryLinks = [
    { path: '/health-remedies', label: 'Health Remedies' },
    { path: '/skin-care', label: 'Skin Care' },
    { path: '/hair-care', label: 'Hair Care' },
  ];

  return (
    <nav className="bg-white border-b border-sage-green/20 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/assets/generated/ayurglow-logo.dim_400x400.png"
              alt="AyurGlow Secrets Logo"
              className="h-11 w-auto group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-earth-green ${
                  currentPath === link.path
                    ? 'text-earth-green font-semibold'
                    : 'text-foreground/80'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-earth-green transition-colors">
                Categories
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {categoryLinks.map((link) => (
                  <DropdownMenuItem
                    key={link.path}
                    onClick={() => navigate({ to: link.path })}
                    className="cursor-pointer text-sm"
                  >
                    {link.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Admin Link */}
            <Link
              to="/admin/posts"
              className={`text-sm font-medium transition-colors hover:text-earth-green ${
                currentPath.startsWith('/admin')
                  ? 'text-earth-green font-semibold'
                  : 'text-foreground/80'
              }`}
            >
              Admin
            </Link>

            {/* Login / Logout Button */}
            <button
              onClick={handleAuth}
              disabled={isLoggingIn}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors disabled:opacity-50 ${
                isAuthenticated
                  ? 'bg-gold-100 hover:bg-gold-200 text-earth-green-900 border border-gold-300'
                  : 'bg-earth-green text-white hover:bg-earth-green-700'
              }`}
            >
              {isAuthenticated ? (
                <>
                  <LogOut className="w-3.5 h-3.5" />
                  {isLoggingIn ? 'Logging out...' : 'Logout'}
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5" />
                  {isLoggingIn ? 'Logging in...' : 'Login'}
                </>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-earth-green hover:bg-sage-green/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-sage-green/20">
            <div className="flex flex-col gap-2">
              {/* Mobile Logo */}
              <div className="flex justify-center mb-2">
                <img
                  src="/assets/generated/ayurglow-logo.dim_400x400.png"
                  alt="AyurGlow Secrets Logo"
                  className="h-14 w-auto"
                />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentPath === link.path
                      ? 'bg-earth-green text-white'
                      : 'text-foreground/80 hover:bg-sage-green/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Categories
              </div>

              {categoryLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentPath === link.path
                      ? 'bg-earth-green text-white'
                      : 'text-foreground/80 hover:bg-sage-green/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/admin/posts"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPath.startsWith('/admin')
                    ? 'bg-earth-green text-white'
                    : 'text-foreground/80 hover:bg-sage-green/10'
                }`}
              >
                Admin
              </Link>

              {/* Mobile Login / Logout Button */}
              <div className="px-4 pt-2 pb-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleAuth();
                  }}
                  disabled={isLoggingIn}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                    isAuthenticated
                      ? 'bg-gold-100 hover:bg-gold-200 text-earth-green-900 border border-gold-300'
                      : 'bg-earth-green text-white hover:bg-earth-green-700'
                  }`}
                >
                  {isAuthenticated ? (
                    <>
                      <LogOut className="w-4 h-4" />
                      {isLoggingIn ? 'Logging out...' : 'Logout'}
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      {isLoggingIn ? 'Logging in...' : 'Login'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
