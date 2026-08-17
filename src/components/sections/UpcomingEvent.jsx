import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Music2, X } from "lucide-react";

import { upcomingEvent, isEventUpcoming } from "@/data/upcomingEvent";

// Swap this import for whatever the current event's flyer is named.
// Everything else on this page reads from src/data/upcomingEvent.js.
import flyerImage from "@/assets/images/iri-ji.jpg";

export default function UpcomingEvent() {
  // Dismissing hides the full banner but leaves a small recall pill behind
  // (see below) — no page reload needed to bring it back, and nothing is
  // remembered in localStorage, so a refresh or new visitor sees the full
  // banner again regardless.
  const [dismissed, setDismissed] = useState(false);
  const [flyerOpen, setFlyerOpen] = useState(false);

  if (!isEventUpcoming(upcomingEvent)) return null;

  const handleDismiss = () => setDismissed(true);

  // Dismissed state: a small, unobtrusive pill instead of nothing at all —
  // one tap brings the full banner straight back.
  if (dismissed) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setDismissed(false)}
        aria-label={`Show ${upcomingEvent.title} announcement again`}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-red-950/90 hover:bg-red-900 border border-amber-400/40 shadow-lg shadow-black/40 backdrop-blur-sm text-white text-xs font-medium transition-colors"
      >
        <Calendar size={14} className="text-amber-300 flex-shrink-0" />
        {upcomingEvent.title}
      </motion.button>
    );
  }

  return (
    <>
      <section className="relative bg-gradient-to-br from-red-950 via-red-900 to-amber-950 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 items-center">
            {/* Flyer — the real marketing artwork, tappable for a full view */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => setFlyerOpen(true)}
              className="md:col-span-2 relative rounded-xl overflow-hidden border border-white/15 shadow-2xl shadow-black/50 group"
            >
              <img
                src={flyerImage}
                alt={`${upcomingEvent.title} flyer`}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs uppercase tracking-widest font-semibold bg-black/60 px-3 py-1.5 rounded-full">
                  View Full Flyer
                </span>
              </div>
            </motion.button>

            {/* Structured details — accessible, scannable, and readable by search engines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-3"
            >
              <p className="text-amber-300 text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold mb-2">
                {upcomingEvent.presenter}
              </p>
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold leading-tight">
                {upcomingEvent.title}
              </h2>
              <p className="text-amber-200/80 text-sm md:text-base mt-1">
                {upcomingEvent.subtitle}
              </p>
              <p className="text-white/70 text-sm md:text-base mt-4 font-light leading-relaxed max-w-md">
                {upcomingEvent.tagline}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 max-w-md">
                <div className="flex items-center gap-2.5 text-sm text-white/85">
                  <Calendar size={16} className="text-amber-300 flex-shrink-0" />
                  {upcomingEvent.dateLabel}
                </div>
                <div className="flex items-center gap-2.5 text-sm text-white/85">
                  <Clock size={16} className="text-amber-300 flex-shrink-0" />
                  {upcomingEvent.timeLabel}
                </div>
                <div className="flex items-center gap-2.5 text-sm text-white/85 sm:col-span-2">
                  <MapPin size={16} className="text-amber-300 flex-shrink-0" />
                  {upcomingEvent.venue}
                </div>
              </div>

              {upcomingEvent.performers?.length > 0 && (
                <div className="flex items-start gap-2.5 mt-4 max-w-md">
                  <Music2 size={16} className="text-amber-300 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/70">
                    {upcomingEvent.performers.join(" · ")}
                  </p>
                </div>
              )}

              {upcomingEvent.highlights?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {upcomingEvent.highlights.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          aria-label="Dismiss event announcement"
          className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white/70 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </section>

      {/* Full flyer lightbox */}
      <AnimatePresence>
        {flyerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFlyerOpen(false)}
            className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={flyerImage}
              alt={`${upcomingEvent.title} flyer`}
              className="max-w-full max-h-full rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setFlyerOpen(false)}
              aria-label="Close flyer view"
              className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
