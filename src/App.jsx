// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

// Lazy load pages to split bundles and reduce initial load
const Home = lazy(() => import('@/pages/Home'));
const BrandHub = lazy(() => import('@/pages/BrandHub'));
const Friends = lazy(() => import('@/pages/Friends'));
const Mbaise = lazy(() => import('@/pages/Mbaise'));
const Projects = lazy(() => import('@/pages/Projects'));

// Move ScrollToTop inside Router using useLocation hook (fixes re-renders)
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Suspense 
            fallback={
              <div className="flex items-center justify-center min-h-[200px] py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/brand-hub" element={<BrandHub />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/mbaise" element={<Mbaise />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </Suspense>
          <ScrollToTop />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
