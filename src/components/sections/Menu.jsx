import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Wine, Search, X } from "lucide-react";

import chefsBg from "@/assets/images/sunsets.png";
import { menu } from "@/data/menuData";

const pages = ["food", "drinks"];

export default function Menu() {
  const [activePage, setActivePage] = useState("food");
  const [searchQuery, setSearchQuery] = useState("");

  const currentMenu = menu[activePage];

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
        return { ...cat, items: matchingItems };
      })
      .filter((cat) => cat.items.length > 0);
  }, [currentMenu, searchQuery]);

  return (
    <section
      className="relative min-h-screen z-30 text-white overflow-hidden border-t border-white/30 flex flex-col"
      style={{
        backgroundImage: `url(${chefsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      <div className="relative z-10 flex-1 flex flex-col items-center py-12 md:py-24 px-4 w-full h-full">
        <h2 className="text-xl md:text-4xl font-light font-serif tracking-[0.25em] text-center drop-shadow-2xl mb-8 md:mb-12">
          Explore our Menu
        </h2>

        {/* MOBILE TOGGLE TABS */}
        <div className="flex md:hidden gap-2 mb-6 z-40 bg-amber-950/80 p-1.5 rounded-lg border border-amber-500/30 shadow-lg backdrop-blur-md">
          {pages.map((page) => {
            const isActive = page === activePage;
            const Icon = page === "food" ? UtensilsCrossed : Wine;
            const label = page === "food" ? "Food" : "Drinks";
            return (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wide transition-all ${
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
        {/* Expanded to max-w-7xl to take up much more horizontal space on large desktop screens */}
        <div 
          className="relative w-[calc(100%+2rem)] -mx-4 sm:w-full sm:max-w-7xl sm:mx-auto md:mt-4"
          style={{ perspective: "2200px" }}
        >
          {/* Ribbon bookmark */}
          <div
            className="absolute -top-4 md:-top-6 left-6 md:left-16 z-40 w-5 md:w-6 h-16 md:h-24 bg-gradient-to-b from-red-600 to-red-800 shadow-md"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)" }}
          />

          {/* DESKTOP BOOKMARK TABS */}
          <div className="hidden md:flex absolute -right-6 top-12 z-40 flex-col gap-4">
            {pages.map((page) => {
              const isActive = page === activePage;
              const Icon = page === "food" ? UtensilsCrossed : Wine;
              const label = page === "food" ? "Food" : "Drinks";
              return (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`flex items-center gap-2.5 pl-4 pr-6 py-3.5 rounded-l-xl text-sm font-semibold uppercase tracking-wide shadow-lg transition-all duration-300 ${
                    isActive
                      ? "bg-amber-100 text-amber-950 translate-x-0 font-bold"
                      : "bg-amber-950/80 text-amber-100 translate-x-3 hover:translate-x-0 hover:bg-amber-900"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Menu Book Body Container */}
          <div className="relative rounded-xl md:rounded-r-3xl md:rounded-l-sm shadow-2xl shadow-black/90 border border-amber-500/30 overflow-hidden z-20 bg-black/40">
            <div className="absolute inset-0 bg-amber-950/20 backdrop-blur-md z-0" />

            {/* Spine shadows */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/60 z-30 pointer-events-none" />
            <div className="absolute left-0 top-0 bottom-0 w-6 md:w-12 bg-gradient-to-r from-black/60 via-black/20 to-transparent rounded-l-sm z-30 pointer-events-none" />

            {/* STATIC HEADER & IN-BOOK SEARCH BAR */}
            <div className="pt-8 md:pt-12 px-4 md:px-16 pb-6 md:pb-8 border-b border-amber-500/20 relative z-30 bg-black/40">
              <h3 className="text-2xl md:text-4xl font-serif text-amber-100 text-center mb-6 md:mb-8 drop-shadow-md">
                {currentMenu.title}
              </h3>

              <div className="relative w-full max-w-2xl mx-auto">
                <div className="relative flex items-center bg-black/60 rounded-xl p-2 md:p-2.5 shadow-xl border border-amber-500/30 focus-within:ring-2 focus-within:ring-amber-300 transition-all">
                  <div className="pl-3 pr-2 text-amber-400 flex items-center">
                    <Search size={20} className="stroke-[2.5]" />
                  </div>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${activePage} menu...`}
                    className="w-full bg-transparent py-1.5 px-2 text-sm md:text-base text-white placeholder-amber-200/50 font-medium focus:outline-none min-w-0"
                  />

                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="px-3 py-1 text-amber-200 hover:text-white transition flex items-center shrink-0"
                    >
                      <X size={18} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="px-4 py-2 md:px-6 md:py-2.5 bg-gradient-to-r from-amber-300 to-amber-200 text-amber-950 font-bold rounded-lg text-xs md:text-sm tracking-wider uppercase shadow-md shrink-0"
                    >
                      Search
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* FLIPPING CONTENT AREA (With Custom Scrollbar & MASONRY LAYOUT) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ rotateY: -85, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 85, opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
                style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                className="p-6 md:p-16 max-h-[55vh] md:max-h-[65vh] overflow-y-auto relative z-20 
                           scrollbar-thin scrollbar-thumb-amber-500/50 scrollbar-track-transparent hover:scrollbar-thumb-amber-500/80"
              >
                {filteredCategories.length > 0 ? (
                  /* 
                   * THE FIX: Changed from Grid to CSS Columns.
                   * This creates a natural flow, filling gaps automatically.
                   */
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-x-12 lg:gap-x-16">
                    {filteredCategories.map((cat, i) => (
                      /* break-inside-avoid stops categories from splitting across columns */
                      <div key={i} className="break-inside-avoid mb-10">
                        <h4 className="text-lg md:text-xl font-semibold text-amber-200 border-b border-amber-500/25 pb-2 md:pb-3 mb-4 md:mb-5 tracking-wider uppercase">
                          {cat.title}
                        </h4>
                        <div className="space-y-4 md:space-y-5">
                          {cat.items.map((item, j) => (
                            <div key={j} className="flex justify-between items-start gap-4 md:gap-6">
                              <div className="flex-1">
                                <p className="text-sm md:text-base font-medium text-amber-50 leading-snug">
                                  {item.name}
                                </p>
                                {item.desc && (
                                  <p className="text-xs md:text-sm text-amber-200/70 italic mt-1 leading-relaxed">
                                    {item.desc}
                                  </p>
                                )}
                              </div>
                              <span className="text-sm md:text-base text-amber-400 font-semibold whitespace-nowrap pt-0.5">
                                {item.price || "-"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 md:py-20 text-center text-amber-100/70 space-y-5">
                    <p className="text-base md:text-lg italic">
                      No {activePage} items match "{searchQuery}"
                    </p>
                    <button
                      onClick={() => setActivePage(activePage === "food" ? "drinks" : "food")}
                      className="inline-block px-6 py-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 rounded-full text-sm text-amber-200 transition-colors"
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