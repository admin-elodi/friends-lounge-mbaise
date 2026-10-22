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
      className="relative min-h-[900px] z-30 text-white overflow-hidden border-t border-white/30"
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

        {/* MOBILE TOGGLE TABS */}
        <div className="flex md:hidden gap-2 mt-6 z-40 bg-amber-950/80 p-1.5 rounded-lg border border-amber-500/30 shadow-lg backdrop-blur-md">
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

          {/* DESKTOP BOOKMARK TABS */}
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
                      ? "bg-amber-100 text-amber-950 translate-x-0 font-bold"
                      : "bg-amber-950/80 text-amber-100 translate-x-2 hover:translate-x-0 hover:bg-amber-900"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Menu Book Body Container */}
          <div className="relative rounded-2xl md:rounded-r-2xl md:rounded-l-sm shadow-2xl shadow-black/90 border border-amber-500/30 overflow-hidden z-20">
            {/* Separate glass backdrop layer to preserve text sharpness */}
            <div className="absolute inset-0 bg-amber-950/30 backdrop-blur-md z-0" />

            {/* Unified Page depth effects */}
            <div className="absolute inset-0 translate-x-2 translate-y-2 rotate-[0.5deg] bg-amber-900/30 rounded-r-2xl rounded-l-sm -z-10 shadow-md" />
            <div className="absolute inset-0 translate-x-[12px] translate-y-[12px] rotate-[1deg] bg-amber-900/15 rounded-r-2xl rounded-l-sm -z-20 shadow-md" />

            {/* Spine shadow overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/60 z-30 pointer-events-none" />
            <div className="absolute left-0 top-0 bottom-0 w-4 md:w-6 bg-gradient-to-r from-black/60 via-black/20 to-transparent rounded-l-sm z-30 pointer-events-none" />

            {/* STATIC HEADER & IN-BOOK SEARCH BAR */}
            <div className="pt-6 md:pt-8 px-4 md:px-10 pb-4 border-b border-amber-500/20 relative z-30 bg-black/30">
              <h3 className="text-xl md:text-3xl font-serif text-amber-100 text-center mb-3 md:mb-4 drop-shadow-md">
                {currentMenu.title}
              </h3>

              {/* In-Book Search Bar */}
              <div className="relative w-full max-w-md mx-auto">
                <div className="relative flex items-center bg-black/70 rounded-lg p-1.5 shadow-xl border border-amber-500/30 focus-within:ring-2 focus-within:ring-amber-300 transition-all">
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
                        <h4 className="text-base md:text-lg font-semibold text-amber-200 border-b border-amber-500/25 pb-2 mb-3 tracking-wide">
                          {cat.title}
                        </h4>
                        <div className="space-y-3">
                          {cat.items.map((item, j) => (
                            <div key={j} className="flex justify-between items-start gap-3">
                              <div>
                                <p className="text-sm font-medium text-amber-50 leading-tight">
                                  {item.name}
                                </p>
                                {item.desc && (
                                  <p className="text-xs text-amber-200/80 italic mt-0.5">
                                    {item.desc}
                                  </p>
                                )}
                              </div>
                              <span className="text-sm text-amber-300 font-semibold whitespace-nowrap">
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