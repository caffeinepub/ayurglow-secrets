import { SiFacebook, SiInstagram, SiX, SiYoutube } from 'react-icons/si';
import { Link } from '@tanstack/react-router';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth-green text-cream mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/assets/generated/ayur-leaf.dim_64x64.png" 
                alt="AyurGlow Leaf" 
                className="w-8 h-8"
              />
              <h3 className="text-xl font-bold font-serif">AyurGlow Secrets</h3>
            </div>
            <p className="text-cream/80 text-sm leading-relaxed">
              Discover time-tested Ayurvedic remedies for overall health, radiant skin, and strong, healthy hair.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-cream/80 hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/health-remedies" className="text-cream/80 hover:text-gold transition-colors">
                  Health Remedies
                </Link>
              </li>
              <li>
                <Link to="/skin-care" className="text-cream/80 hover:text-gold transition-colors">
                  Skin Care
                </Link>
              </li>
              <li>
                <Link to="/hair-care" className="text-cream/80 hover:text-gold transition-colors">
                  Hair Care
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-cream/80 hover:text-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-cream/80 hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-cream/80 hover:text-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-serif">Connect With Us</h4>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-gold flex items-center justify-center transition-colors" 
                aria-label="Facebook"
              >
                <SiFacebook size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-gold flex items-center justify-center transition-colors" 
                aria-label="Instagram"
              >
                <SiInstagram size={18} />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-gold flex items-center justify-center transition-colors" 
                aria-label="X (Twitter)"
              >
                <SiX size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-gold flex items-center justify-center transition-colors" 
                aria-label="YouTube"
              >
                <SiYoutube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/20 pt-6 text-center text-sm text-cream/70">
          <p>© {currentYear} AyurGlow Secrets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
