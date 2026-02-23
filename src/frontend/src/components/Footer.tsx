import { SiFacebook, SiInstagram, SiX, SiYoutube } from 'react-icons/si';
import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'ayurglow-secrets';

  return (
    <footer className="bg-sage-green/5 border-t border-sage-green/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/assets/generated/ayur-leaf.dim_64x64.png" 
                alt="AyurGlow Leaf" 
                className="w-8 h-8"
              />
              <h3 className="text-lg font-bold font-serif text-earth-green">AyurGlow Secrets</h3>
            </div>
            <p className="text-warm-brown/70 text-sm leading-relaxed">
              Discover time-tested Ayurvedic remedies for overall health, radiant skin, and strong, healthy hair. Natural solutions rooted in ancient wisdom.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 font-serif text-earth-green">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-warm-brown/70 hover:text-earth-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-warm-brown/70 hover:text-earth-green transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-warm-brown/70 hover:text-earth-green transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-warm-brown/70 hover:text-earth-green transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-warm-brown/70 hover:text-earth-green transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-base font-semibold mb-4 font-serif text-earth-green">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/health-remedies" className="text-warm-brown/70 hover:text-earth-green transition-colors">
                  Health Remedies
                </Link>
              </li>
              <li>
                <Link to="/skin-care" className="text-warm-brown/70 hover:text-earth-green transition-colors">
                  Skin Care
                </Link>
              </li>
              <li>
                <Link to="/hair-care" className="text-warm-brown/70 hover:text-earth-green transition-colors">
                  Hair Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-base font-semibold mb-4 font-serif text-earth-green">Stay Connected</h4>
            <p className="text-warm-brown/70 text-sm mb-3">
              Subscribe to our newsletter for wellness tips
            </p>
            <div className="flex gap-2 mb-4">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="text-sm border-sage-green/30"
              />
              <Button 
                size="sm" 
                className="bg-earth-green hover:bg-earth-green/90 whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-sage-green/20 hover:bg-earth-green hover:text-cream flex items-center justify-center transition-colors text-earth-green" 
                aria-label="Facebook"
              >
                <SiFacebook size={16} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-sage-green/20 hover:bg-earth-green hover:text-cream flex items-center justify-center transition-colors text-earth-green" 
                aria-label="Instagram"
              >
                <SiInstagram size={16} />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-sage-green/20 hover:bg-earth-green hover:text-cream flex items-center justify-center transition-colors text-earth-green" 
                aria-label="X (Twitter)"
              >
                <SiX size={16} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-sage-green/20 hover:bg-earth-green hover:text-cream flex items-center justify-center transition-colors text-earth-green" 
                aria-label="YouTube"
              >
                <SiYoutube size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sage-green/20 pt-6 text-center text-sm text-warm-brown/60">
          <p className="mb-2">
            © {currentYear} AyurGlow Secrets. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500 fill-current" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-earth-green hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
