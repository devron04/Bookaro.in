import { Save, User, Bell, Shield, Globe } from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function Settings() {
  return (
    <AdminLayout>
      <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-slate-800">System Settings</h1>
          <p className="text-sm text-slate-500 font-body mt-1">Manage your admin profile, notifications, and global platform preferences.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
          
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 space-y-2 flex-shrink-0">
            <button className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm font-bold bg-white text-primary-purple shadow-sm border border-slate-200">
              <User className="h-4 w-4" />
              <span>Profile Details</span>
            </button>
            <button className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200/50 transition-colors">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </button>
            <button className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200/50 transition-colors">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </button>
            <button className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200/50 transition-colors">
              <Globe className="h-4 w-4" />
              <span>Platform Settings</span>
            </button>
          </div>

          {/* Settings Content Area */}
          <div className="flex-1 p-6 md:p-8">
            <h2 className="text-lg font-heading font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">Profile Information</h2>
            
            <div className="space-y-6 max-w-md">
              <div className="flex items-center space-x-6">
                <div className="h-20 w-20 rounded-full bg-slate-200 border-2 border-primary-purple flex items-center justify-center overflow-hidden shadow-sm">
                  <img src="https://ui-avatars.com/api/?name=Admin+User&background=C218D4&color=fff&size=150" alt="Admin" className="h-full w-full object-cover" />
                </div>
                <div>
                  <Button className="text-xs bg-white border border-slate-300 text-slate-700 hover:bg-slate-50">Change Avatar</Button>
                  <p className="text-[10px] text-slate-400 mt-2 font-semibold">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Full Name</label>
                  <Input defaultValue="Admin User" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Email Address</label>
                  <Input defaultValue="admin@bookaro.in" type="email" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Role</label>
                  <Input defaultValue="Super Administrator" disabled className="bg-slate-50 text-slate-500" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </AdminLayout>
  );
}
