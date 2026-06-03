import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Users, Flame, Activity, Trash2, CheckCircle2, MessageSquare, BellRing, X, Send } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import type { Lead } from '../../store/mockData';
import AdminLayout from '../layouts/AdminLayout';

export default function Dashboard() {
  const { leads, changeLeadStatus, deleteLead } = useAppStore();
  const location = useLocation();
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedCrmLead, setSelectedCrmLead] = useState<Lead | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('greeting');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get('filter');
    if (filter) {
      setFilterType(filter);
    } else {
      setFilterType('all');
    }
  }, [location]);

  // Exclude completed leads from Inquiries board
  const activeLeads = leads.filter(l => l.status !== 'completed');

  // Compute Stats
  const totalLeadsCount = activeLeads.length;
  const newLeadsCount = activeLeads.filter(l => l.status === 'new').length;
  const hotLeadsCount = activeLeads.filter(l => l.status === 'hot').length;
  const contactedLeadsCount = activeLeads.filter(l => l.status === 'contacted').length;

  const filteredLeads = filterType === 'all' 
    ? activeLeads 
    : activeLeads.filter(l => l.type === filterType);

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-slate-800">Inquiries Board</h1>
          <p className="text-sm text-slate-500 font-body mt-1">Monitor, manage, and assign customer leads.</p>
        </div>


        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-4 w-4 text-slate-400" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Inquiries</p>
            </div>
            <p className="text-3xl font-heading font-extrabold text-slate-800">{totalLeadsCount}</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-4 w-4 text-blue-500" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Leads</p>
            </div>
            <p className="text-3xl font-heading font-extrabold text-blue-600">{newLeadsCount}</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col">
            <div className="flex items-center space-x-2 mb-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hot Leads</p>
            </div>
            <p className="text-3xl font-heading font-extrabold text-orange-600">{hotLeadsCount}</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contacted</p>
            </div>
            <p className="text-3xl font-heading font-extrabold text-green-600">{contactedLeadsCount}</p>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto">
              {[
                { id: 'all', label: 'All Inquiries' },
                { id: 'package', label: 'Packages' },
                { id: 'villa', label: 'BookaroStays' },
                { id: 'visa', label: 'Visas' },
                { id: 'ai_planner', label: 'AI Planner' }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setFilterType(pill.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-heading font-bold flex-shrink-0 transition-all ${
                    filterType === pill.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
            <div className="text-xs text-slate-500 font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
              Showing {filteredLeads.length} active leads
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {filteredLeads.length > 0 ? (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-white text-slate-500 font-heading text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold">Customer Details</th>
                    <th className="p-4 font-semibold">Trip Details</th>
                    <th className="p-4 font-semibold">Lead Source</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-body">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 align-top">
                        <p className="font-heading font-bold text-slate-800 text-sm">{lead.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{lead.phone}</p>
                        {lead.email && <p className="text-xs text-slate-500">{lead.email}</p>}
                      </td>
                      
                      <td className="p-4 align-top">
                        <p className="font-semibold text-slate-700 text-sm">{lead.destination || 'Not Specified'}</p>
                        <div className="flex flex-col space-y-1 mt-1 text-xs text-slate-500">
                          {lead.budget && <span>Budget: {lead.budget}</span>}
                          {lead.travelDate && <span>Date: {lead.travelDate}</span>}
                        </div>
                        {lead.message && (
                          <p className="text-xs italic text-slate-600 mt-2 p-2 bg-slate-50 rounded border border-slate-100 max-w-xs">
                            "{lead.message}"
                          </p>
                        )}
                      </td>

                      <td className="p-4 align-top">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-heading font-semibold text-xs">
                          {lead.source}
                        </span>
                        <p className="text-xs text-slate-400 mt-2">{lead.timestamp}</p>
                      </td>

                      <td className="p-4 align-top">
                        <select
                          value={lead.status}
                          onChange={(e) => changeLeadStatus(lead.id, e.target.value as Lead['status'])}
                          className={`border rounded-lg px-3 py-1.5 font-heading text-xs font-bold outline-none cursor-pointer focus:ring-2 focus:ring-primary-purple/20 ${
                            lead.status === 'new' ? 'text-blue-700 border-blue-200 bg-blue-50' :
                            lead.status === 'hot' ? 'text-orange-700 border-orange-200 bg-orange-50' :
                            lead.status === 'contacted' ? 'text-yellow-700 border-yellow-200 bg-yellow-50' :
                            'text-green-700 border-green-200 bg-green-50'
                          }`}
                        >
                          <option value="new">New Lead</option>
                          <option value="hot">🔥 Hot Lead</option>
                          <option value="contacted">Contacted</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>

                      <td className="p-4 align-top text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => setSelectedCrmLead(lead)}
                            className="p-2 rounded-lg bg-white hover:bg-green-50 text-green-500 border border-slate-200 hover:border-green-200 transition-all shadow-sm"
                            title="Open CRM & WhatsApp"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => alert(`Set Follow-up reminder for ${lead.name}`)}
                            className="p-2 rounded-lg bg-white hover:bg-blue-50 text-blue-500 border border-slate-200 hover:border-blue-200 transition-all shadow-sm"
                            title="Set Reminder"
                          >
                            <BellRing className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-2 rounded-lg bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 hover:border-red-200 transition-all shadow-sm"
                            title="Delete Lead Record"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-16 bg-white">
                <Users className="h-10 w-10 mx-auto text-slate-300 mb-3" />
                <p className="font-heading text-sm font-bold text-slate-700">No leads found.</p>
                <p className="text-xs text-slate-500 mt-1">Try selecting a different filter or generate a new inquiry.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CRM Dispatcher Modal */}
      {selectedCrmLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-800 text-lg leading-tight">WhatsApp Dispatcher</h3>
                  <p className="text-xs text-slate-500">Messaging: {selectedCrmLead.name} ({selectedCrmLead.phone})</p>
                </div>
              </div>
              <button onClick={() => setSelectedCrmLead(null)} className="p-2 text-slate-400 hover:bg-slate-200 rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Automated Template</label>
                <select 
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm font-semibold text-slate-700 outline-none focus:border-primary-purple focus:ring-1 focus:ring-primary-purple bg-slate-50"
                >
                  <option value="greeting">👋 Initial Greeting & Request Details</option>
                  <option value="brochure">📄 Send Brochure / Itinerary PDF</option>
                  <option value="payment">🔗 Send Razorpay Payment Link</option>
                  <option value="followup">⏳ Follow-up on Proposal</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message Preview</label>
                <div className="w-full h-36 overflow-y-auto border border-slate-200 rounded-xl p-4 text-sm text-slate-600 bg-slate-50/50 font-medium leading-relaxed">
                  {selectedTemplate === 'greeting' && (
                    <>
                      Hi {selectedCrmLead.name.split(' ')[0]},<br/><br/>
                      Thank you for contacting Bookaro.in regarding your trip to {selectedCrmLead.destination || 'your destination'}.<br/><br/>
                      One of our luxury travel experts is reviewing your request and will share a customized itinerary shortly.
                    </>
                  )}
                  {selectedTemplate === 'brochure' && (
                    <>
                      Hi {selectedCrmLead.name.split(' ')[0]},<br/><br/>
                      As discussed, please find attached the detailed itinerary for your upcoming trip to {selectedCrmLead.destination || 'your destination'}.<br/><br/>
                      Let me know if you would like to make any customizations!
                    </>
                  )}
                  {selectedTemplate === 'payment' && (
                    <>
                      Hi {selectedCrmLead.name.split(' ')[0]},<br/><br/>
                      Your booking for {selectedCrmLead.destination || 'your destination'} is almost confirmed!<br/><br/>
                      Please use the following secure Razorpay link to pay the advance amount and block your dates:<br/>
                      <span className="text-blue-500 underline cursor-pointer mt-1 block">https://rzp.io/i/bookaro-1234</span>
                    </>
                  )}
                  {selectedTemplate === 'followup' && (
                    <>
                      Hi {selectedCrmLead.name.split(' ')[0]},<br/><br/>
                      I hope you're having a great day! I am following up on the proposal sent earlier for {selectedCrmLead.destination || 'your destination'}.<br/><br/>
                      Are you available for a quick 5-minute call today to finalize the details?
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end space-x-3">
              <button onClick={() => setSelectedCrmLead(null)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Automated WhatsApp message dispatched successfully via API!');
                  setSelectedCrmLead(null);
                }} 
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Send via WhatsApp</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </AdminLayout>
  );
}
