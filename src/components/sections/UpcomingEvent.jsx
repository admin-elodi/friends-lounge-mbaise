// src/components/sections/UpcomingEvent.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Music2, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { useEvent } from "@/context/EventContext";

const waLink = (number, text) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

// The Home-page banner — auto-shows on load when there's a current event.
// Reads from the shared EventContext (see src/context/EventContext.jsx)
// rather than subscribing to Firestore itself, so there's only ever one
// live listener shared with the header's EventNavButton.
//
// Persistent "check for events anytime" access now lives in the header
// nav (EventNavButton), not here — this component only needs to handle
// the auto-show-on-load banner and its dismiss.
export default function UpcomingEvent() {
  const { currentEvent, loading } = useEvent();
  const [dismissed, setDismissed] = useState(false);
  const [flyerOpen, setFlyerOpen] = useState(false);

  if (loading || !currentEvent || dismissed) return null;

  return (
    <>
      <section className="relative bg-gradient-to-br from-red-950 via-red-900 to-amber-950 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 items-center">
            {/* Flyer — the real marketing artwork, tappable for a full view */}
            {currentEvent.flyerUrl && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onClick={() => setFlyerOpen(true)}
                className="md:col-span-2 relative rounded-xl overflow-hidden border border-white/15 shadow-2xl shadow-black/50 group"
              >
                <img
                  src={currentEvent.flyerUrl}
                  alt={`${currentEvent.title} flyer`}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs uppercase tracking-widest font-semibold bg-black/60 px-3 py-1.5 rounded-full">
                    View Full Flyer
                  </span>
                </div>
              </motion.button>
            )}

            {/* Structured details — accessible, scannable, and readable by search engines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={currentEvent.flyerUrl ? "md:col-span-3" : "md:col-span-5"}
            >
              {currentEvent.presenter && (
                <p className="text-amber-300 text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold mb-2">
                  {currentEvent.presenter}
                </p>
              )}
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold leading-tight">
                {currentEvent.title}
              </h2>
              {currentEvent.subtitle && (
                <p className="text-amber-200/80 text-sm md:text-base mt-1">
                  {currentEvent.subtitle}
                </p>
              )}
              {currentEvent.tagline && (
                <p className="text-white/70 text-sm md:text-base mt-4 font-light leading-relaxed max-w-md">
                  {currentEvent.tagline}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 max-w-md">
                {currentEvent.dateLabel && (
                  <div className="flex items-center gap-2.5 text-sm text-white/85">
                    <Calendar size={16} className="text-amber-300 flex-shrink-0" />
                    {currentEvent.dateLabel}
                  </div>
                )}
                {currentEvent.timeLabel && (
                  <div className="flex items-center gap-2.5 text-sm text-white/85">
                    <Clock size={16} className="text-amber-300 flex-shrink-0" />
                    {currentEvent.timeLabel}
                  </div>
                )}
                {currentEvent.venue && (
                  <div className="flex items-center gap-2.5 text-sm text-white/85 sm:col-span-2">
                    <MapPin size={16} className="text-amber-300 flex-shrink-0" />
                    {currentEvent.venue}
                  </div>
                )}
              </div>

              {currentEvent.performers?.length > 0 && (
                <div className="flex items-start gap-2.5 mt-4 max-w-md">
                  <Music2 size={16} className="text-amber-300 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/70">
                    {currentEvent.performers.join(" · ")}
                  </p>
                </div>
              )}

              {currentEvent.highlights?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {currentEvent.highlights.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {currentEvent.whatsappNumber && (
                <a
                  href={waLink(
                    currentEvent.whatsappNumber,
                    `Hello, I'd like to know more about ${currentEvent.title}...`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold transition-colors"
                >
                  <FaWhatsapp size={17} />
                  Chat About This Event
                </a>
              )}
            </motion.div>
          </div>
        </div>

        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss event announcement"
          className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white/70 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </section>

      {/* Full flyer lightbox */}
      <AnimatePresence>
        {flyerOpen && currentEvent.flyerUrl && (
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
              src={currentEvent.flyerUrl}
              alt={`${currentEvent.title} flyer`}
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
