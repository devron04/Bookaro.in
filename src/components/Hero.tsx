import { Sparkles, Phone, ArrowRight } from 'lucide-react';

interface HeroProps {
  setCurrentPage: (page: string) => void;
}

export default function Hero({ setCurrentPage }: HeroProps) {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
      {/* Immersive Background Images with smooth modern parallax gradient cover */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80" 
          alt="Immersive Travel Landscape" 
          className="w-full h-full object-cover opacity-35 scale-105 animate-glow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/40 z-10" />
      </div>

      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-trust-blue/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        {/* Floating AI badge */}
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6 transform hover:scale-105 transition-all">
          <Sparkles className="h-4 w-4 text-accent-pink animate-spin" style={{ animationDuration: '3s' }} />
          <span className="text-white font-heading text-xs font-semibold tracking-wider uppercase">
            Bookaro AI Engine v2.0 Live
          </span>
        </div>

        {/* Headings */}
        <h1 className="font-heading font-extrabold text-5xl md:text-7xl text-white tracking-tight mb-6">
          Book <span className="bg-gradient-to-r from-primary-purple to-accent-pink bg-clip-text text-transparent">Smarter.</span><br className="sm:hidden" />
          {' '}Travel <span className="bg-gradient-to-r from-[#38bdf8] to-trust-blue bg-clip-text text-transparent">Better.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 font-body font-light leading-relaxed mb-10">
          Unlock personalized AI-powered travel itineraries, verify luxury villa availability, and secure hassle-free global visas with the region's smartest travel platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => setCurrentPage('planner')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-purple via-[#d946ef] to-accent-pink hover:from-primary-purple hover:to-accent-pink text-white px-8 py-4 rounded-full font-heading font-bold text-base shadow-xl shadow-primary-purple/30 transform hover:-translate-y-1 hover:scale-102 transition-all duration-200"
          >
            <Sparkles className="h-5 w-5" />
            <span>Plan My Trip</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          
          <a
            href="https://wa.me/918888639634?text=Hi%20Bookaro,%20I'm%20interested%20in%20planning%20a%20trip!"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-4 rounded-full font-heading font-bold text-base backdrop-blur-md transform hover:-translate-y-1 transition-all duration-200"
          >
            <Phone className="h-4 w-4 text-[#25D366]" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Quick Search Preview Glass Panel */}
        <div className="max-w-4xl mx-auto glass-panel-dark p-6 sm:p-8 rounded-3xl shadow-2xl text-left border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Input 1 */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Departure City</label>
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-medium">
                Mumbai (BOM)
              </div>
            </div>
            {/* Input 2 */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Where To?</label>
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-400 text-sm font-medium">
                Goa, Bali, Dubai...
              </div>
            </div>
            {/* Input 3 */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Duration</label>
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-medium">
                5 Days
              </div>
            </div>
            {/* CTA inside search */}
            <button
              onClick={() => setCurrentPage('planner')}
              className="w-full bg-[#1E88E5] hover:bg-[#1565C0] text-white py-3 px-6 rounded-xl font-heading font-bold text-sm text-center shadow-lg shadow-blue-500/20 transition-all transform hover:scale-102 flex items-center justify-center space-x-2 mt-4 md:mt-0"
            >
              <span>Search Destination</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
