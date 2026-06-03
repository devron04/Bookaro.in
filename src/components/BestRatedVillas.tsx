import { useState } from 'react';
import { Star, Heart, MapPin, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const filters = ['All', 'Lonavala', 'Alibaug', 'Shimla', 'Manali', 'Coorg', 'Explore more'];

const villas = [
  {
    id: 1,
    name: 'Coffee & Mist',
    location: 'Coorg, Karnataka',
    details: 'Upto 15 Guests + 5 Rooms + 5 Baths',
    price: '₹57,740',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    isBestRated: true,
  },
  {
    id: 2,
    name: 'Vista Serene',
    location: 'Karjat, Maharashtra',
    details: 'Upto 10 Guests + 3 Rooms + 3 Baths',
    price: '₹17,304',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    isBestRated: true,
  },
  {
    id: 3,
    name: 'Princess Vista - Pawna',
    location: 'Lonavala, Maharashtra',
    details: 'Upto 9 Guests + 3 Rooms + 4 Baths',
    price: '₹23,117',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    isBestRated: false,
  },
  {
    id: 4,
    name: 'Bungalow 89',
    location: 'Lonavala, Maharashtra',
    details: 'Upto 12 Guests + 4 Rooms + 4 Baths',
    price: '₹18,139',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    isBestRated: true,
  }
];

export default function BestRatedVillas() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <section className="py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="text-3xl font-bold text-slate-900 mb-6 font-body tracking-tight">Best Rated Villas</h2>

        {/* Filters */}
        <div className="flex overflow-x-auto hide-scrollbar space-x-3 mb-8 pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-6 py-2 rounded text-sm font-semibold border transition-colors ${
                activeFilter === filter
                  ? 'bg-blue-50 text-blue-600 border-blue-400'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          
          {/* Left Arrow */}
          <button className="absolute -left-5 top-[40%] -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white border border-slate-200 shadow-sm hover:shadow-md rounded z-10 hidden lg:flex">
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          </button>

          {/* Villa Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {villas.map((villa) => (
              <div key={villa.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow duration-300 flex flex-col group cursor-pointer">
                
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img 
                    src={villa.image} 
                    alt={villa.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Top Left Rating Badge */}
                  <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg text-[13px] font-bold text-slate-800 flex items-center shadow-sm">
                    {villa.rating} <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 ml-1" />
                  </div>

                  {/* Top Right Heart Badge */}
                  <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-slate-50 transition-colors">
                    <Heart className="h-4 w-4 text-slate-400" />
                  </button>

                  {/* Bottom Right Best Rated Badge */}
                  {villa.isBestRated && (
                    <div className="absolute bottom-0 right-0 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1.5 flex items-center rounded-tl-lg">
                      <Star className="h-3 w-3 text-[#d4af37] fill-[#d4af37] mr-1.5" />
                      Best Rated
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-slate-900 text-lg mb-1 truncate">{villa.name}</h3>
                  <div className="flex items-center text-slate-500 mb-2">
                    <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider">{villa.location}</span>
                  </div>
                  <p className="text-[12px] text-slate-500 font-medium mb-4">{villa.details}</p>
                  
                  <div className="mt-auto">
                    <div className="h-px w-full bg-slate-100 mb-4" />
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="font-bold text-slate-900 text-[22px] leading-none">{villa.price}</div>
                        <div className="text-[11px] text-slate-500 font-medium mt-1">For Per Night + Taxes</div>
                      </div>
                      <button className="h-10 w-10 flex items-center justify-center border border-slate-200 rounded hover:border-slate-400 transition-colors group-hover:bg-slate-50">
                        <ArrowRight className="h-5 w-5 text-slate-700" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button className="absolute -right-5 top-[40%] -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white border border-slate-200 shadow-sm hover:shadow-md rounded z-10 hidden lg:flex">
            <ChevronRight className="h-5 w-5 text-slate-600" />
          </button>

        </div>
      </div>
    </section>
  );
}
