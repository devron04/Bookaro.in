import { useState } from 'react';
import { Sparkles, Compass, CheckCircle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function AIPlanner() {
  const onAddLead = useAppStore(state => state.addLead);
  // Inputs
  const [departure, setDeparture] = useState('Mumbai');
  const [travelType, setTravelType] = useState('family');
  const [budget, setBudget] = useState(40000);
  const [days, setDays] = useState(4);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // States
  const [isPlanning, setIsPlanning] = useState(false);
  const [planStep, setPlanStep] = useState(0);
  const [itinerary, setItinerary] = useState<any | null>(null);

  // Form lead save state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const planSteps = [
    'Initializing AI recommendation engine...',
    'Scanning live flight availability from Mumbai...',
    'Matching premium hotels under budget constraints...',
    'Synthesizing day-by-day custom itinerary...',
    'Formulating local food & sightseeing recommendations...'
  ];

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlanning(true);
    setPlanStep(0);
    setItinerary(null);
    setIsSaved(false);

    // Step animation loop
    const interval = setInterval(() => {
      setPlanStep(prev => {
        if (prev >= planSteps.length - 1) {
          clearInterval(interval);
          generateMockPlan();
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const generateMockPlan = () => {
    // Determine destination based on budget and type
    let destination = 'Goa';
    let hotelName = 'The Grand Riviera Resort';
    let hotelPrice = 4500;
    let visaRequired = 'Not required (Domestic)';
    let weather = 'Sunny, 28°C - 32°C';
    let flightCost = 5500;
    let images = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';

    if (budget > 75000) {
      destination = 'Maldives';
      hotelName = 'Centara Grand Island Overwater Resort';
      hotelPrice = 22000;
      visaRequired = 'Visa on arrival (Free for Indians)';
      weather = 'Tropical Breeze, 27°C - 30°C';
      flightCost = 28000;
      images = 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80';
    } else if (budget >= 45000) {
      destination = 'Dubai (UAE)';
      hotelName = 'Rove Downtown Dubai';
      hotelPrice = 7500;
      visaRequired = 'Pre-arranged e-Visa required';
      weather = 'Warm & Sunny, 32°C - 36°C';
      flightCost = 18000;
      images = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80';
    } else if (travelType === 'honeymoon') {
      destination = 'Bali';
      hotelName = 'Kayon Jungle Retreat Ubud';
      hotelPrice = 9000;
      visaRequired = 'Visa on arrival (₹3,000)';
      weather = 'Humid & Beautiful, 26°C - 29°C';
      flightCost = 22000;
      images = 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80';
    } else if (budget < 20000) {
      destination = 'Mahabaleshwar';
      hotelName = 'Strawberry Hills Inn';
      hotelPrice = 2800;
      visaRequired = 'Not required (Domestic)';
      weather = 'Pleasant & Cool, 18°C - 24°C';
      flightCost = 800; // Road transport estimate
      images = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80';
    }

    const totalEst = flightCost * adults + hotelPrice * days + 3500 * days; // estimates

    // Day descriptions
    const dayPlans = [
      {
        day: 1,
        title: 'Arrival & Welcome Dinner',
        description: `Arrive at the destination. Airport transfer to ${hotelName}. Evening stroll and candlelight welcome dinner.`,
        activities: ['Check-in & Unwind', 'Sunset View Walk', 'Premium Dinner Reservation']
      },
      {
        day: 2,
        title: 'Local Sightseeing & Core Landmarks',
        description: 'Explore the high-fidelity heritage centers, core scenic spots, and local shopping districts.',
        activities: ['Guided Sightseeing Tour', 'Authentic Local Lunch', 'Art Galleries & Museums']
      },
      {
        day: 3,
        title: 'Adventure & Water Activities',
        description: 'A day filled with adrenaline! Experience the ocean water sports, trekking, or skydecks.',
        activities: ['Water Sports / Skyline decks', 'Local Cafe Crawl', 'Evening Traditional Music Show']
      },
      {
        day: 4,
        title: 'Leisure Day & Departure',
        description: 'Enjoy a leisurely breakfast at the resort. Quick shopping for souvenirs before catching the flight home.',
        activities: ['Resort Pool & Spa', 'Souvenir Shopping', 'Airport Drop-off Transfer']
      }
    ].slice(0, days);

    setItinerary({
      destination,
      hotelName,
      hotelPrice,
      visaRequired,
      weather,
      flightCost,
      totalEst,
      images,
      dayPlans,
      tips: [
        'Book flights at least 15 days in advance for maximum savings.',
        'Keep soft copies of visa/hotel bookings on Google Drive.',
        'Try local street food spots recommended in our custom itinerary handbook.'
      ]
    });
    setIsPlanning(false);
  };

  const handleSaveItinerary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !itinerary) return;

    onAddLead({
      name,
      phone,
      destination: itinerary.destination,
      budget: `₹${budget} Plan`,
      travelDate: 'AI Instant',
      message: `Generated AI Itinerary for ${itinerary.destination}. Days: ${days}. adults: ${adults}, children: ${children}`,
      type: 'ai_planner',
      status: 'new',
      source: `AI Planner: ${itinerary.destination}`
    });

    setIsSaved(true);
  };

  return (
    <div className="pt-20 min-h-screen pb-20 bg-slate-50">
      {/* Banner */}
      <div className="relative h-64 bg-slate-900 flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80" 
          alt="AI Travel" 
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center space-x-1.5 bg-primary-purple/35 border border-primary-purple/40 px-3 py-1 rounded-full text-white text-[10px] font-heading font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-3 w-3 text-accent-pink animate-spin" />
            <span>Next-Gen Travel Planning</span>
          </div>
          <h1 className="text-4xl font-heading font-extrabold text-white mb-2">
            Bookaro AI Travel Planner
          </h1>
          <p className="text-slate-300 text-sm font-body">
            Input your budget & travel details. Watch AI create a beautiful, cost-optimized itinerary in seconds.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inputs Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm sticky top-24">
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-100 mb-6">
                <Sparkles className="h-5 w-5 text-primary-purple" />
                <h3 className="font-heading font-extrabold text-lg text-darktext">Travel Blueprint</h3>
              </div>

              <form onSubmit={handleGeneratePlan} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-heading font-bold text-slate-500 uppercase tracking-wider mb-1.5">Departure City</label>
                  <input
                    type="text"
                    required
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary-purple"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-heading font-bold text-slate-500 uppercase tracking-wider mb-1.5">Travel Type</label>
                  <select
                    value={travelType}
                    onChange={(e) => setTravelType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary-purple"
                  >
                    <option value="family">Family Trip</option>
                    <option value="honeymoon">Honeymoon / Couple</option>
                    <option value="solo">Solo Adventure</option>
                    <option value="friends">Friends Gathering</option>
                    <option value="budget">Backpacker Budget</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-heading font-bold text-slate-500 uppercase tracking-wider mb-1.5">Adults</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-primary-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-heading font-bold text-slate-500 uppercase tracking-wider mb-1.5">Children</label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-primary-purple"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-heading font-bold text-slate-500 uppercase tracking-wider mb-1.5">Duration (Days)</label>
                    <select
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-primary-purple"
                    >
                      {[2, 3, 4, 5, 6, 7].map(d => (
                        <option key={d} value={d}>{d} Days</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-heading font-bold text-slate-500 uppercase tracking-wider mb-1.5">Trip Style</label>
                    <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-[10px] text-center text-primary-purple font-heading font-bold border-dashed border-primary-purple/40">
                      Smart Saving Mode
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] font-heading font-bold text-slate-500 uppercase tracking-wider">Estimated Budget Limit</label>
                    <span className="text-xs font-heading font-extrabold text-primary-purple">₹{budget.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="150000"
                    step="5000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-purple"
                  />
                  <div className="flex justify-between text-[8px] text-slate-400">
                    <span>₹10,000</span>
                    <span>₹150,000</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPlanning}
                  className="w-full bg-gradient-to-r from-primary-purple via-[#d946ef] to-accent-pink hover:from-primary-purple hover:to-accent-pink text-white py-3 rounded-xl font-heading font-bold text-xs shadow-md shadow-primary-purple/20 transition-all flex items-center justify-center space-x-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{isPlanning ? 'Analyzing data...' : 'Generate AI Plan'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Output Display Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Loading Indicator */}
            {isPlanning && (
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md text-center py-16 space-y-6 animate-pulse">
                <div className="h-16 w-16 bg-purple-50 text-primary-purple rounded-full flex items-center justify-center mx-auto mb-4 border border-primary-purple/10">
                  <Sparkles className="h-8 w-8 text-primary-purple animate-spin" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-slate-800">Bookaro AI Engine is Thinking</h3>
                  <p className="text-xs text-lighttext mt-1">Applying global destination pricing databases & local transport models.</p>
                </div>

                {/* Progress bar and step text */}
                <div className="max-w-xs mx-auto space-y-2">
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary-purple h-full transition-all duration-300"
                      style={{ width: `${((planStep + 1) / planSteps.length) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-primary-purple font-heading font-bold uppercase tracking-wider animate-bounce">
                    {planSteps[planStep]}
                  </p>
                </div>
              </div>
            )}

            {/* Generated Itinerary Output Dashboard */}
            {itinerary && !isPlanning && (
              <div className="space-y-6 animate-scale-up">
                
                {/* Result header */}
                <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md">
                  <div className="relative h-48 sm:h-56">
                    <img src={itinerary.images} alt={itinerary.destination} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="bg-[#1E88E5] px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest">
                        AI Recommended Destination
                      </span>
                      <h2 className="font-heading font-extrabold text-3xl mt-1">
                        {itinerary.destination}
                      </h2>
                    </div>
                  </div>

                  {/* Summary grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-slate-50 border-t border-slate-100">
                    <div>
                      <p className="text-[9px] text-slate-400 font-heading font-semibold uppercase tracking-wider">Est Total Cost</p>
                      <p className="text-base font-heading font-extrabold text-primary-purple mt-0.5">₹{itinerary.totalEst.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-heading font-semibold uppercase tracking-wider">Visa Requirement</p>
                      <p className="text-[10px] font-heading font-bold text-slate-800 mt-0.5 leading-tight">{itinerary.visaRequired}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-heading font-semibold uppercase tracking-wider">Avg Weather</p>
                      <p className="text-xs font-heading font-bold text-slate-800 mt-0.5">{itinerary.weather}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-heading font-semibold uppercase tracking-wider">Accommodation</p>
                      <p className="text-[10px] font-heading font-bold text-[#10B981] mt-0.5 line-clamp-1">{itinerary.hotelName}</p>
                    </div>
                  </div>
                </div>

                {/* Day Wise Itinerary */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md">
                  <h3 className="font-heading font-extrabold text-lg text-darktext mb-6 flex items-center space-x-2">
                    <Compass className="h-5 w-5 text-primary-purple" />
                    <span>Day-by-Day Master Itinerary</span>
                  </h3>

                  <div className="relative border-l border-slate-100 pl-6 ml-3 space-y-6">
                    {itinerary.dayPlans.map((day: any) => (
                      <div key={day.day} className="relative">
                        {/* Bullet pin */}
                        <div className="absolute -left-[35px] top-1.5 h-[18px] w-[18px] bg-white border-2 border-primary-purple rounded-full flex items-center justify-center">
                          <span className="text-[8px] font-heading font-extrabold text-primary-purple">{day.day}</span>
                        </div>

                        <div>
                          <h4 className="font-heading font-extrabold text-sm text-slate-800">
                            Day {day.day}: {day.title}
                          </h4>
                          <p className="font-body text-xs text-slate-500 mt-1 leading-relaxed">
                            {day.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {day.activities.map((act: string, aIdx: number) => (
                              <span 
                                key={aIdx} 
                                className="bg-slate-50 text-slate-605 text-[9px] font-heading font-semibold px-2 py-0.5 rounded-md border border-slate-100"
                              >
                                {act}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Travel & Cost savings tip */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md">
                  <h3 className="font-heading font-extrabold text-lg text-darktext mb-4">Smart Travel Tips</h3>
                  <ul className="space-y-3">
                    {itinerary.tips.map((tip: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-slate-655 font-body">
                        <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lead Lock/Save Widget */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-md border border-white/5">
                  <div className="flex items-start space-x-3 mb-6">
                    <Sparkles className="h-6 w-6 text-accent-pink flex-shrink-0 animate-pulse" />
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white">Unlock Live Flight Bookings & Partner Rates</h4>
                      <p className="text-[11px] text-slate-400 font-body leading-relaxed mt-0.5">
                        Save this generated AI plan. Our travel consultants in Ambernath will lock the best discount codes and call you.
                      </p>
                    </div>
                  </div>

                  {isSaved ? (
                    <div className="text-center py-4 bg-white/5 border border-white/10 rounded-2xl">
                      <p className="text-xs text-[#10B981] font-heading font-bold flex items-center justify-center space-x-1.5">
                        <CheckCircle className="h-4 w-4" />
                        <span>Itinerary Saved & Synced with Admin Panel!</span>
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveItinerary} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary-purple"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="WhatsApp / Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary-purple"
                      />
                      <button
                        type="submit"
                        className="bg-primary-purple hover:bg-primary-dark text-white rounded-xl text-xs font-heading font-bold py-2.5 transition-all shadow-md"
                      >
                        Lock Discount Deals
                      </button>
                    </form>
                  )}
                </div>

              </div>
            )}

            {/* Empty state */}
            {!itinerary && !isPlanning && (
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md text-center py-20 space-y-4">
                <Sparkles className="h-12 w-12 text-slate-350 mx-auto" />
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-darktext">Your Travel Plan Awaits</h3>
                  <p className="text-xs text-lighttext mt-1">Select your departure city, travel type, and approximate budget on the left to start.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
