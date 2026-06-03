import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminDashboard from './pages/Dashboard';
import VillaManager from './pages/VillaManager';
import BookingsManager from './pages/BookingsManager';
import CalendarManager from './pages/CalendarManager';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function AdminApp() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/villas" element={<VillaManager />} />
        <Route path="/bookings" element={<BookingsManager />} />
        <Route path="/calendar" element={<CalendarManager />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
