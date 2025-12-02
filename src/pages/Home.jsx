import React from "react";

import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import MicroStats from "@/components/sections/MicroStats";

const Home = () => {
  // ✅ Toggle visibility of sections here
  
  const showHero = true;
  const showMenu = true;
  const showMicroStats = false;
  

  return (
    <div className="w-full min-h-screen bg-white">
      
      {showHero && <Hero />}
      {showMenu && <Menu />}
      {showMicroStats && <MicroStats />}
    
    </div>
  );
};

export default Home;
