// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { MusicProvider } from '@/context/MusicContext';
import EventWidget from '@/components/common/EventWidget';

// ============================================================================
// PAGE FEATURE FLAGS
// Toggle any page to `false` before pushing to production to hide it.
// Disabled pages will automatically redirect visitors to the homepage ("/");
// ============================================================================
const ENABLED_PAGES = {
  home: true,
  gallery: true,
  programsHub: true,
  friends: true,
  mbaise: true,
  projects: false,
  games: false,
};

// Lazy load pages to split bundles and reduce initial load
const Home = lazy(() => import('@/pages/Home'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const ProgramsHub = lazy(() => import('@/pages/ProgramsHub'));
const Friends = lazy(() => import('@/pages/Friends'));
const Mbaise = lazy(() => import('@/pages/Mbaise'));
const Projects = lazy(() => import('@/pages/Projects'));
const Games = lazy(() => import('@/pages/Games'));

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AnalyticsPageViewTracker() {
  const location = useLocation();
  React.useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);
  return null;
}

const suspenseFallback = (
  <div className="flex items-center justify-center min-h-[200px] py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

function App() {
  return (
    <Router>
      <MusicProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={suspenseFallback}>
              <Routes>
                <Route
                  path="/"
                  element={ENABLED_PAGES.home ? <Home /> : <Navigate to="/" replace />}
                />
                <Route
                  path="/gallery"
                  element={ENABLED_PAGES.gallery ? <Gallery /> : <Navigate to="/" replace />}
                />
                <Route
                  path="/programs-hub"
                  element={ENABLED_PAGES.programsHub ? <ProgramsHub /> : <Navigate to="/" replace />}
                />
                <Route
                  path="/friends"
                  element={ENABLED_PAGES.friends ? <Friends /> : <Navigate to="/" replace />}
                />
                <Route
                  path="/mbaise"
                  element={ENABLED_PAGES.mbaise ? <Mbaise /> : <Navigate to="/" replace />}
                />
                <Route
                  path="/projects"
                  element={ENABLED_PAGES.projects ? <Projects /> : <Navigate to="/" replace />}
                />
                <Route
                  path="/games"
                  element={ENABLED_PAGES.games ? <Games /> : <Navigate to="/" replace />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
            <ScrollToTop />
            <AnalyticsPageViewTracker />
          </main>
          <Footer />
        </div>
        <EventWidget />
      </MusicProvider>
    </Router>
  );
}

export default App;