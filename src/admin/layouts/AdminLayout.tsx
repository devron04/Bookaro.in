import type { ReactNode } from 'react';
import { LayoutDashboard, LogOut, Building, CheckCircle2, BarChart3, CalendarDays } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();

  const sidebarItems = [
    { id: 'dashboard', label: 'Inquiries Board', icon: LayoutDashboard, path: '/' },
    { id: 'bookings', label: 'Confirmed Bookings', icon: CheckCircle2, path: '/bookings' },
    { id: 'calendar', label: 'Master Calendar', icon: CalendarDays, path: '/calendar' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
  ];



  return (
    <div className="h-screen bg-[#F4F5F7] font-body flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex items-center space-x-2">
          <img src="/bookkaro_logo.png" alt="Bookaro Admin" className="h-12 w-auto object-contain" />
        </div>
        


        <div className="flex items-center space-x-4">
          <Link to="/settings" className="flex items-center space-x-3 hover:bg-slate-50 p-1.5 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800 leading-tight">Admin User</p>
              <p className="text-[10px] font-semibold text-slate-500">Super Administrator</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Admin+User&background=C218D4&color=fff" alt="Admin" className="h-full w-full object-cover" />
            </div>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 hidden md:flex flex-col py-6 overflow-y-auto">
          <div className="px-4 mb-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Lead Management</h3>
            <nav className="space-y-1">
              {sidebarItems.map((item) => {

                const Icon = item.icon;
                
                const isItemActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      isItemActive
                        ? 'bg-[#1a365d] text-white' // Dark blue background like the reference sidebar active state
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isItemActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="px-4 mb-2 mt-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Content Management</h3>
            <nav className="space-y-1">
              <Link
                to="/villas"
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  location.pathname === '/villas'
                    ? 'bg-[#1a365d] text-white'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Building className={`h-4 w-4 ${location.pathname === '/villas' ? 'text-white' : 'text-slate-400'}`} />
                <span>Manage Villas</span>
              </Link>
            </nav>
          </div>

          <div className="mt-auto px-4 pb-4">
            <button className="flex items-center space-x-3 px-3 py-2.5 w-full rounded-lg text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-red-600 transition-colors">
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
