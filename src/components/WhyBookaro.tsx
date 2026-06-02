import { BadgeCheck, Sparkles, Receipt, Home, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function WhyBookaro() {
  const reasons = [
    {
      icon: <Receipt className="h-6 w-6 text-primary-purple" />,
      title: 'Unbeatable Deals',
      description: 'As our name says: Book Karo, Bachat Karo! We guarantee the best pocket-friendly deals in the region.'
    },
    {
      icon: <BadgeCheck className="h-6 w-6 text-trust-blue" />,
      title: 'Verified Partners',
      description: 'We only partner with top-rated hotels, tested transport providers, and reputable local guides.'
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-accent-pink" />,
      title: 'Visa Assistance',
      description: 'Take the worry out of documentation. Our visa specialists guide you through forms, fees, and requirements.'
    },
    {
      icon: <Home className="h-6 w-6 text-success-green" />,
      title: 'Luxury Villas Stays',
      description: 'From poolside villas in Lonavala to sandy beach houses in Alibaug. Escape to pure comfort with BookaroStays.'
    },
    {
      icon: <Sparkles className="h-6 w-6 text-purple-500" />,
      title: 'AI Travel Planning',
      description: 'Ditch the generic itineraries. Our advanced AI creates a personalized day-wise plan catered to your style & budget.'
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />,
      title: 'Trustworthy & Local',
      description: 'Proudly serving Ambernath and surrounding districts. Rest easy knowing our support is local, active, and 24/7.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-heading font-extrabold text-xs tracking-widest text-primary-purple uppercase block mb-2">
            Why Choose Bookaro
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-darktext tracking-tight mb-4">
            Travel Planning Made Smart & Simple
          </h2>
          <p className="font-body text-slate-500 text-sm leading-relaxed">
            We merge cutting-edge technology with unmatched hospitality expertise to craft stress-free, cost-saving, and unforgettable travel experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-lg flex flex-col items-start"
            >
              <div className="p-4 bg-slate-100 rounded-2xl mb-6">
                {reason.icon}
              </div>
              <h3 className="font-heading font-extrabold text-xl text-darktext mb-3">
                {reason.title}
              </h3>
              <p className="font-body text-sm text-slate-500 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
