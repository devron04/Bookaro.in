import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';

export default function CalendarManager() {
  // Mock current month setup (e.g., July 2026)
  const daysInMonth = 31;
  const startingDayOfWeek = 3; // Wednesday (0 = Sun, 1 = Mon...)
  
  const [selectedVilla, setSelectedVilla] = useState('all');

  // Mock booked dates mapping { date: { villa: string, status: string }[] }
  const mockBookings: Record<number, { villa: string, type: 'booked' | 'maintenance' | 'peak', id: string }[]> = {
    4: [{ villa: 'Ananda Villa', type: 'booked', id: 'ananda' }],
    5: [{ villa: 'Ananda Villa', type: 'booked', id: 'ananda' }, { villa: 'Panchvati Karjat', type: 'booked', id: 'panchvati' }],
    12: [{ villa: 'All Villas', type: 'peak', id: 'all' }],
    13: [{ villa: 'All Villas', type: 'peak', id: 'all' }],
    20: [{ villa: 'Panchvati Karjat', type: 'booked', id: 'panchvati' }, { villa: 'Royal Heritage', type: 'maintenance', id: 'royal' }],
    21: [{ villa: 'Panchvati Karjat', type: 'booked', id: 'panchvati' }],
    22: [{ villa: 'Panchvati Karjat', type: 'booked', id: 'panchvati' }],
    28: [{ villa: 'Royal Heritage', type: 'maintenance', id: 'royal' }],
    29: [{ villa: 'Royal Heritage', type: 'maintenance', id: 'royal' }],
  };

  const getDayDetails = (day: number) => {
    const events = mockBookings[day] || [];
    if (selectedVilla === 'all') return events;
    return events.filter(e => e.id === selectedVilla || e.id === 'all');
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-heading font-extrabold text-slate-800">Master Availability Calendar</h1>
            <p className="text-sm text-slate-500 font-body mt-1">Manage dates, prevent double-bookings, and set dynamic pricing surges.</p>
          </div>
          
          <div className="flex items-center space-x-3 bg-white border border-slate-200 p-2 rounded-xl shadow-sm">
            <Filter className="h-4 w-4 text-slate-400 ml-2" />
            <select 
              value={selectedVilla}
              onChange={(e) => setSelectedVilla(e.target.value)}
              className="text-sm font-semibold text-slate-700 bg-transparent outline-none pr-4 cursor-pointer"
            >
              <option value="all">All Properties</option>
              <option value="ananda">Ananda Beach Villa Alibaug</option>
              <option value="panchvati">Panchvati Riverside Karjat</option>
              <option value="royal">Royal Heritage Villa Lonavala</option>
            </select>
          </div>
        </div>

        {/* Legend */}
        <div className="flex space-x-6 pb-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span>Booked</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            <span>Maintenance</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span>Peak Weekend</span>
          </div>
        </div>

        {/* Calendar UI */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
            <h2 className="text-xl font-heading font-bold text-slate-800 flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-primary-purple" />
              <span>July 2026</span>
            </h2>
            <div className="flex space-x-2">
              <button className="p-2 rounded hover:bg-slate-200 text-slate-600 transition-colors"><ChevronLeft className="h-5 w-5" /></button>
              <button className="p-2 rounded hover:bg-slate-200 text-slate-600 transition-colors"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-100">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 last:border-0">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 border-l border-t border-slate-100 bg-white">
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[140px] border-r border-b border-slate-100 bg-slate-50/50"></div>
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const detailsList = getDayDetails(day);

              return (
                <div key={day} className="min-h-[140px] p-3 border-r border-b border-slate-100 hover:bg-slate-50 transition-colors group relative">
                  <span className={`text-xs font-heading font-bold ${detailsList.length > 0 ? 'text-slate-900' : 'text-slate-400'}`}>{day}</span>
                  <div className="mt-1 space-y-1.5">
                    {detailsList.map((details, idx) => {
                      if (details.type === 'booked') {
                        return <div key={idx} className="mt-2 text-[10px] font-bold text-slate-800 bg-slate-100 px-2 py-1.5 rounded-md border border-slate-200 shadow-sm flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span><span className="truncate">{details.villa}</span></div>;
                      } else if (details.type === 'maintenance') {
                        return <div key={idx} className="mt-2 text-[10px] font-bold text-slate-600 bg-slate-50 px-2 py-1.5 rounded-md border border-slate-200 shadow-sm flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></span><span className="truncate">Maintenance</span></div>;
                      } else if (details.type === 'peak') {
                        return <div key={idx} className="mt-2 text-[10px] font-bold text-slate-800 bg-slate-50 px-2 py-1.5 rounded-md border border-slate-200 shadow-sm flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></span><span className="truncate">Peak Demand (+20%)</span></div>;
                      }
                      return null;
                    })}
                  </div>
                </div>
              );
            })}
            
            {/* Fill remaining slots */}
            {Array.from({ length: (42 - (startingDayOfWeek + daysInMonth)) }).map((_, i) => (
              <div key={`empty-end-${i}`} className="min-h-[140px] border-r border-b border-slate-100 bg-slate-50/50"></div>
            ))}
          </div>
          
        </div>
      </div>
    </AdminLayout>
  );
}
