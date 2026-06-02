import { Users, Hotel, Home, HeartHandshake } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      icon: <Users className="h-7 w-7 text-primary-purple" />,
      value: '10,000+',
      label: 'Happy Travelers',
      description: 'Journeys customized across India & globally.'
    },
    {
      icon: <Hotel className="h-7 w-7 text-trust-blue" />,
      value: '500+',
      label: 'Verified Hotels',
      description: 'Exclusive properties with guaranteed amenities.'
    },
    {
      icon: <Home className="h-7 w-7 text-accent-pink" />,
      value: '100+',
      label: 'Luxury Villas',
      description: 'Handpicked private villas in Maharashtra & Goa.'
    },
    {
      icon: <HeartHandshake className="h-7 w-7 text-success-green" />,
      value: '24/7',
      label: 'On-Trip Support',
      description: 'Always beside you for a stress-free travel experience.'
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-slate-50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-3 bg-slate-100 rounded-xl flex-shrink-0">
                {stat.icon}
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-3xl text-darktext tracking-tight">
                  {stat.value}
                </h3>
                <p className="font-heading font-bold text-sm text-slate-800">
                  {stat.label}
                </p>
                <p className="font-body text-xs text-lighttext mt-1 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
