import { Mountain, Tent, Trees, Train, Palmtree, Castle, Ship, Sun, Car, Wind, Home, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const destinations = [
  { name: 'Lonavala', icon: Mountain },
  { name: 'Karjat', icon: Tent },
  { name: 'Kasauli', icon: Trees },
  { name: 'Ooty', icon: Train },
  { name: 'Mussoorie', icon: Mountain },
  { name: 'Panchgani', icon: Wind },
  { name: 'Udaipur', icon: Castle },
  { name: 'Nainital', icon: Ship },
  { name: 'Goa', icon: Sun },
  { name: 'Alibaug', icon: Palmtree },
  { name: 'Manali', icon: Home }, // cable car replacement
  { name: 'Coorg', icon: Trees },
  { name: 'Nashik', icon: Castle },
  { name: 'Jaipur', icon: Castle },
  { name: 'Alleppey', icon: Ship },
  { name: 'Wayanad', icon: Car },
];

export default function DestinationsGrid() {
  return (
    <section className="py-16 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-0">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-baseline mb-10 space-y-2 md:space-y-0">
        <h2 className="text-2xl font-bold text-slate-900 mr-4 font-body">Pick a Destination</h2>
        <button className="flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors group">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="underline decoration-slate-300 group-hover:decoration-slate-800 underline-offset-4">Show nearby locations</span>
        </button>
      </div>

      {/* Grid Carousel Container */}
      <div className="relative group">
        {/* Left Arrow */}
        <button className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white border border-slate-200 shadow-sm rounded hover:bg-slate-50 z-10 hidden md:flex">
          <ChevronLeft className="h-4 w-4 text-slate-600" />
        </button>

        {/* Grid Items */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-y-12 gap-x-4">
          {destinations.map((dest, idx) => {
            const Icon = dest.icon;
            return (
              <div key={idx} className="flex flex-col items-center justify-center cursor-pointer group/item">
                {/* Icon Container with Blob */}
                <div className="relative w-16 h-16 flex items-center justify-center mb-3">
                  {/* Pastel Blob (CSS Shape) */}
                  <div className="absolute inset-0 bg-[#fde9df] rounded-br-[2rem] rounded-tl-[2rem] rounded-tr-md rounded-bl-md opacity-60 scale-75 group-hover/item:scale-90 transition-transform duration-300 transform -rotate-12 translate-x-2 translate-y-1" />
                  
                  {/* The Icon */}
                  <Icon className="relative z-10 h-8 w-8 text-slate-800 stroke-[1.5px]" />
                </div>
                {/* Label */}
                <span className="text-[13px] font-medium text-slate-700 group-hover/item:text-black transition-colors">{dest.name}</span>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white border border-slate-200 shadow-sm rounded hover:bg-slate-50 z-10 hidden md:flex">
          <ChevronRight className="h-4 w-4 text-slate-600" />
        </button>
      </div>

      {/* Scroll indicator bar at bottom */}
      <div className="flex justify-center mt-12">
        <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-slate-400 rounded-full" />
        </div>
      </div>

    </section>
  );
}
