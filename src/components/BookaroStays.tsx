import { useState } from 'react';
import { MapPin, Users, Bed, Star, X, Check, Phone } from 'lucide-react';
import { villasData } from '../mockData';
import type { Villa, Lead } from '../mockData';

interface BookaroStaysProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'timestamp'>) => void;
}

export default function BookaroStays({ onAddLead }: BookaroStaysProps) {
  const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
  
  // Lead Booking State
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guestsCount, setGuestsCount] = useState('4');
  const [checkInDate, setCheckInDate] = useState('');
  const [success, setSuccess] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !selectedVilla) return;

    onAddLead({
      name,
      phone,
      destination: `${selectedVilla.name} (${selectedVilla.location})`,
      budget: `₹${selectedVilla.pricePerNight * 2} (Est 2 Nights)`,
      travelDate: checkInDate,
      message: `Guests: ${guestsCount}. Enquiry for ${selectedVilla.name}.`,
      type: 'villa',
      status: 'hot',
      source: `Villa Stay: ${selectedVilla.name}`
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowBookingForm(false);
      setSelectedVilla(null);
      setName('');
      setPhone('');
      setGuestsCount('4');
      setCheckInDate('');
    }, 2000);
  };

  const getWhatsAppLink = (villaName: string) => {
    const text = encodeURIComponent(`Hi Bookaro! I am interested in booking "${villaName}". Please let me know the availability and rates.`);
    return `https://wa.me/918888639634?text=${text}`;
  };

  return (
    <div className="pt-20 min-h-screen pb-20 bg-slate-50">
      {/* Hero Banner */}
      <div className="relative h-64 bg-slate-900 flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80" 
          alt="Luxury Villa" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-heading font-extrabold text-white mb-2">
            BookaroStays
          </h1>
          <p className="text-slate-300 text-sm font-body">
            Handpicked Luxury Villas & Premium Stays in Maharashtra and beyond.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="font-heading font-bold text-xs text-primary-purple tracking-widest uppercase block mb-1">
            Private Pool & Riverside Escapes
          </span>
          <h2 className="font-heading font-extrabold text-3xl text-darktext tracking-tight">
            Premium Handpicked Villas
          </h2>
          <p className="text-xs text-lighttext mt-2 font-body">
            Fully vetted properties with absolute privacy, 24/7 caretakers, and guaranteed hygiene.
          </p>
        </div>

        {/* Villa Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villasData.map((villa) => (
            <div 
              key={villa.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Frame */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={villa.images[0]} 
                  alt={villa.name} 
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                />
                
                {/* Availability Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-[10px] font-heading font-bold uppercase tracking-wider ${
                  villa.availability === 'Available' ? 'bg-[#10B981]' : 
                  villa.availability === 'Filling Fast' ? 'bg-orange-500' : 'bg-slate-500'
                }`}>
                  {villa.availability}
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-heading font-bold text-slate-800">{villa.rating}</span>
                </div>
              </div>

              {/* Villa Info */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-1 text-xs text-slate-400 mb-2">
                  <MapPin className="h-3.5 w-3.5 text-trust-blue" />
                  <span>{villa.location}</span>
                </div>

                <h3 className="font-heading font-extrabold text-xl text-darktext line-clamp-1 mb-3">
                  {villa.name}
                </h3>

                {/* Specs */}
                <div className="flex items-center space-x-4 mb-4 text-xs font-heading text-slate-600 bg-slate-50 p-3 rounded-2xl">
                  <div className="flex items-center space-x-1">
                    <Bed className="h-4 w-4 text-primary-purple" />
                    <span>{villa.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-accent-pink" />
                    <span>Up to {villa.maxGuests} Guests</span>
                  </div>
                </div>

                {/* Amenities checklist */}
                <div className="flex flex-wrap gap-1.5 mb-6 flex-grow">
                  {villa.amenities.slice(0, 3).map((amenity, idx) => (
                    <span 
                      key={idx}
                      className="bg-purple-50 text-primary-purple text-[10px] font-heading font-semibold px-2.5 py-1 rounded-md"
                    >
                      {amenity}
                    </span>
                  ))}
                  {villa.amenities.length > 3 && (
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-heading font-semibold px-2.5 py-1 rounded-md">
                      +{villa.amenities.length - 3} More
                    </span>
                  )}
                </div>

                {/* Pricing & Booking */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Price / Night</p>
                    <p className="text-xl font-heading font-extrabold text-primary-purple">
                      ₹{villa.pricePerNight.toLocaleString('en-IN')}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedVilla(villa);
                      setShowBookingForm(false);
                    }}
                    className="bg-primary-purple hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-heading font-bold text-xs transition-all shadow-md shadow-primary-purple/10 transform hover:scale-102"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Villa Details & Booking Slider Modal */}
      {selectedVilla && (
        <div className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-100 relative animate-scale-up my-8">
            
            {/* Header / Gallery */}
            <div className="relative h-64 sm:h-80 bg-slate-900">
              <img 
                src={selectedVilla.images[0]} 
                alt={selectedVilla.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              
              <button 
                onClick={() => setSelectedVilla(null)}
                className="absolute right-4 top-4 p-2.5 rounded-full bg-slate-950/40 hover:bg-slate-950/60 text-white transition-colors z-20"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-[#10B981] px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider">
                  Verified Property
                </span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl mt-2">
                  {selectedVilla.name}
                </h3>
                <p className="flex items-center space-x-1 text-xs text-slate-300 mt-1 font-body">
                  <MapPin className="h-3.5 w-3.5 text-[#38bdf8]" />
                  <span>{selectedVilla.location}</span>
                </p>
              </div>
            </div>

            {/* Content Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 sm:p-8">
              
              {/* Left Column: Details */}
              <div className="md:col-span-3 space-y-6">
                
                {/* Description */}
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-500 uppercase tracking-widest mb-2">Description</h4>
                  <p className="font-body text-slate-600 text-sm leading-relaxed">
                    {selectedVilla.description}
                  </p>
                </div>

                {/* Amenities grid */}
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-500 uppercase tracking-widest mb-3">Premium Amenities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedVilla.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700 font-body">
                        <Check className="h-4 w-4 text-[#10B981] flex-shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attractions & Locations */}
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <h4 className="font-heading font-bold text-xs text-slate-500 uppercase tracking-widest mb-3">Nearby Attractions</h4>
                  <ul className="space-y-2">
                    {selectedVilla.nearbyAttractions.map((attr, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-center space-x-2 font-body">
                        <span className="h-2 w-2 rounded-full bg-trust-blue flex-shrink-0" />
                        <span>{attr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Checkout Widget */}
              <div className="md:col-span-2">
                <div className="border border-slate-100 rounded-3xl p-6 shadow-sm bg-slate-50 space-y-4">
                  {!showBookingForm ? (
                    <>
                      <div>
                        <p className="text-xs text-slate-400 font-heading font-bold uppercase tracking-wider">Best Villa Deal</p>
                        <p className="text-2xl font-heading font-extrabold text-primary-purple">
                          ₹{selectedVilla.pricePerNight.toLocaleString('en-IN')} 
                          <span className="text-xs font-body font-normal text-lighttext"> / night</span>
                        </p>
                        <p className="text-[10px] text-slate-400 font-body mt-1">Excludes GST. Free cancellation up to 48 hrs.</p>
                      </div>

                      <div className="border-t border-slate-200 pt-4 space-y-2">
                        <button
                          onClick={() => setShowBookingForm(true)}
                          className="w-full bg-primary-purple hover:bg-primary-dark text-white py-3 rounded-xl font-heading font-bold text-sm shadow-md shadow-primary-purple/10 transition-all flex items-center justify-center space-x-2"
                        >
                          <span>Enquire / Book Stay</span>
                        </button>
                        
                        <a
                          href={getWhatsAppLink(selectedVilla.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded-xl font-heading font-bold text-sm shadow-md shadow-green-500/10 transition-all flex items-center justify-center space-x-2"
                        >
                          <Phone className="h-4 w-4" />
                          <span>WhatsApp Enquiry</span>
                        </a>
                      </div>
                    </>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <span className="text-xs font-heading font-bold text-slate-700">Villa Booking</span>
                        <button 
                          type="button" 
                          onClick={() => setShowBookingForm(false)} 
                          className="text-xs text-primary-purple hover:underline"
                        >
                          Go Back
                        </button>
                      </div>

                      {success ? (
                        <div className="text-center py-4 space-y-2">
                          <div className="h-8 w-8 bg-green-100 text-[#10B981] rounded-full flex items-center justify-center mx-auto">
                            <Check className="h-5 w-5" />
                          </div>
                          <p className="text-xs font-bold text-slate-800">Booking Requested!</p>
                          <p className="text-[10px] text-lighttext">We will check availability & ping on WhatsApp.</p>
                        </div>
                      ) : (
                        <>
                          <div>
                            <label className="block text-[10px] font-heading font-semibold text-slate-500 uppercase tracking-wider mb-1">Name</label>
                            <input
                              type="text"
                              required
                              placeholder="Your full name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-primary-purple"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-heading font-semibold text-slate-500 uppercase tracking-wider mb-1">WhatsApp / Phone</label>
                            <input
                              type="tel"
                              required
                              placeholder="WhatsApp number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-primary-purple"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-heading font-semibold text-slate-500 uppercase tracking-wider mb-1">Guests</label>
                              <select
                                value={guestsCount}
                                onChange={(e) => setGuestsCount(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-primary-purple"
                              >
                                {[4, 6, 8, 10, 12, 15].map(n => (
                                  <option key={n} value={n}>{n} Guests</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] font-heading font-semibold text-slate-500 uppercase tracking-wider mb-1">Check In</label>
                              <input
                                type="date"
                                required
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-primary-purple"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary-purple to-accent-pink text-white py-2.5 rounded-xl font-heading font-bold text-xs shadow-md mt-2"
                          >
                            Send Request
                          </button>
                        </>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
