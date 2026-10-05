import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Wine, Search, X } from "lucide-react";

import chefsBg from "@/assets/images/food/suya.webp";
import { menu } from "@/data/menuData";

const pages = ["food", "drinks"];

export default function Menu() {
  const [activePage, setActivePage] = useState("food");
  const [searchQuery, setSearchQuery] = useState("");

  const currentMenu = menu[activePage];

  // Filter menu items dynamically based on search query
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return currentMenu.categories;

    return currentMenu.categories
      .map((cat) => {
        const matchingItems = cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            (item.desc && item.desc.toLowerCase().includes(q)) ||
            cat.title.toLowerCase().includes(q)
        );
        return {
          ...cat,
          items: matchingItems,
        };
      })
      .filter((cat) => cat.items.length > 0);
  }, [currentMenu, searchQuery]);

  return (
    <section
      className="relative min-h-[900px] z-30 text-white overflow-hidden border-t border-white"
      style={{
        backgroundImage: `url(${chefsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center py-12 md:py-24 px-4">
        <h2 className="text-xl md:text-3xl font-light font-serif tracking-widest text-center drop-shadow-2xl">
          Explore our Menu
        </h2>
        <p className="text-xl text-yellow-200 mt-4">
          Search or Scroll Through
        </p>

       

        {/* MOBILE TOGGLE TABS (Visible only on mobile to prevent overlapping) */}
        <div className="flex md:hidden gap-2 mt-6 z-40 bg-black/60 p-1.5 rounded-lg border border-amber-500/30 backdrop-blur-md">
          {pages.map((page) => {
            const isActive = page === activePage;
            const Icon = page === "food" ? UtensilsCrossed : Wine;
            const label = page === "food" ? "Food" : "Drinks";
            return (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wide transition-all ${
                  isActive
                    ? "bg-amber-400 text-amber-950 font-bold shadow-md"
                    : "text-amber-200/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            );
          })}
        </div>

        {/* THE MENU BOOK */}
        <div
          className="relative w-full max-w-3xl mt-6 md:mt-10"
          style={{ perspective: "2200px" }}
        >
          {/* Ribbon bookmark */}
          <div
            className="absolute -top-4 md:-top-5 left-6 md:left-10 z-40 w-4 md:w-5 h-14 md:h-20 bg-gradient-to-b from-red-600 to-red-800 shadow-md"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)" }}
          />

          {/* DESKTOP BOOKMARK TABS (Hidden on mobile) */}
          <div className="hidden md:flex absolute -right-4 top-8 z-40 flex-col gap-3">
            {pages.map((page) => {
              const isActive = page === activePage;
              const Icon = page === "food" ? UtensilsCrossed : Wine;
              const label = page === "food" ? "Food" : "Drinks";
              return (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-l-lg text-sm font-semibold uppercase tracking-wide shadow-lg transition-all duration-300 ${
                    isActive
                      ? "bg-amber-50/80 text-amber-900 backdrop-blur-sm translate-x-0"
                      : "bg-amber-900/60 text-amber-100 backdrop-blur-lg translate-x-2 hover:translate-x-0 hover:bg-amber-800/80"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Menu Book Body Container */}
          <div className="relative rounded-2xl md:rounded-r-2xl md:rounded-l-sm shadow-2xl shadow-black/70 bg-black/40 border border-white/20 overflow-hidden z-20">
            {/* Page depth effects */}
            <div className="hidden md:block absolute inset-0 translate-x-2.5 translate-y-2.5 rotate-[0.6deg] bg-amber-100/25 rounded-r-2xl rounded-l-sm -z-10 shadow-md backdrop-blur-xs" />
            <div className="hidden md:block absolute inset-0 translate-x-[18px] translate-y-[18px] rotate-[1.1deg] bg-amber-200/20 rounded-r-2xl rounded-l-sm -z-20 shadow-md backdrop-blur-lg" />

            {/* Spine shadow overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/50 z-30 pointer-events-none" />
            <div className="absolute left-0 top-0 bottom-0 w-4 md:w-6 bg-gradient-to-r from-black/45 via-black/15 to-transparent rounded-l-sm z-30 pointer-events-none" />

            {/* STATIC HEADER & IN-BOOK SEARCH BAR (Safe from overlap) */}
            <div className="pt-6 md:pt-8 px-4 md:px-10 pb-4 border-b border-white/10 relative z-30 bg-black/20">
              <h3 className="text-xl md:text-3xl font-serif text-white text-center mb-3 md:mb-4 drop-shadow-md">
                {currentMenu.title}
              </h3>

              {/* In-Book Search Bar */}
              <div className="relative w-full max-w-md mx-auto">
                <div className="relative flex items-center bg-black/80 backdrop-blur-md rounded-lg p-1.5 shadow-xl focus-within:ring-2 focus-within:ring-amber-300 transition-all">
                  <div className="pl-2.5 pr-1.5 text-amber-400 flex items-center">
                    <Search size={18} className="stroke-[2.5]" />
                  </div>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${activePage === "food" ? "food" : "drinks"} menu...`}
                    className="w-full bg-transparent py-1 px-1.5 text-xs md:text-sm text-white placeholder-amber-200/60 font-medium focus:outline-none min-w-0"
                  />

                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="px-2 py-1 text-amber-200 hover:text-white transition flex items-center shrink-0"
                      aria-label="Clear search"
                    >
                      <X size={16} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="px-3 py-1.5 bg-gradient-to-r from-amber-300 to-amber-200 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold rounded-md text-[11px] tracking-wider uppercase shadow-md transition-all active:scale-95 shrink-0"
                    >
                      Search
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* FLIPPING CONTENT AREA */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ rotateY: -85, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 85, opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
                style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                className="p-4 md:p-10 max-h-[50vh] md:max-h-[55vh] overflow-y-auto shadow-inner relative z-20"
              >
                {filteredCategories.length > 0 ? (
                  <div className="grid grid-cols-1 gap-y-6 md:gap-y-8">
                    {filteredCategories.map((cat, i) => (
                      <div key={i}>
                        <h4 className="text-base md:text-lg font-semibold text-white border-b border-white/25 pb-2 mb-3 tracking-wide">
                          {cat.title}
                        </h4>
                        <div className="space-y-3">
                          {cat.items.map((item, j) => (
                            <div key={j} className="flex justify-between items-start gap-3">
                              <div>
                                <p className="text-sm font-medium text-white/95 leading-tight">
                                  {item.name}
                                </p>
                                {item.desc && (
                                  <p className="text-xs text-yellow-100/80 italic mt-0.5">
                                    {item.desc}
                                  </p>
                                )}
                              </div>
                              <span className="text-sm text-white font-semibold whitespace-nowrap">
                                {item.price || "-"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 text-center text-amber-100/70 space-y-3">
                    <p className="text-sm italic">
                      No {activePage} items match "{searchQuery}"
                    </p>
                    <button
                      onClick={() =>
                        setActivePage(activePage === "food" ? "drinks" : "food")
                      }
                      className="inline-block px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 rounded-full text-xs text-amber-200 transition"
                    >
                      Search in {activePage === "food" ? "Drinks" : "Food"} menu instead →
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}