import { useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Packages from './pages/Packages';
import BookaroStays from './pages/BookaroStays';
import VisaServices from './pages/VisaServices';
import AIPlanner from './pages/AIPlanner';
import Contact from './pages/Contact';
import AdminApp from './admin/AdminApp';
import { useAppStore } from './store/useAppStore';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainApp() {
  const toastMsg = useAppStore(state => state.toastMsg);
  const setToastMsg = useAppStore(state => state.setToastMsg);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-body bg-[#F8FAFC]">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/stays" element={<BookaroStays />} />
            <Route path="/visa" element={<VisaServices />} />
            <Route path="/planner" element={<AIPlanner />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />

        {/* Floating Global Glassmorphism Toast Notification */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 z-50 glass-panel border border-[#10B981]/40 rounded-3xl p-4 shadow-2xl max-w-sm flex items-start space-x-3.5 animate-scale-up">
            <div className="h-10 w-10 rounded-2xl bg-green-50 text-[#10B981] flex items-center justify-center flex-shrink-0 border border-[#10B981]/10">
              <ShieldCheck className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <div className="flex justify-between items-start">
                <h5 className="font-heading font-bold text-xs text-slate-800">Lead Registered Live</h5>
                <button 
                  onClick={() => setToastMsg(null)}
                  className="text-slate-400 hover:text-slate-600 transition-colors -mt-0.5 ml-2"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-slate-500 font-body leading-relaxed mt-1">
                {toastMsg}
              </p>
              <a 
                href={`https://admin.${window.location.host.replace(/^www\./, '')}`}
                className="text-[9px] font-heading font-bold text-trust-blue hover:underline mt-1.5 block"
              >
                View Admin Board &rarr;
              </a>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}



function App() {
  const hostname = window.location.hostname;
  
  // Check if it's the admin subdomain
  if (hostname.startsWith('admin.')) {
    return <AdminApp />;
  }
  
  return <MainApp />;
}

export default App;
