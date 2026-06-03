import { MapPin, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Trending() {
  const navigate = useNavigate();
  
  const destinations = [
    {
      name: 'Goa',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      tag: 'Beaches & Nightlife',
      rating: 4.8,
      price: '₹12,999'
    },
    {
      name: 'Dubai',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80',
      tag: 'Luxury & Skyline',
      rating: 4.9,
      price: '₹54,999'
    },
    {
      name: 'Maldives',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80',
      tag: 'Tropical Overwater Stays',
      rating: 5.0,
      price: '₹99,999'
    },
    {
      name: 'Singapore',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=400&q=80',
      tag: 'Futuristic Cityscapes',
      rating: 4.7,
      price: '₹49,999'
    },
    {
      name: 'Mahabaleshwar',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80',
      tag: 'Misty Valleys & Berries',
      rating: 4.6,
      price: '₹6,999'
    },
    {
      name: 'Bali',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80',
      tag: 'Spiritual Heritage & Beaches',
      rating: 4.8,
      price: '₹38,999'
    }
  ];

  const handleDestinationClick = (name: string) => {
    if (name) {
      navigate(`/packages?dest=${encodeURIComponent(name)}`);
    } else {
      navigate('/packages');
    }
  };

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-heading font-extrabold text-xs tracking-widest text-primary-purple uppercase block mb-2">
              Explore Our Top Picks
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-darktext tracking-tight">
              Trending Destinations
            </h2>
          </div>
          <button 
            onClick={() => handleDestinationClick('')}
            className="flex items-center space-x-1 text-primary-purple font-heading font-bold text-sm hover:text-accent-pink transition-colors group"
          >
            <span>View All Packages</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Scrollable Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, idx) => (
            <div 
              key={idx}
              onClick={() => handleDestinationClick(dest.name)}
              className="group relative h-96 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer transform hover:-translate-y-2 transition-all duration-300 bg-slate-900"
            >
              {/* Image */}
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

              {/* Tag / Badge */}
              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                <span className="text-white text-xs font-semibold">{dest.rating}</span>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-heading font-semibold text-accent-pink tracking-widest uppercase block mb-1">
                  {dest.tag}
                </span>
                <h3 className="text-white font-heading font-extrabold text-2xl mb-2 flex items-center space-x-1">
                  <MapPin className="h-5 w-5 text-trust-blue flex-shrink-0" />
                  <span>{dest.name}</span>
                </h3>
                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Starting Price</p>
                    <p className="text-lg font-heading font-bold text-white">{dest.price}</p>
                  </div>
                  <div className="bg-primary-purple/20 border border-primary-purple/35 p-3 rounded-full text-white transform group-hover:bg-primary-purple group-hover:scale-105 transition-all">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
