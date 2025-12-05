// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ScrollToTop from '@/ScrollToTop';

// Lazy load pages to split bundles and reduce initial load
const Home = lazy(() => import('@/pages/Home'));
const Programs = lazy(() => import('@/pages/Programs'));
const Friends = lazy(() => import('@/pages/Friends'));
const Mbaise = lazy(() => import('@/pages/Mbaise'));
const Projects = lazy(() => import('@/pages/Projects'));

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <ScrollToTop />
          <Suspense 
            fallback={
              <div className="flex items-center justify-center min-h-[200px] py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/mbaise" element={<Mbaise />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
