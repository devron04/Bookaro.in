import { Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[600px] lg:h-[80vh] flex flex-col items-center justify-center pt-28 pb-32">
      


      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Boutique Resort" 
          className="w-full h-full object-cover brightness-75"
        />
        {/* Soft gradient from bottom to make search bar stand out */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10" />
      </div>

      {/* Main Content Container (Center Aligned text) */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Slider Controls (Left / Right) */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 border border-white/40 bg-black/20 hover:bg-black/40 backdrop-blur-sm cursor-pointer transition-colors z-30">
          <ChevronLeft className="text-white h-6 w-6" />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 border border-white/40 bg-black/20 hover:bg-black/40 backdrop-blur-sm cursor-pointer transition-colors z-30">
          <ChevronRight className="text-white h-6 w-6" />
        </div>

        {/* Headings in Serif */}
        <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-lg" style={{ fontFamily: '"Playfair Display", "Merriweather", serif' }}>
          Luxury Boutique Resorts
        </h1>
        
        {/* Transparent Button */}
        <button className="border border-white text-white px-8 py-3 text-sm font-semibold tracking-wide hover:bg-white hover:text-black transition-colors backdrop-blur-sm mb-32">
          Explore Villas
        </button>
      </div>

      {/* Floating Search Bar Widget */}
      <div id="search-widget" style={{ scrollMarginTop: '120px' }} className="absolute bottom-0 left-0 right-0 z-30 transform translate-y-1/2 flex justify-center px-4">
        <div className="w-full max-w-6xl bg-white rounded-t-xl md:rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
          {/* Main Input Row */}
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200 p-2 md:p-0">
            
            {/* Location */}
            <div className="flex-1 p-3 md:p-5 hover:bg-slate-50 transition-colors cursor-text group">
              <label className="block text-[11px] font-bold text-slate-800 tracking-wider uppercase mb-1">Location/Villas/Landmark</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="Where To?" 
                  className="w-full outline-none text-slate-600 font-medium placeholder-slate-400 bg-transparent"
                />
              </div>
            </div>

            {/* Check In */}
            <div className="flex-1 p-3 md:p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
              <label className="block text-[11px] font-bold text-slate-800 tracking-wider uppercase mb-1">Check-in</label>
              <div className="flex items-center text-slate-400">
                <span className="font-medium group-hover:text-slate-600 transition-colors">Select Date</span>
              </div>
            </div>

            {/* Check Out */}
            <div className="flex-1 p-3 md:p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
              <label className="block text-[11px] font-bold text-slate-800 tracking-wider uppercase mb-1">Check-out</label>
              <div className="flex items-center text-slate-400">
                <span className="font-medium group-hover:text-slate-600 transition-colors">Select Date</span>
              </div>
            </div>

            {/* Guests & Search Button */}
            <div className="flex-[1.5] p-3 md:p-5 flex items-center justify-between">
              <div>
                <label className="block text-[11px] font-bold text-slate-800 tracking-wider uppercase mb-1">Guests</label>
                <div className="flex items-center text-slate-800">
                  <span className="font-bold text-base">2 Guests , 1+ Rooms</span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/villas')}
                className="bg-black hover:bg-slate-800 text-white font-bold text-sm px-8 py-4 tracking-wide transition-colors"
              >
                SEARCH
              </button>
            </div>
          </div>

          {/* Sub Footer of Search Widget */}
          <div className="bg-[#f9f9f9] border-t border-slate-200 px-6 py-3 flex justify-between items-center text-sm">
            <span className="text-slate-600 font-medium text-xs">Finding your ideal vacation spot should be easy, we're here to help!</span>
            <a href="https://wa.me/918888639634" target="_blank" rel="noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 font-semibold text-xs transition-colors">
              <Phone className="w-3 h-3 mr-1" />
              Request Callback
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
