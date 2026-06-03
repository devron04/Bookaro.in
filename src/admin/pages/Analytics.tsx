import { TrendingUp, Users, CheckCircle2, IndianRupee, BarChart3, PieChart } from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';

export default function Analytics() {
  return (
    <AdminLayout>
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-slate-800">Analytics & Reports</h1>
          <p className="text-sm text-slate-500 font-body mt-1">Visualize your lead conversions, revenue, and overall business performance.</p>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Revenue', value: '₹4,82,000', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Conversion Rate', value: '24.8%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Total Inquiries', value: '142', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Successful Trips', value: '35', icon: CheckCircle2, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${kpi.bg}`}>
                  <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</p>
              </div>
              <p className="text-2xl font-heading font-extrabold text-slate-800">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section (Mocked UI) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-slate-800">Revenue Over Time</h3>
              <BarChart3 className="h-5 w-5 text-slate-400" />
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {/* Mock Bar Chart */}
              {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                <div key={i} className="w-full bg-blue-50 rounded-t-sm flex flex-col justify-end" style={{ height: '100%' }}>
                  <div className="w-full bg-blue-500 rounded-t-sm transition-all duration-1000 animate-fade-in" style={{ height: `${h}%` }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs font-semibold text-slate-400 border-t border-slate-100 pt-3">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-slate-800">Lead Sources</h3>
              <PieChart className="h-5 w-5 text-slate-400" />
            </div>
            <div className="h-64 flex flex-col justify-center items-center">
              {/* Mock Donut Chart Visual */}
              <div className="relative w-48 h-48 rounded-full border-[16px] border-slate-100" style={{
                background: 'conic-gradient(#3b82f6 0% 45%, #8b5cf6 45% 75%, #f97316 75% 90%, #22c55e 90% 100%)',
                borderRadius: '50%'
              }}>
                <div className="absolute inset-0 m-auto w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-inner">
                  <div className="text-center">
                    <span className="block text-2xl font-extrabold text-slate-800">142</span>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Leads</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center text-xs font-semibold text-slate-600"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>Packages</div>
              <div className="flex items-center text-xs font-semibold text-slate-600"><span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>Stays</div>
              <div className="flex items-center text-xs font-semibold text-slate-600"><span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>Visas</div>
              <div className="flex items-center text-xs font-semibold text-slate-600"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>AI Planner</div>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
