
import { CheckCircle2, Trash2, IndianRupee, MapPin, Link as LinkIcon, FileText } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import type { Lead } from '../../store/mockData';
import AdminLayout from '../layouts/AdminLayout';

export default function BookingsManager() {
  const { leads, changeLeadStatus, deleteLead } = useAppStore();
  
  // Only show confirmed bookings (completed leads)
  const bookedLeads = leads.filter(l => l.status === 'completed');

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-slate-800">Confirmed Bookings</h1>
          <p className="text-sm text-slate-500 font-body mt-1">Manage all successful customer bookings, upcoming trips, and historical conversions.</p>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Successful Conversions</span>
            </h2>
            <div className="text-xs text-slate-500 font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
              Showing {bookedLeads.length} bookings
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {bookedLeads.length > 0 ? (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-white text-slate-500 font-heading text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold">Customer Details</th>
                    <th className="p-4 font-semibold">Booking Details</th>
                    <th className="p-4 font-semibold">Financials</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-body">
                  {bookedLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 align-top">
                        <p className="font-heading font-bold text-slate-800 text-sm">{lead.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{lead.phone}</p>
                        {lead.email && <p className="text-xs text-slate-500">{lead.email}</p>}
                      </td>
                      
                      <td className="p-4 align-top">
                        <div className="flex items-center text-slate-700 font-semibold text-sm">
                           <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary-purple" />
                           {lead.destination || 'Not Specified'}
                        </div>
                        <div className="flex flex-col space-y-1 mt-2 text-xs text-slate-500 bg-slate-100 p-2 rounded-lg inline-block">
                          {lead.travelDate && <span><span className="font-semibold text-slate-600">Travel Date:</span> {lead.travelDate}</span>}
                          <span><span className="font-semibold text-slate-600">Type:</span> {lead.type.toUpperCase()}</span>
                        </div>
                      </td>

                      <td className="p-4 align-top">
                         <div className="flex items-center space-x-1 font-heading font-bold text-slate-800">
                           <IndianRupee className="h-3.5 w-3.5 text-slate-500" />
                           <span>{lead.totalAmount ? lead.totalAmount.toLocaleString('en-IN') : (lead.budget ? lead.budget.replace(/[^0-9-]/g, '') : 'N/A')}</span>
                         </div>
                         {lead.paymentStatus === 'paid' && <p className="text-[10px] text-green-600 font-bold tracking-wider uppercase mt-1">Paid in Full</p>}
                         {lead.paymentStatus === 'partial' && (
                           <div className="mt-1.5">
                             <div className="w-full bg-slate-200 rounded-full h-1.5 mb-1">
                               <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: `${(lead.amountPaid! / lead.totalAmount!) * 100}%` }}></div>
                             </div>
                             <p className="text-[10px] text-orange-600 font-bold tracking-wider uppercase">Advance: ₹{lead.amountPaid?.toLocaleString('en-IN')}</p>
                           </div>
                         )}
                         {lead.paymentStatus === 'pending' && <p className="text-[10px] text-red-500 font-bold tracking-wider uppercase mt-1">Payment Pending</p>}
                         {!lead.paymentStatus && <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mt-1">Status Unknown</p>}
                      </td>

                      <td className="p-4 align-top">
                        <select
                          value={lead.status}
                          onChange={(e) => changeLeadStatus(lead.id, e.target.value as Lead['status'])}
                          className="border border-green-200 bg-green-50 text-green-700 rounded-lg px-3 py-1.5 font-heading text-xs font-bold outline-none cursor-pointer focus:ring-2 focus:ring-green-500/20"
                        >
                          <option value="new">Move to New</option>
                          <option value="hot">Move to Hot</option>
                          <option value="contacted">Move to Contacted</option>
                          <option value="completed">Confirmed / Completed</option>
                        </select>
                      </td>

                      <td className="p-4 align-top text-center space-y-2">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => alert(`Sending Payment Link to ${lead.name} via WhatsApp...`)}
                            className="p-2 rounded-lg bg-white hover:bg-blue-50 text-blue-500 border border-slate-200 hover:border-blue-200 transition-all shadow-sm"
                            title="Send Payment Link"
                          >
                            <LinkIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => alert(`Generating Tax Invoice for ${lead.name}...`)}
                            className="p-2 rounded-lg bg-white hover:bg-purple-50 text-purple-500 border border-slate-200 hover:border-purple-200 transition-all shadow-sm"
                            title="Generate Invoice"
                          >
                            <FileText className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-2 rounded-lg bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 hover:border-red-200 transition-all shadow-sm"
                            title="Delete Booking Record"
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
                <CheckCircle2 className="h-10 w-10 mx-auto text-slate-300 mb-3" />
                <p className="font-heading text-sm font-bold text-slate-700">No confirmed bookings yet.</p>
                <p className="text-xs text-slate-500 mt-1">Convert leads from the Inquiries Board to see them here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
