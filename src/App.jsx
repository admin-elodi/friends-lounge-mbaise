// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import Programs from '@/pages/Programs';
import Friends from '@/pages/Friends';
import Community from '@/pages/Community';
import Projects from '@/pages/Projects';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ScrollToTop from '@/ScrollToTop';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/community" element={<Community />} />
            <Route path="/projects" element={<Projects />} />
      
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;