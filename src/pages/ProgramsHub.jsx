// src/pages/ProgramsHub.jsx
import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X, Soup, Hammer, Sparkles, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { programs } from "@/data/programsData";
import { ENQUIRY_WHATSAPP } from "@/data/soupKitchen";
import SoupKitchenStats from "@/components/programs/SoupKitchenStats";

const icons = {
  "soup-kitchen": Soup,
  "skills-table": Hammer,
};

const waLink = (text) =>
  `https://wa.me/${ENQUIRY_WHATSAPP}?text=${encodeURIComponent(text)}`;

export default function ProgramsHub() {
  const [activeSlug, setActiveSlug] = useState(null);
  const activeProgram = programs.find((p) => p.slug === activeSlug);

  return (
    <main className="relative min-h-screen bg-stone-600 text-stone-50 font-montserrat overflow-x-hidden pb-24">
      {/* HEADER */}
      <div className="relative z-10 pt-28 pb-14 text-center px-6">
        <p className="text-red-300 text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold mb-4">
          Friends Lounge
        </p>
        <h1 className="text-3xl md:text-5xl font-light font-playfair text-stone-50">
          Our Programs
        </h1>
        <p className="text-stone-300 mt-4 max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed">
          What we're doing for our community, today and ahead.
        </p>
      </div>

      <LayoutGroup>
        {/* GRID */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program) => {
            const Icon = icons[program.slug] || Sparkles;
            if (program.slug === activeSlug) return null; // shown expanded below

            return (
              <motion.button
                key={program.slug}
                layoutId={`card-${program.slug}`}
                onClick={() => setActiveSlug(program.slug)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group relative text-left rounded-2xl overflow-hidden p-8 min-h-[220px] flex flex-col justify-between bg-stone-700/70 border border-stone-500/40 shadow-lg shadow-black/20 hover:bg-stone-700 transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-full bg-red-500/15 flex items-center justify-center">
                      <Icon size={20} className="text-red-300" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-stone-800/60 text-stone-300">
                      {program.status}
                    </span>
                  </div>
                  <h2 className="mt-6 text-xl md:text-2xl font-semibold text-stone-50">
                    {program.title}
                  </h2>
                  <p className="mt-2 text-stone-300 text-sm">{program.tagline}</p>
                </div>

                <div className="flex items-center gap-2 mt-8 text-red-300 font-semibold text-sm">
                  See Details
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            );
          })}

          {/* Placeholder tile — signals room to grow without fabricating content */}
          <div className="rounded-2xl border-2 border-dashed border-stone-500/40 p-8 min-h-[220px] flex flex-col items-center justify-center text-center text-stone-400">
            <Sparkles size={22} className="mb-3" />
            <p className="text-sm uppercase tracking-widest font-medium">
              More Programs Coming Soon
            </p>
          </div>
        </div>

        {/* EXPANDED DETAIL — the reusable template */}
        <AnimatePresence>
          {activeProgram && (
            <motion.div
              layoutId={`card-${activeProgram.slug}`}
              className="fixed inset-0 z-50 overflow-y-auto bg-stone-600"
            >
              <div className="relative max-w-3xl mx-auto px-6 py-16 md:py-20">
                <button
                  onClick={() => setActiveSlug(null)}
                  className="fixed top-6 right-6 z-20 p-3 rounded-full bg-stone-700 hover:bg-stone-800 shadow-lg border border-stone-500/40 text-stone-200 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-6">
                    {(() => {
                      const Icon = icons[activeProgram.slug] || Sparkles;
                      return <Icon size={26} className="text-red-300" />;
                    })()}
                  </div>

                  <span className="inline-block text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-stone-800/60 text-stone-300 mb-5">
                    {activeProgram.status}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-semibold text-stone-50">
                    {activeProgram.title}
                  </h1>
                  <p className="mt-3 text-stone-300 text-base md:text-lg">
                    {activeProgram.tagline}
                  </p>

                  {activeProgram.hasLiveStats && (
                    <div className="mt-10">
                      <SoupKitchenStats />
                    </div>
                  )}

                  <p className="mt-10 text-lg md:text-xl font-light italic text-stone-100 leading-relaxed border-l-2 border-red-400/40 pl-5">
                    {activeProgram.detail.lead}
                  </p>

                  <div className="mt-10 space-y-8">
                    {activeProgram.detail.sections.map((section, i) => (
                      <div key={i}>
                        <h3 className="text-sm uppercase tracking-widest font-semibold text-stone-400 mb-2">
                          {section.heading}
                        </h3>
                        <p className="text-stone-200 leading-relaxed font-light">
                          {section.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  {activeProgram.slug === "soup-kitchen" && (
                    <a
                      href={waLink("Hello, I would like to support the Soup Kitchen Initiative...")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-10 inline-flex items-center gap-3 px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-sm uppercase tracking-widest rounded-full transition-all"
                    >
                      <FaWhatsapp size={18} />
                      Support or Volunteer
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </main>
  );
}
