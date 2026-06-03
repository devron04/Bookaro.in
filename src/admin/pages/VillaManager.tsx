import { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, Users, Hotel } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

import AdminLayout from '../layouts/AdminLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function VillaManager() {
  const { villas, addVilla } = useAppStore();
  const [showAddForm, setShowAddForm] = useState(false);

  // New Villa Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location || !price) return;

    addVilla({
      name,
      location,
      pricePerNight: parseInt(price),
      bedrooms: parseInt(bedrooms) || 1,
      maxGuests: parseInt(maxGuests) || 2,
      rating: 5.0,
      images: [imageUrl || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'],
      amenities: ['Wi-Fi', 'Air Conditioning', 'Private Pool'], // Mock default
      description,
      nearbyAttractions: [],
      availability: 'Available'
    });

    // Reset and close
    setName(''); setLocation(''); setPrice('');
    setBedrooms(''); setMaxGuests(''); setImageUrl(''); setDescription('');
    setShowAddForm(false);
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-heading font-extrabold text-slate-800">Villa Management</h1>
            <p className="text-sm text-slate-500 font-body">Add, edit, or remove properties from BookaroStays.</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2"
          >
            {showAddForm ? <span>Cancel</span> : <><Plus className="h-4 w-4" /><span>Add New Villa</span></>}
          </Button>
        </div>

        {/* Add Villa Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fade-in">
            <h2 className="text-lg font-heading font-bold text-slate-800 mb-6 border-b pb-2">Post New Property</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Property Name *</label>
                  <Input required placeholder="e.g. Whispering Pines Villa" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Location *</label>
                  <Input required placeholder="e.g. Lonavala, Maharashtra" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Price Per Night (₹) *</label>
                  <Input required type="number" placeholder="15000" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 uppercase">Bedrooms</label>
                    <Input type="number" placeholder="4" value={bedrooms} onChange={e => setBedrooms(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 uppercase">Max Guests</label>
                    <Input type="number" placeholder="12" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Image URL</label>
                  <Input placeholder="https://..." value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Description</label>
                  <textarea 
                    rows={3} 
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-purple"
                    placeholder="Describe the villa..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button type="submit">Publish Villa</Button>
              </div>
            </form>
          </div>
        )}

        {/* Villas List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {villas.map(villa => (
            <div key={villa.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={villa.images[0]} 
                  alt={villa.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-700 shadow">
                  ₹{villa.pricePerNight.toLocaleString()}/night
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-heading font-bold text-slate-800 text-lg line-clamp-1">{villa.name}</h3>
                    <div className="flex items-center text-slate-500 text-xs mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span>{villa.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-xs font-semibold text-slate-600 my-4 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div className="flex items-center"><Hotel className="h-3.5 w-3.5 mr-1.5 text-primary-purple" /> {villa.bedrooms} Beds</div>
                  <div className="flex items-center"><Users className="h-3.5 w-3.5 mr-1.5 text-trust-blue" /> {villa.maxGuests} Guests</div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded ${
                    villa.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {villa.availability}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-1.5 text-slate-400 hover:text-primary-purple transition-colors bg-slate-50 rounded border border-slate-200 hover:border-primary-purple"><Edit2 className="h-3.5 w-3.5" /></button>
                    <button className="p-1.5 text-slate-400 hover:text-red-500 transition-colors bg-slate-50 rounded border border-slate-200 hover:border-red-200"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
}
