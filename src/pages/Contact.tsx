import { useState } from 'react';
import { Phone, Mail, MapPin, Check, Send } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function Contact() {
  const onAddLead = useAppStore(state => state.addLead);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('₹20,000 - ₹40,000');
  const [travelDate, setTravelDate] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onAddLead({
      name,
      phone,
      email,
      destination,
      budget,
      travelDate,
      message,
      type: 'general',
      status: 'new',
      source: 'Contact Smart Form'
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setName('');
      setPhone('');
      setEmail('');
      setDestination('');
      setTravelDate('');
      setMessage('');
    }, 2500);
  };

  return (
    <div className="pt-20 min-h-screen pb-20 bg-slate-50">
      
      {/* Banner */}
      <div className="relative h-64 bg-slate-900 flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80" 
          alt="Contact Us" 
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-heading font-extrabold text-white mb-2">
            Let's Plan Your Next Adventure
          </h1>
          <p className="text-slate-300 text-sm font-body">
            Get in touch with Bookaro's travel consultants. Instant response & maximum savings guaranteed.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Info */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick stats / options */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-heading font-extrabold text-xl text-darktext mb-4">Connect Directly</h3>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-50 text-primary-purple rounded-2xl flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-slate-400 uppercase tracking-wider">Call / WhatsApp</h4>
                  <p className="font-heading font-extrabold text-sm text-slate-800 mt-1">+91 88886 39634 / +91 93200 04200</p>
                  <p className="text-[10px] text-lighttext mt-0.5">Quick support 10:00 AM to 8:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 text-trust-blue rounded-2xl flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-slate-400 uppercase tracking-wider">Email Inquiry</h4>
                  <p className="font-heading font-extrabold text-sm text-slate-800 mt-1">info@bookaro.in / bookaro.in@gmail.com</p>
                  <p className="text-[10px] text-lighttext mt-0.5">Response within 3 working hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 text-success-green rounded-2xl flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-slate-400 uppercase tracking-wider">Office Location</h4>
                  <p className="font-body text-xs text-slate-600 mt-1 leading-relaxed">
                    Shop No. 34, GNP Galaxy Phase 1, Ambernath - 421501
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Mock container */}
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm overflow-hidden h-60 relative">
              <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80" 
                  alt="Maps Placeholder" 
                  className="w-full h-full object-cover opacity-60 filter blur-xs"
                />
                <div className="absolute inset-0 bg-slate-900/10" />
                
                {/* Center marker glass card */}
                <div className="glass-panel p-4 rounded-2xl text-center shadow-lg max-w-[80%] border border-slate-200">
                  <MapPin className="h-7 w-7 text-primary-purple mx-auto mb-1 animate-bounce" />
                  <p className="font-heading font-bold text-xs text-darktext">Bookaro HQ</p>
                  <p className="text-[10px] text-lighttext">Ambernath (E), MH</p>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: Smart Enquiry Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <div>
                <span className="font-heading font-bold text-xs text-primary-purple tracking-widest uppercase block mb-1">
                  Custom Holiday Quote
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-darktext">
                  Smart Enquiry Form
                </h3>
              </div>

              {success ? (
                <div className="text-center py-16 space-y-4">
                  <div className="h-14 w-14 bg-green-100 text-[#10B981] rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xl text-slate-800">Details Captured!</h4>
                    <p className="text-xs text-lighttext mt-1">Check the **Admin Leads** dashboard in the navbar to see it log live!</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary-purple"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="WhatsApp / Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary-purple"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary-purple"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Where do you want to go?
                      </label>
                      <input
                        type="text"
                        placeholder="Goa, Dubai, Bali..."
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary-purple"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Budget Range
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary-purple"
                      >
                        <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000 (Weekend Getaways)</option>
                        <option value="₹20,000 - ₹40,000">₹20,000 - ₹40,000 (Mid budget)</option>
                        <option value="₹40,000 - ₹75,000">₹40,000 - ₹75,000 (International Economy)</option>
                        <option value="₹75,000+">₹75,000+ (Luxury & Long Stays)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Expected Travel Date
                      </label>
                      <input
                        type="date"
                        required
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary-purple"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Custom Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Add any specific guidelines, kids count, flight requirements, etc..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary-purple resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-purple to-accent-pink text-white py-3 rounded-xl font-heading font-bold text-xs shadow-md shadow-primary-purple/20 transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Enquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
