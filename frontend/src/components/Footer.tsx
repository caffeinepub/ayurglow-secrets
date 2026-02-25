import { Link } from '@tanstack/react-router';
import { SiFacebook, SiX, SiInstagram, SiYoutube } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth-green text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <img
              src="/assets/generated/ayurglow-logo.dim_400x400.png"
              alt="AyurGlow Secrets Logo"
              className="h-16 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-white/80 text-sm leading-relaxed">
              Ancient Ayurvedic Wisdom for Healthy Body, Glowing Skin &amp; Strong Hair
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 font-serif">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 font-serif">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/health-remedies" className="text-white/80 hover:text-white transition-colors">
                  Health Remedies
                </Link>
              </li>
              <li>
                <Link to="/skin-care" className="text-white/80 hover:text-white transition-colors">
                  Skin Care
                </Link>
              </li>
              <li>
                <Link to="/hair-care" className="text-white/80 hover:text-white transition-colors">
                  Hair Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 font-serif">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-white/80 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-white/80 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <SiYoutube className="w-5 h-5" />
              </a>
            </div>

            <div className="text-sm text-white/80 text-center md:text-right">
              <p>© {currentYear} AyurGlow Secrets. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
