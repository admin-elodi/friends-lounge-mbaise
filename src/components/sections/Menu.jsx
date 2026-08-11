import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Wine } from "lucide-react";

import chefsBg from "@/assets/images/friends-staff.webp";
import { menu } from "@/data/menuData";

const pages = ["food", "drinks"];

export default function Menu() {
  const [activePage, setActivePage] = useState("food"); // Food is open on load
  const currentMenu = menu[activePage];

  return (
    <section
      className="relative min-h-[900px] z-30 text-white overflow-hidden border-t border-white"
      style={{
        backgroundImage: `url(${chefsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex flex-col items-center py-16 md:py-24 px-4">
        <h2 className="text-xl md:text-3xl font-light font-serif tracking-widest text-center drop-shadow-2xl">
          Explore our Menu
        </h2>
        <p className="mt-3 text-xs md:text-sm text-white/60 uppercase tracking-[0.3em]">
          Flip the page for Food or Drinks
        </p>

        {/* THE MENU BOOK */}
        <div
          className="relative w-full max-w-3xl mt-14 md:mt-16"
          style={{ perspective: "2200px" }}
        >
          {/* Ribbon bookmark — purely decorative, hangs from the top edge */}
          <div
            className="absolute -top-4 md:-top-5 left-6 md:left-10 z-30 w-4 md:w-5 h-14 md:h-20 bg-gradient-to-b from-red-600 to-red-800 shadow-md"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)" }}
          />

          {/* Bookmark tabs */}
          <div className="absolute right-0 md:-right-4 top-8 z-30 flex flex-col gap-3">
            {pages.map((page) => {
              const isActive = page === activePage;
              const Icon = page === "food" ? UtensilsCrossed : Wine;
              const label = page === "food" ? "Food" : "Drinks";
              return (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-l-lg text-xs md:text-sm font-semibold uppercase tracking-wide shadow-lg transition-all duration-300 ${
                    isActive
                      ? "bg-amber-50 text-amber-900 translate-x-0"
                      : "bg-amber-900/80 text-amber-100 translate-x-2 hover:translate-x-0 hover:bg-amber-800/90"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              );
            })}
          </div>

          {/* The page, and everything that sells the "book" behind it */}
          <div className="relative rounded-r-2xl rounded-l-sm shadow-2xl shadow-black/70">
            {/* Stacked pages underneath — static, peeking out at the right and
                bottom edges, so the top page reads as one sheet among many
                rather than a single floating card. */}
            <div className="hidden md:block absolute inset-0 translate-x-2.5 translate-y-2.5 rotate-[0.6deg] bg-amber-100/90 rounded-r-2xl rounded-l-sm -z-10 shadow-md" />
            <div className="hidden md:block absolute inset-0 translate-x-[18px] translate-y-[18px] rotate-[1.1deg] bg-amber-200/80 rounded-r-2xl rounded-l-sm -z-20 shadow-md" />
            {/* A single, smaller echo for mobile — same idea, lighter touch */}
            <div className="md:hidden absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-[0.5deg] bg-amber-100/80 rounded-r-2xl rounded-l-sm -z-10 shadow-sm" />

            {/* Page-edge ruffle — thin lines along the right edge, mimicking
                the visible edges of many thin pages in a closed book. */}
            <div className="absolute -right-1 md:-right-1.5 top-3 bottom-3 w-1 md:w-1.5 flex flex-col justify-between z-0 opacity-70 pointer-events-none">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="h-px bg-amber-950/25" />
              ))}
            </div>

            {/* Spine shadow — deepened near the binding, softening outward,
                to suggest the curve of paper close to a bound edge. */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/50 z-10 pointer-events-none" />
            <div className="absolute left-0 top-0 bottom-0 w-4 md:w-6 bg-gradient-to-r from-black/45 via-black/15 to-transparent rounded-l-sm z-10 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ rotateY: -85, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 85, opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
                style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                className="relative z-20 bg-black/50 border border-white/15 rounded-r-2xl rounded-l-sm max-h-[65vh] md:max-h-[70vh] overflow-y-auto"
              >
                {/* Corner page-curl, desktop only — a subtle fold at the
                    bottom-right corner, another classic "this is paper" cue. */}
                <div className="hidden md:block absolute bottom-0 right-0 w-9 h-9 pointer-events-none">
                  <div
                    className="absolute inset-0 bg-black/25"
                    style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-tl from-amber-50/90 to-orange-100/70"
                    style={{ clipPath: "polygon(100% 15%, 100% 100%, 15% 100%)" }}
                  />
                </div>

                <div className="p-6 md:p-10">
                  <h3 className="text-2xl md:text-3xl font-serif text-white text-center mb-8">
                    {currentMenu.title}
                  </h3>

                  <div className="grid grid-cols-1 gap-y-8">
                    {currentMenu.categories.map((cat, i) => (
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
                                {item.price || "—"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Page indicator dots */}
          <div className="flex justify-center gap-2 mt-6">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                aria-label={`Go to ${page} page`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  page === activePage ? "w-6 bg-amber-300" : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}