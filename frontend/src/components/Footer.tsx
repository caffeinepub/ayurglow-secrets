import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiYoutube, SiX } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'innerlift-wellness');

  return (
    <footer className="bg-forest text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img
                src="/assets/generated/innerlift-logo.dim_300x80.png"
                alt="InnerLift Wellness"
                className="h-10 w-auto brightness-200"
              />
            </div>
            <p className="text-sm text-cream/70 mb-4 leading-relaxed">
              Balance Your Mind. Empower Your Life. Your safe space for mental clarity, emotional resilience, and personal growth.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-cream/60 hover:text-gold transition-colors" aria-label="Facebook">
                <SiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream/60 hover:text-gold transition-colors" aria-label="Instagram">
                <SiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream/60 hover:text-gold transition-colors" aria-label="YouTube">
                <SiYoutube className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream/60 hover:text-gold transition-colors" aria-label="X (Twitter)">
                <SiX className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair font-semibold text-cream mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Blog', path: '/blog' },
                { label: 'About Us', path: '/about' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-playfair font-semibold text-cream mb-4">Categories</h3>
            <ul className="space-y-2">
              {[
                { label: 'Health Remedies', path: '/health-remedies' },
                { label: 'Skin Care', path: '/skin-care' },
                { label: 'Hair Care', path: '/hair-care' },
              ].map((cat) => (
                <li key={cat.path}>
                  <Link
                    to={cat.path}
                    className="text-sm text-cream/70 hover:text-gold transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-playfair font-semibold text-cream mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                { label: 'Privacy Policy', path: '/privacy' },
                { label: 'Terms of Service', path: '/terms' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-cream/60">
            &copy; {currentYear} InnerLift Wellness. All rights reserved.
          </p>
          <p className="text-sm text-cream/60 flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-gold fill-gold" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
