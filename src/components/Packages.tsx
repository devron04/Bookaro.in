import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Clock, Star, MapPin, X, Check, Phone } from 'lucide-react';
import { packagesData } from '../mockData';
import type { Package, Lead } from '../mockData';

interface PackagesProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'timestamp'>) => void;
  filterDestination: string;
  setFilterDestination: (destination: string) => void;
}

export default function Packages({ onAddLead, filterDestination, setFilterDestination }: PackagesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(filterDestination || '');
  const [maxBudget, setMaxBudget] = useState<number>(100000);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>(packagesData);
  
  // Lead submission state
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setSearchQuery(filterDestination);
  }, [filterDestination]);

  useEffect(() => {
    let result = packagesData;

    // Search query
    if (searchQuery.trim() !== '') {
      result = result.filter(pkg => 
        pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter(pkg => pkg.category === selectedCategory);
    }

    // Budget
    result = result.filter(pkg => pkg.price <= maxBudget);

    setFilteredPackages(result);
  }, [selectedCategory, searchQuery, maxBudget]);

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onAddLead({
      name,
      phone,
      email,
      destination: selectedPkg?.title,
      budget: `₹${selectedPkg?.price}`,
      type: 'package',
      status: 'new',
      source: `Holiday Package: ${selectedPkg?.title}`
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSelectedPkg(null);
      setName('');
      setPhone('');
      setEmail('');
    }, 2000);
  };

  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'domestic', label: 'Domestic' },
    { id: 'international', label: 'International' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'budget', label: 'Budget' },
    { id: 'weekend', label: 'Weekend Trips' },
    { id: 'honeymoon', label: 'Honeymoon' }
  ];

  return (
    <div className="pt-20 min-h-screen pb-20 bg-slate-50">
      {/* Hero Banner */}
      <div className="relative h-64 bg-slate-900 flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80" 
          alt="Explore World" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-heading font-extrabold text-white mb-2">
            Explore The World With Bookaro
          </h1>
          <p className="text-slate-300 text-sm font-body">
            Handpicked premium tour packages tailored for unforgettable memories & maximum savings.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Column */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit">
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-100 mb-6">
              <SlidersHorizontal className="h-5 w-5 text-primary-purple" />
              <h3 className="font-heading font-extrabold text-lg text-darktext">Filters</h3>
            </div>

            {/* Destination Search */}
            <div className="mb-6">
              <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Destination
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary-purple transition-colors"
                />
                {searchQuery && (
                  <button 
                    onClick={() => { setSearchQuery(''); setFilterDestination(''); }} 
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Budget Range */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider">
                  Max Budget
                </label>
                <span className="text-sm font-heading font-bold text-primary-purple">
                  ₹{maxBudget.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-purple"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹5,000</span>
                <span>₹100,000</span>
              </div>
            </div>
          </div>

          {/* Packages Display Column */}
          <div className="lg:col-span-3">
            {/* Category Pills */}
            <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-hide space-x-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-heading font-bold transition-all border ${
                    selectedCategory === cat.id
                      ? 'bg-primary-purple text-white border-primary-purple shadow-md shadow-primary-purple/25'
                      : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Package Cards Grid */}
            {filteredPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPackages.map((pkg) => (
                  <div 
                    key={pkg.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  >
                    {/* Image frame */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-slate-900/65 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-heading font-bold uppercase tracking-wider">
                        {pkg.category}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-heading font-bold text-slate-800">{pkg.rating}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center space-x-1.5 text-xs text-lighttext mb-2">
                        <MapPin className="h-3.5 w-3.5 text-[#1E88E5]" />
                        <span>{pkg.destination}</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>{pkg.duration}</span>
                      </div>

                      <h3 className="font-heading font-extrabold text-lg text-darktext line-clamp-1 mb-2">
                        {pkg.title}
                      </h3>
                      
                      <p className="font-body text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                        {pkg.description}
                      </p>

                      {/* Package highlights bullet lists */}
                      <ul className="mb-6 space-y-1.5 flex-grow">
                        {pkg.highlights.slice(0, 3).map((hl, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-[11px] font-body text-slate-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-pink flex-shrink-0" />
                            <span className="line-clamp-1">{hl}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Price & Action */}
                      <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Price per Person</p>
                          <p className="text-xl font-heading font-extrabold text-primary-purple">
                            ₹{pkg.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedPkg(pkg)}
                          className="bg-[#1E88E5] hover:bg-[#1565C0] text-white px-5 py-2.5 rounded-xl font-heading font-bold text-xs shadow-md shadow-blue-500/10 transition-all transform hover:scale-102"
                        >
                          Book / Enquire
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl">
                <SlidersHorizontal className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                <h3 className="font-heading font-extrabold text-lg text-darktext mb-1">No Packages Match Filters</h3>
                <p className="text-xs text-lighttext">Try resetting your destination search or increasing budget limits.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {selectedPkg && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 relative animate-scale-up">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 relative">
              <button 
                onClick={() => setSelectedPkg(null)}
                className="absolute right-4 top-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-accent-pink">
                Holiday Package Enquiry
              </span>
              <h3 className="font-heading font-extrabold text-lg mt-1 line-clamp-1">
                {selectedPkg.title}
              </h3>
              <p className="text-xs text-slate-300 font-body mt-1">
                Starting at <span className="text-white font-bold">₹{selectedPkg.price.toLocaleString('en-IN')}</span> per person.
              </p>
            </div>

            {/* Modal Body / Form */}
            <div className="p-6">
              {success ? (
                <div className="text-center py-8">
                  <div className="h-12 w-12 bg-green-100 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-6 w-6" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-slate-800 mb-1">Enquiry Submitted!</h4>
                  <p className="text-xs text-lighttext">Our holiday consultant will reach you shortly on WhatsApp/Phone.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-4">
                  <div>
                    <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-purple transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-purple transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-purple transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary-purple to-accent-pink text-white py-3 rounded-xl font-heading font-bold text-sm shadow-md shadow-primary-purple/20 transition-all flex items-center justify-center space-x-2"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Submit Quick Booking</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
