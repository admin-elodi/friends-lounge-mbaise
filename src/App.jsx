// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { MusicProvider } from '@/context/MusicContext';
import EventWidget from '@/components/common/EventWidget';

// Lazy load pages to split bundles and reduce initial load
const Home = lazy(() => import('@/pages/Home'));
const ProgramsHub = lazy(() => import('@/pages/ProgramsHub'));
const Friends = lazy(() => import('@/pages/Friends'));
const Mbaise = lazy(() => import('@/pages/Mbaise'));
const Projects = lazy(() => import('@/pages/Projects'));

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

// <EventWidget /> is mounted exactly once, right here - not inside
// Header.jsx. It's fully self-contained (its own Firestore subscription,
// its own auth state, its own modal), with no Context/Provider layer at
// all. This is the deliberate architectural change: fewer moving parts,
// nothing to duplicate, nothing to wire incorrectly across components.
function App() {
  return (
    <Router>
      <MusicProvider>
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
        <EventWidget />
      </MusicProvider>
    </Router>
  );
}

export default App;
