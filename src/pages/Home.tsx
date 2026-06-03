
import Hero from '../components/Hero';
import DestinationsGrid from '../components/DestinationsGrid';
import BestRatedVillas from '../components/BestRatedVillas';
import WhyBookaro from '../components/WhyBookaro';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();


  return (
    <div className="space-y-0 pb-10">
      <Hero />
      <div className="pt-16 pb-8 bg-white">
        <DestinationsGrid />
      </div>
      
      <BestRatedVillas />
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
            onClick={() => navigate('/planner')}
            className="bg-white hover:bg-slate-50 text-primary-purple font-heading font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-black/10 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Plan My Trip
          </button>
        </div>
      </section>
    </div>
  );
}
