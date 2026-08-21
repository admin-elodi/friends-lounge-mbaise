// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { MusicProvider } from '@/context/MusicContext';
import { EventProvider } from '@/context/EventContext';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

// Lazy load pages to split bundles and reduce initial load
const Home = lazy(() => import('@/pages/Home'));
const ProgramsHub = lazy(() => import('@/pages/ProgramsHub'));
const Friends = lazy(() => import('@/pages/Friends'));
const Mbaise = lazy(() => import('@/pages/Mbaise'));
const Projects = lazy(() => import('@/pages/Projects'));
const AdminLogin = lazy(() => import('@/pages/AdminLogin'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

const suspenseFallback = (
  <div className="flex items-center justify-center min-h-[200px] py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

// The public marketing site — Header, footer-embedded music player, all of
// it. Kept as its own component so the admin routes below can skip this
// entirely: a login screen and a management dashboard have no use for the
// public nav, hero music, or footer.
function PublicSite() {
  return (
    <MusicProvider>
      <EventProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={suspenseFallback}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/programs-hub" element={<ProgramsHub />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/mbaise" element={<Mbaise />} />
                <Route path="/projects" element={<Projects />} />
              </Routes>
            </Suspense>
            <ScrollToTop />
          </main>
          <Footer />
        </div>
      </EventProvider>
    </MusicProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={suspenseFallback}>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/*" element={<PublicSite />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
