import { Mail, Phone, MapPin, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const seoKeywords = [
    'Travel Agency Ambernath',
    'Travel Packages Ambernath',
    'Bookaro Travel',
    'Luxury Villas Maharashtra',
    'Visa Services Ambernath',
    'Weekend Getaways Mumbai',
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-4">
            <div 
              onClick={() => setCurrentPage('home')}
              className="flex items-center cursor-pointer group py-1"
            >
              <img 
                src="/bookkaro_logo.png" 
                alt="Bookaro.in Logo" 
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            
            <p className="font-heading font-semibold text-xs text-accent-pink uppercase tracking-widest">
              Book Karo, Bachat Karo
            </p>
            <p className="font-body text-xs text-slate-500 leading-relaxed">
              Bookaro.in is the region's smartest travel suite. Crafting beautiful journeys, providing luxury stays, and making visa approvals quicker and transparent.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-heading font-bold text-sm tracking-widest uppercase mb-6">
              Platform Features
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'packages', label: 'Holiday Packages' },
                { id: 'stays', label: 'BookaroStays Villas' },
                { id: 'visa', label: 'Visa Services' },
                { id: 'planner', label: 'AI Trip Planner' },
                { id: 'contact', label: 'Contact Us' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => setCurrentPage(link.id)}
                    className="hover:text-primary-purple transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-heading font-bold text-sm tracking-widest uppercase mb-6">
              Reach Out
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-trust-blue flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed text-slate-500">
                  Shop No. 34, GNP Galaxy Phase 1, Ambernath - 421501
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-success-green flex-shrink-0" />
                <span className="text-xs">+91 88886 39634 / +91 93200 04200</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent-pink flex-shrink-0" />
                <span className="text-xs">info@bookaro.in / bookaro.in@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* SEO links */}
          <div>
            <h3 className="text-white font-heading font-bold text-sm tracking-widest uppercase mb-6">
              Popular Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {seoKeywords.map((keyword, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage('packages')}
                  className="bg-slate-900 border border-slate-800 hover:border-primary-purple/40 text-slate-500 hover:text-white px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-center space-x-1"
                >
                  <span>{keyword}</span>
                  <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 gap-4">
          <p>© {new Date().getFullYear()} Bookaro.in. All rights reserved. Made in Ambernath.</p>
          <p className="flex items-center space-x-1">
            <span>Powered by Smart AI Planning</span>
            <Heart className="h-3.5 w-3.5 text-accent-pink fill-accent-pink" />
            <span>& Big Savings.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
