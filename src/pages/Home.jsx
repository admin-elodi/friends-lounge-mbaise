import React from "react";
import Header from "@/components/common/Header";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import MicroStats from "@/components/sections/MicroStats";
import Footer from "@/components/common/Footer";

const Home = () => {
  // ✅ Toggle visibility of sections here
  const showHeader = true;
  const showHero = true;
  const showMenu = true;
  const showMicroStats = false;
  const showFooter = true;

  return (
    <div className="w-full min-h-screen bg-white">
      {showHeader && <Header />}
      {showHero && <Hero />}
      {showMenu && <Menu />}
      {showMicroStats && <MicroStats />}
      {showFooter && <Footer />}
    </div>
  );
};

export default Home;
