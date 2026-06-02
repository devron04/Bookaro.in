import React from 'react';
import { Menu, X, PhoneCall, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'packages', label: 'Packages' },
    { id: 'stays', label: 'BookaroStays' },
    { id: 'visa', label: 'Visa Services' },
    { id: 'planner', label: 'AI Trip Planner' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-nav shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div
            onClick={() => setCurrentPage('home')}
            className="flex items-center cursor-pointer group py-1"
          >
            <img
              src="/bookkaro_logo.png"
              alt="Bookaro.in Logo"
              className="h-[72px] md:h-[76px] w-auto object-contain transform group-hover:scale-102 transition-transform duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 rounded-full font-heading text-sm font-semibold transition-all duration-300 ${currentPage === item.id
                    ? 'bg-primary-purple text-white shadow-md shadow-primary-purple/20'
                    : 'text-lighttext hover:text-primary-purple hover:bg-slate-100'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => setCurrentPage('admin')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold font-heading transition-all ${currentPage === 'admin'
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-trust-blue" />
              <span>Admin Leads</span>
            </button>

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
              onClick={() => setCurrentPage('admin')}
              className={`p-2 rounded-lg border ${currentPage === 'admin' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
                }`}
              title="Admin Panel"
            >
              <ShieldCheck className="h-5 w-5 text-trust-blue" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl hover:bg-slate-100 text-darktext focus:outline-none"
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
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-xl font-heading font-semibold text-sm transition-all ${currentPage === item.id
                  ? 'bg-primary-purple text-white'
                  : 'text-lighttext hover:bg-slate-100 hover:text-[#0F172A]'
                }`}
            >
              {item.label}
            </button>
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
