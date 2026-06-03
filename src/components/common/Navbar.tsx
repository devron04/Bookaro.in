import React from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const location = useLocation();
  const currentPage = location.pathname;

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: '/', label: 'Home' },
    { id: '/packages', label: 'Packages' },
    { id: '/stays', label: 'BookaroStays' },
    { id: '/visa', label: 'Visa Services' },
    { id: '/planner', label: 'AI Trip Planner' },
    { id: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-md' 
        : 'bg-transparent border-transparent'
    }`}>
      {/* Top Promotional Banner */}
      {isBannerVisible && (
        <div className="w-full bg-[#F3E5D0] text-[#1a1a1a] text-center py-2 text-xs md:text-sm font-semibold tracking-wide flex justify-center items-center relative z-50">
          <span>FLAT 50% OFF on 2nd night on our newest escapes. <span className="font-bold">Use code: BOOKKARO</span></span>
          <button 
            onClick={() => setIsBannerVisible(false)}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-1 hover:bg-black/5 rounded-full transition-colors text-slate-500 hover:text-black"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center cursor-pointer group py-1"
          >
            <img
              src="/bookkaro_logo.png"
              alt="Bookaro.in Logo"
              className={`h-[72px] md:h-[76px] w-auto object-contain transform group-hover:scale-102 transition-all duration-300 ${
                !isScrolled ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${currentPage === item.id
                    ? (isScrolled ? 'text-primary-purple font-bold' : 'text-white font-bold')
                    : isScrolled
                      ? 'text-slate-800 hover:text-primary-purple'
                      : 'text-white hover:text-slate-200'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">


            <a
              href="https://wa.me/918888639634?text=Hi%20Bookaro,%20I'm%20interested%20in%20planning%20a%20trip!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-full font-heading text-sm font-semibold shadow-md shadow-green-500/20 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <PhoneCall className="h-4 w-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl focus:outline-none transition-colors ${
                isScrolled ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-white/10 text-white'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-slate-100 py-4 px-6 space-y-2 animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left px-4 py-3 rounded-xl font-heading font-semibold text-sm transition-all ${currentPage === item.id
                  ? 'bg-primary-purple text-white'
                  : 'text-lighttext hover:bg-slate-100 hover:text-[#0F172A]'
                }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-200 flex flex-col space-y-2">
            <a
              href="https://wa.me/918888639634?text=Hi%20Bookaro,%20I'm%20interested%20in%20planning%20a%20trip!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded-xl font-heading font-semibold shadow-sm"
            >
              <PhoneCall className="h-4 w-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
