import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { menu } from "@/data/menuData";
import chipsImg from "@/assets/images/chips.webp";
import beerImg from "@/assets/images/beer.webp";

/**
 * Shared Food / Drinks menu popup.
 * This is the exact same showcase used on the Home page (Menu.jsx),
 * lifted out so it can also be triggered from the Footer (or anywhere
 * else) with the same look, data and behaviour.
 *
 * Usage:
 *   const [activeMenu, setActiveMenu] = useState(null); // null | "food" | "drinks"
 *   <MenuShowcaseModal activeMenu={activeMenu} onClose={() => setActiveMenu(null)} />
 */
export default function MenuShowcaseModal({ activeMenu, onClose }) {
  return (
    <AnimatePresence>
      {activeMenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60"
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0.1, scaleY: 0.7, y: 60 }}
            animate={{ opacity: 1, scaleX: 1, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, scaleX: 0.1, scaleY: 0.7, y: 60 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 1.1,
              duration: 0.85,
            }}
            className="relative w-[90%] max-w-5xl max-h-[88vh] overflow-y-auto bg-black/30 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            <div className="relative">
              <img
                src={activeMenu === "food" ? chipsImg : beerImg}
                alt="Menu Showcase"
                className="w-full h-18 md:h-18 object-cover brightness-110 contrast-125 saturate-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <h2 className="absolute bottom-4 left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-light font-serif text-white tracking-wider text-center drop-shadow-xl whitespace-nowrap">
                {activeMenu === "food" ? "Food Menu" : "Drinks Menu"}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white/80 hover:text-white bg-black/50 rounded-full p-2 backdrop-blur-md transition-all hover:scale-110 z-10"
            >
              <X size={22} />
            </button>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {menu[activeMenu].categories.map((cat, i) => (
                  <div key={i} className="space-y-5">
                    <h3 className="text-xl md:text-xl font-light text-amber-100 tracking-wide border-b border-amber-500/30 pb-2">
                      {cat.title}
                    </h3>
                    <div className="space-y-4">
                      {cat.items.map((it, j) => (
                        <div
                          key={j}
                          className="flex justify-between items-start gap-4 py-2 border-b border-white/5 last:border-none hover:bg-white/5 rounded transition-colors"
                        >
                          <div className="flex-1">
                            <p className="text-white font-medium text-base md:text-lg">{it.name}</p>
                            <p className="text-xs md:text-sm text-gray-400 italic mt-1">{it.desc}</p>
                          </div>
                          <span className="text-amber-100 font-light text-base md:text-lg whitespace-nowrap">
                            {it.price || "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex justify-center border-t border-white/5 pt-8 pb-4">
                <button
                  onClick={onClose}
                  className="group flex items-center gap-2 px-8 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300"
                >
                  <span className="text-sm uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                    Close Menu
                  </span>
                  <X size={14} className="text-gray-500 group-hover:text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}