import { Link } from '@tanstack/react-router';
import { Leaf, Mail, MapPin } from 'lucide-react';
import { SiInstagram, SiFacebook, SiYoutube, SiX } from 'react-icons/si';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/assets/generated/ayurglow-logo.dim_400x120.png"
                alt="AyurGlow Secrets"
                className="h-10 w-auto brightness-0 invert"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const sibling = target.nextElementSibling as HTMLElement;
                  if (sibling) sibling.style.display = 'flex';
                }}
              />
              <span className="hidden items-center gap-1.5 font-serif text-lg font-bold text-white" style={{ display: 'none' }}>
                <Leaf className="w-5 h-5" />
                AyurGlow Secrets
              </span>
            </Link>
            <p className="text-white/75 text-sm leading-relaxed mb-4">
              Ancient Ayurvedic Wisdom for Healthy Body, Glowing Skin & Strong Hair. 100% natural remedies for a better life.
            </p>
            <div className="flex items-center gap-1.5 text-white/60 text-xs">
              <MapPin className="w-3.5 h-3.5" />
              <span>India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Blog', path: '/blog' },
                { label: 'About Us', path: '/about' },
                { label: 'Privacy Policy', path: '/privacy' },
                { label: 'Terms of Service', path: '/terms' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/75 hover:text-white text-sm transition-colors hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              {[
                { label: '🌿 Health Remedies', path: '/health-remedies' },
                { label: '💆 Skin Care', path: '/skin-care' },
                { label: '💇 Hair Care', path: '/hair-care' },
                { label: '⚖️ Weight Management', path: '/weight-management' },
                { label: '🧘 Lifestyle & Wellness', path: '/lifestyle-wellness' },
              ].map((cat) => (
                <li key={cat.path}>
                  <Link
                    to={cat.path}
                    className="text-white/75 hover:text-white text-sm transition-colors hover:underline"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <p className="text-white/75 text-sm mb-4">
              Follow us for daily Ayurvedic tips, remedies, and wellness inspiration.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <SiInstagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <SiFacebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <SiYoutube className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <SiX className="w-4 h-4 text-white" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-xs">
              <Mail className="w-3.5 h-3.5" />
              <span>contact@ayurglowsecrets.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/60 text-xs">
            © {year} AyurGlow Secrets. All rights reserved.
          </p>
          <p className="text-white/50 text-xs">
            For informational purposes only. Consult a healthcare professional before starting any remedy.
          </p>
        </div>
      </div>
    </footer>
  );
}
