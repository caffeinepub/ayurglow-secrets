import { SiFacebook, SiInstagram, SiX, SiYoutube } from 'react-icons/si';
import { Link } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'ayurglow-secrets';

  return (
    <footer className="bg-mint-green/5 border-t border-sky-blue/20 mt-20">
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
              <h3 className="text-base md:text-lg font-bold font-serif text-ocean-blue">AyurGlow Secrets</h3>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Discover time-tested Ayurvedic remedies for overall health, radiant skin, and strong, healthy hair. Natural solutions rooted in ancient wisdom.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm md:text-base font-semibold mb-4 font-serif text-ocean-blue">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-forest-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-foreground/70 hover:text-forest-green transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-forest-green transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-foreground/70 hover:text-forest-green transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-foreground/70 hover:text-forest-green transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm md:text-base font-semibold mb-4 font-serif text-ocean-blue">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/health-remedies" className="text-foreground/70 hover:text-forest-green transition-colors">
                  Health Remedies
                </Link>
              </li>
              <li>
                <Link to="/skin-care" className="text-foreground/70 hover:text-forest-green transition-colors">
                  Skin Care
                </Link>
              </li>
              <li>
                <Link to="/hair-care" className="text-foreground/70 hover:text-forest-green transition-colors">
                  Hair Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-sm md:text-base font-semibold mb-4 font-serif text-ocean-blue">Stay Connected</h4>
            <p className="text-foreground/70 text-sm mb-3 leading-relaxed">
              Subscribe to our newsletter for wellness tips
            </p>
            <div className="flex gap-2 mb-4">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="text-sm border-sky-blue/30"
              />
              <Button 
                size="sm" 
                className="bg-forest-green hover:bg-forest-green/90 whitespace-nowrap text-sm"
              >
                Subscribe
              </Button>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-sky-blue/20 hover:bg-ocean-blue hover:text-white flex items-center justify-center transition-colors text-ocean-blue" 
                aria-label="Facebook"
              >
                <SiFacebook size={16} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-sky-blue/20 hover:bg-ocean-blue hover:text-white flex items-center justify-center transition-colors text-ocean-blue" 
                aria-label="Instagram"
              >
                <SiInstagram size={16} />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-sky-blue/20 hover:bg-ocean-blue hover:text-white flex items-center justify-center transition-colors text-ocean-blue" 
                aria-label="X (Twitter)"
              >
                <SiX size={16} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-sky-blue/20 hover:bg-ocean-blue hover:text-white flex items-center justify-center transition-colors text-ocean-blue" 
                aria-label="YouTube"
              >
                <SiYoutube size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sky-blue/20 pt-6 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            © {currentYear} AyurGlow Secrets. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-1 flex-wrap">
            Built with <Heart className="w-4 h-4 text-forest-green fill-forest-green" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ocean-blue hover:text-sky-blue transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
