import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
// import Friends from '@/pages/Friends';
// import Community from '@/pages/Community';
// import Events from '@/pages/Events';
// import Projects from '@/pages/Projects';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Friends />} />
          <Route path="/" element={<Community />} />
          <Route path="/" element={<Events />} />
          <Route path="/" element={<Projects />} /> */}
      
        </Routes>
      </div>
    </Router>
  );
}

export default App;