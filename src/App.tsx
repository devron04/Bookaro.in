import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Trending from './components/Trending';
import WhyBookaro from './components/WhyBookaro';
import Packages from './components/Packages';
import BookaroStays from './components/BookaroStays';
import VisaServices from './components/VisaServices';
import AIPlanner from './components/AIPlanner';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

import { initialLeads } from './mockData';
import type { Lead } from './mockData';
import { ShieldCheck, X, Sparkles, Star } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [filterDestination, setFilterDestination] = useState<string>('');
  
  // Leads Database State (Real-time in-memory simulation)
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('bookaro_leads');
    return saved ? JSON.parse(saved) : initialLeads;
  });

  // Floating live lead toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('bookaro_leads', JSON.stringify(leads));
  }, [leads]);

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleAddLead = (newLeadData: Omit<Lead, 'id' | 'timestamp'>) => {
    const freshLead: Lead = {
      ...newLeadData,
      id: `ld-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };

    setLeads(prev => [freshLead, ...prev]);
    setToastMsg(`Success! Saved Lead for ${freshLead.name}. Checked in Admin Console.`);

    setTimeout(() => {
      setToastMsg(null);
    }, 4500);
  };

  const handleChangeLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const handleDeleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  // Render Page Selection
  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="space-y-0">
            <Hero setCurrentPage={setCurrentPage} />
            <Stats />
            
            {/* AI Travel Planner Preview Segment */}
            <section className="py-20 bg-white border-y border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="font-heading font-extrabold text-xs tracking-widest text-primary-purple uppercase block mb-2">
                      Bookaro's Flagship Innovation
                    </span>
                    <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-darktext tracking-tight mb-4">
                      Get a Fully Tailored Travel Plan in Seconds
                    </h2>
                    <p className="font-body text-slate-500 text-sm leading-relaxed mb-6">
                      Ditch generic tours. Our smart AI Travel Planner scans global prices, weather indexes, and optimal routes to generate full daily itineraries custom-fit to your specific pocket size and style.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="h-6 w-6 rounded-full bg-purple-50 flex items-center justify-center text-primary-purple flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold font-heading">1</span>
                        </div>
                        <p className="text-xs text-slate-650 font-body">Choose destination, style, departure and party size.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="h-6 w-6 rounded-full bg-purple-50 flex items-center justify-center text-primary-purple flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold font-heading">2</span>
                        </div>
                        <p className="text-xs text-slate-650 font-body">Set budget limits to dynamically match hotels and activities.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="h-6 w-6 rounded-full bg-purple-50 flex items-center justify-center text-primary-purple flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold font-heading">3</span>
                        </div>
                        <p className="text-xs text-slate-650 font-body">Lock in curated member discounts instantly via WhatsApp.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentPage('planner')}
                      className="mt-8 bg-primary-purple hover:bg-primary-dark text-white px-6 py-3 rounded-full text-xs font-heading font-bold shadow-md shadow-primary-purple/20 transition-all flex items-center space-x-2"
                    >
                      <Sparkles className="h-4 w-4 text-accent-pink" />
                      <span>Try AI Travel Planner</span>
                    </button>
                  </div>

                  <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-slate-800 text-slate-100">
                    {/* Glass visual planner preview */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-purple/20 rounded-full blur-2xl pointer-events-none" />
                    <h3 className="font-heading font-bold text-sm text-white mb-4">AI Travel Preview Board</h3>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 space-y-2 text-xs">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-slate-400">Destination</span>
                        <span className="font-bold text-[#1E88E5]">Goa Escape</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-slate-400">Est Hotel Stay</span>
                        <span className="font-bold text-white">4-Star Beachside Resort</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Budget Plan</span>
                        <span className="font-bold text-success-green">₹16,400 per traveler</span>
                      </div>
                    </div>

                    <div className="relative border-l border-white/10 pl-4 space-y-3">
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary-purple" />
                        <p className="text-[10px] font-bold text-white">Day 1: Arrival & Sunset Boating</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-slate-700" />
                        <p className="text-[10px] font-bold text-slate-400">Day 2: Scuba Diving & Water Sports</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Trending setCurrentPage={setCurrentPage} setFilterDestination={setFilterDestination} />
            <WhyBookaro />

            {/* Premium Testimonials Section */}
            <section className="py-20 bg-slate-50 border-t border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="font-heading font-extrabold text-xs tracking-widest text-primary-purple uppercase block mb-2">
                    Verified Customer Stories
                  </span>
                  <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-darktext tracking-tight">
                    What Our Travelers Say
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <p className="font-body text-xs text-slate-550 leading-relaxed italic">
                      "I was skeptical about AI planning tools, but Bookaro blew me away. In 20 seconds it gave a Bali honeymooon plan that fit exactly under our budget limit. The villa stay was phenomenal!"
                    </p>
                    <div>
                      <p className="font-heading font-bold text-sm text-slate-800">Prasad K. (Ambernath)</p>
                      <p className="text-[10px] text-lighttext">Traveled to Bali (7 Days)</p>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <p className="font-body text-xs text-slate-550 leading-relaxed italic">
                      "Highly professional visa support. They took care of every document requirement for Dubai and processed our entry within 3 working days. Recommend 10/10."
                    </p>
                    <div>
                      <p className="font-heading font-bold text-sm text-slate-800">Manpreet S. (Ulhasnagar)</p>
                      <p className="text-[10px] text-lighttext">Visa Assistance (Dubai UAE)</p>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <p className="font-body text-xs text-slate-550 leading-relaxed italic">
                      "Royal Crest villa stay in Lonavala booked via BookaroStays was top-tier. Clean pools, responsive caretaker, and great rates. Perfect weekend spot!"
                    </p>
                    <div>
                      <p className="font-heading font-bold text-sm text-slate-800">Siddharth N. (Mumbai)</p>
                      <p className="text-[10px] text-lighttext">BookaroStays (Lonavala Villa)</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Bottom Call to Action Section */}
            <section className="py-20 bg-[#C218D4] relative overflow-hidden text-center text-white">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-purple to-accent-pink opacity-80" />
                <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
              </div>

              <div className="relative z-10 max-w-4xl mx-auto px-4">
                <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-6">
                  Ready For Your Next Trip?
                </h2>
                <p className="text-slate-100 text-sm sm:text-base font-body max-w-xl mx-auto leading-relaxed mb-8">
                  Get premium hotel bookings, verify luxury stays availability, or get custom automated travel planning in minutes.
                </p>
                <button
                  onClick={() => setCurrentPage('planner')}
                  className="bg-white hover:bg-slate-50 text-primary-purple font-heading font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-black/10 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Plan My Trip
                </button>
              </div>
            </section>
          </div>
        );
      case 'packages':
        return (
          <Packages 
            onAddLead={handleAddLead} 
            filterDestination={filterDestination} 
            setFilterDestination={setFilterDestination} 
          />
        );
      case 'stays':
        return <BookaroStays onAddLead={handleAddLead} />;
      case 'visa':
        return <VisaServices onAddLead={handleAddLead} />;
      case 'planner':
        return <AIPlanner onAddLead={handleAddLead} />;
      case 'contact':
        return <Contact onAddLead={handleAddLead} />;
      case 'admin':
        return (
          <AdminDashboard 
            leads={leads} 
            onChangeLeadStatus={handleChangeLeadStatus} 
            onDeleteLead={handleDeleteLead} 
          />
        );
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body bg-[#F8FAFC]">
      {/* Sleek Navigation Bar */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Active Page Viewport */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      {/* Trust-Building Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Floating Global Glassmorphism Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel border border-[#10B981]/40 rounded-3xl p-4 shadow-2xl max-w-sm flex items-start space-x-3.5 animate-scale-up">
          <div className="h-10 w-10 rounded-2xl bg-green-50 text-[#10B981] flex items-center justify-center flex-shrink-0 border border-[#10B981]/10">
            <ShieldCheck className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex justify-between items-start">
              <h5 className="font-heading font-bold text-xs text-slate-800">Lead Registered Live</h5>
              <button 
                onClick={() => setToastMsg(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors -mt-0.5 ml-2"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-slate-500 font-body leading-relaxed mt-1">
              {toastMsg}
            </p>
            <button 
              onClick={() => setCurrentPage('admin')}
              className="text-[9px] font-heading font-bold text-trust-blue hover:underline mt-1.5 block"
            >
              View Admin Board &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
