import { useState } from 'react';
import { ShieldAlert, Users, Flame, Activity, Trash2, CheckCircle2 } from 'lucide-react';
import type { Lead } from '../mockData';

interface AdminDashboardProps {
  leads: Lead[];
  onChangeLeadStatus: (id: string, status: Lead['status']) => void;
  onDeleteLead: (id: string) => void;
}

export default function AdminDashboard({ leads, onChangeLeadStatus, onDeleteLead }: AdminDashboardProps) {
  const [filterType, setFilterType] = useState<string>('all');

  // Compute Stats
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'new').length;
  const hotLeadsCount = leads.filter(l => l.status === 'hot').length;
  const completedLeadsCount = leads.filter(l => l.status === 'completed').length;
  
  const packageLeadsCount = leads.filter(l => l.type === 'package').length;
  const staysLeadsCount = leads.filter(l => l.type === 'villa').length;
  const visaLeadsCount = leads.filter(l => l.type === 'visa').length;
  const plannerLeadsCount = leads.filter(l => l.type === 'ai_planner').length;

  const filteredLeads = filterType === 'all' 
    ? leads 
    : leads.filter(l => l.type === filterType);

  return (
    <div className="pt-24 min-h-screen pb-20 bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-6 border-b border-slate-800 mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldAlert className="h-5 w-5 text-trust-blue" />
              <span className="text-[10px] font-heading font-extrabold text-trust-blue uppercase tracking-widest">
                Internal Console
              </span>
            </div>
            <h1 className="text-3xl font-heading font-extrabold text-white mt-1">
              Lead Management Panel
            </h1>
            <p className="text-xs text-slate-400 font-body">
              Monitor customer inquiries from Holiday forms, stays, Visa queries, and AI Planner in real-time.
            </p>
          </div>
          
          <div className="bg-slate-800 border border-slate-700 px-4 py-2.5 rounded-2xl flex items-center space-x-2 text-xs font-heading font-bold text-success-green">
            <div className="h-2 w-2 rounded-full bg-success-green animate-ping" />
            <span>Live Engine Synchronized</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex items-start space-x-4">
            <div className="p-3 bg-slate-900 text-slate-300 rounded-xl">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-heading font-bold">Total Inquiries</p>
              <p className="text-2xl font-heading font-extrabold text-white mt-1">{totalLeadsCount}</p>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex items-start space-x-4">
            <div className="p-3 bg-blue-900/40 text-trust-blue rounded-xl">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-heading font-bold">New Leads</p>
              <p className="text-2xl font-heading font-extrabold text-white mt-1">{newLeadsCount}</p>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex items-start space-x-4">
            <div className="p-3 bg-red-950/40 text-accent-pink rounded-xl animate-pulse">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-heading font-bold">Hot Leads</p>
              <p className="text-2xl font-heading font-extrabold text-white mt-1">{hotLeadsCount}</p>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex items-start space-x-4">
            <div className="p-3 bg-green-950/40 text-[#10B981] rounded-xl">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-heading font-bold">Completed / Closed</p>
              <p className="text-2xl font-heading font-extrabold text-white mt-1">{completedLeadsCount}</p>
            </div>
          </div>
        </div>

        {/* Filters and List */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          {/* Header toolbar */}
          <div className="p-6 border-b border-slate-800 bg-slate-950 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {[
                { id: 'all', label: 'All Inquiries' },
                { id: 'package', label: `Packages (${packageLeadsCount})` },
                { id: 'villa', label: `BookaroStays (${staysLeadsCount})` },
                { id: 'visa', label: `Visas (${visaLeadsCount})` },
                { id: 'ai_planner', label: `AI Planner (${plannerLeadsCount})` }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setFilterType(pill.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-heading font-bold flex-shrink-0 transition-all ${
                    filterType === pill.id
                      ? 'bg-primary-purple text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Details Table */}
          <div className="overflow-x-auto">
            {filteredLeads.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-400 font-heading">
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Trip Details</th>
                    <th className="p-4">Lead Source</th>
                    <th className="p-4">Priority status</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 font-body">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/30 transition-colors">
                      {/* Customer Details */}
                      <td className="p-4">
                        <p className="font-heading font-bold text-white text-sm">{lead.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{lead.phone}</p>
                        {lead.email && <p className="text-[9px] text-slate-500">{lead.email}</p>}
                      </td>
                      
                      {/* Trip Details */}
                      <td className="p-4">
                        <p className="font-semibold text-slate-250">{lead.destination || 'Not Specified'}</p>
                        <div className="flex space-x-2 mt-1 text-[9px] text-slate-400">
                          {lead.budget && <span>Budget: {lead.budget}</span>}
                          {lead.travelDate && (
                            <>
                              <span className="text-slate-650">•</span>
                              <span>Date: {lead.travelDate}</span>
                            </>
                          )}
                        </div>
                        {lead.message && (
                          <p className="text-[10px] italic text-slate-500 mt-1 max-w-xs truncate" title={lead.message}>
                            "{lead.message}"
                          </p>
                        )}
                      </td>

                      {/* Source */}
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-400 border border-slate-800 font-heading font-bold text-[9px]">
                          {lead.source}
                        </span>
                        <p className="text-[9px] text-slate-500 mt-1">{lead.timestamp}</p>
                      </td>

                      {/* Priority dropdown */}
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => onChangeLeadStatus(lead.id, e.target.value as Lead['status'])}
                          className={`bg-slate-900 border rounded-lg px-2 py-1.5 font-heading text-[10px] font-bold outline-none cursor-pointer ${
                            lead.status === 'new' ? 'text-trust-blue border-trust-blue/40' :
                            lead.status === 'hot' ? 'text-accent-pink border-accent-pink/40 animate-pulse' :
                            lead.status === 'contacted' ? 'text-yellow-500 border-yellow-500/40' :
                            'text-[#10B981] border-[#10B981]/40'
                          }`}
                        >
                          <option value="new">New Lead</option>
                          <option value="hot">🔥 Hot Lead</option>
                          <option value="contacted">Contacted</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>

                      {/* Action */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() => onDeleteLead(lead.id)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-500 hover:text-red-400 border border-slate-850 hover:border-red-900 transition-all"
                          title="Delete Lead Record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-20 bg-slate-950 text-slate-500">
                <Users className="h-10 w-10 mx-auto text-slate-700 mb-2" />
                <p className="font-heading text-sm font-bold text-slate-400">No leads captured yet.</p>
                <p className="text-[10px] text-slate-600 mt-1">Submit holiday queries or test AI plans to see them register live here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
