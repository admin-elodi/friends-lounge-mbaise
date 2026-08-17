import React from "react";
import Hero from "@/components/sections/Hero";
import UpcomingEvent from "@/components/sections/UpcomingEvent";
import Menu from "@/components/sections/Menu";
import Facilities from "@/components/sections/Facilities";
import MicroStats from "@/components/sections/MicroStats";

const Home = () => {
  // ✅ Toggle visibility of sections here
  
  const showHero = true;
  const showUpcomingEvent = true;
  const showMenu = true;
  const showFacilities = true;
  const showMicroStats = false;
  

  return (
    <div className="w-full min-h-screen bg-white">
      {showUpcomingEvent && <UpcomingEvent />}
      
      {showHero && <Hero />}
    
      {showMenu && <Menu />}
      {showFacilities && <Facilities />}
      {showMicroStats && <MicroStats />}
    
    </div>
  );
};

export default Home;
