import React, { useState } from "react";

import chefsBg from "@/assets/images/friends-staff.webp";
import MenuShowcaseModal from "@/components/common/MenuShowcaseModal";

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <section
      className="relative min-h-[800px] z-30 text-white overflow-hidden border-t border-white"
      style={{
        backgroundImage: `url(${chefsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 md:pb-24 px-4">
        <h2 className="mb-8 mt-4 text-xl md:text-3xl font-light font-serif tracking-widest text-center drop-shadow-2xl">
          Explore our Menu
        </h2>

        <div className="relative flex flex-row gap-4 sm:gap-6 bg-black/50 px-6 py-5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg">
          <button
            onClick={() => setActiveMenu("food")}
            className="px-4 py-2 text-sm md:text-[15px] bg-red-600/40 border-2 border-amber-400/70 text-amber-100 font-light rounded-full hover:bg-amber-900/30 hover:border-amber-300 hover:scale-105 transition-all duration-300 backdrop-blur-sm relative z-10"
          >
            Food Menu
          </button>

          <button
            onClick={() => setActiveMenu("drinks")}
            className="px-4 py-2 text-sm md:text-[15px] bg-red-600/40 border-2 border-amber-400/70 text-amber-100 font-light rounded-full hover:bg-amber-900/30 hover:border-amber-300 hover:scale-105 transition-all duration-300 backdrop-blur-sm relative z-10"
          >
            Drinks Menu
          </button>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent rounded-full shadow-[0_0_20px_#fbbf24] animate-pulse-slow pointer-events-none" />
        </div>
      </div>

      <MenuShowcaseModal activeMenu={activeMenu} onClose={() => setActiveMenu(null)} />
    </section>
  );
}