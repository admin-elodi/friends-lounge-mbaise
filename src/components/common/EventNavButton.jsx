// src/components/common/EventNavButton.jsx
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Bell, X, Clock, MapPin, Music2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useEvent } from "@/context/EventContext";

const waLink = (number, text) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

// Lives in the nav (both desktop and mobile rows in Header.jsx) instead of
// floating over the Hero, so it works from any page, not just Home. Shows
// the current event in a modal when there is one, or a short "nothing
// right now" note when there isn't — the announcement feature stays a
// permanent, low-key fixture either way.
export default function EventNavButton({ className = "" }) {
  const { currentEvent } = useEvent();
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        aria-label={currentEvent ? `View ${currentEvent.title} announcement` : "Event announcements"}
        className={`relative flex items-center justify-center w-11 h-11 rounded-lg cursor-pointer border-2 shadow-[0_3px_0_rgba(0,0,0,0.4)] hover:shadow-[0_2px_0_rgba(0,0,0,0.4)] hover:translate-y-[1px] transition-all duration-200 ${
          currentEvent
            ? "bg-amber-500/30 border-amber-300 hover:bg-amber-500/45"
            : "bg-black/60 border-white/40 hover:bg-black/80"
        } ${className}`}
      >
        {currentEvent && (
          <motion.span
            className="absolute inset-0 rounded-lg border border-amber-300/60"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {currentEvent ? (
          <Calendar size={18} className="text-amber-100" />
        ) : (
          <Bell size={18} className="text-white/85" />
        )}
      </motion.button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-gradient-to-br from-red-950 via-red-900 to-amber-950 rounded-2xl border border-white/15 shadow-2xl p-6 md:p-8 text-white max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white/70 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {currentEvent ? (
                <>
                  {currentEvent.flyerUrl && (
                    <img
                      src={currentEvent.flyerUrl}
                      alt={`${currentEvent.title} flyer`}
                      className="w-full rounded-xl mb-5 border border-white/15"
                    />
                  )}
                  {currentEvent.presenter && (
                    <p className="text-amber-300 text-[10px] uppercase tracking-[0.3em] font-semibold mb-2">
                      {currentEvent.presenter}
                    </p>
                  )}
                  <h2 className="text-2xl font-playfair font-semibold leading-tight">
                    {currentEvent.title}
                  </h2>
                  {currentEvent.subtitle && (
                    <p className="text-amber-200/80 text-sm mt-1">{currentEvent.subtitle}</p>
                  )}
                  {currentEvent.tagline && (
                    <p className="text-white/70 text-sm mt-3 font-light leading-relaxed">
                      {currentEvent.tagline}
                    </p>
                  )}

                  <div className="space-y-2 mt-5">
                    {currentEvent.dateLabel && (
                      <div className="flex items-center gap-2.5 text-sm text-white/85">
                        <Calendar size={15} className="text-amber-300 flex-shrink-0" />
                        {currentEvent.dateLabel}
                      </div>
                    )}
                    {currentEvent.timeLabel && (
                      <div className="flex items-center gap-2.5 text-sm text-white/85">
                        <Clock size={15} className="text-amber-300 flex-shrink-0" />
                        {currentEvent.timeLabel}
                      </div>
                    )}
                    {currentEvent.venue && (
                      <div className="flex items-center gap-2.5 text-sm text-white/85">
                        <MapPin size={15} className="text-amber-300 flex-shrink-0" />
                        {currentEvent.venue}
                      </div>
                    )}
                  </div>

                  {currentEvent.performers?.length > 0 && (
                    <div className="flex items-start gap-2.5 mt-4">
                      <Music2 size={15} className="text-amber-300 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-white/70">{currentEvent.performers.join(" · ")}</p>
                    </div>
                  )}

                  {currentEvent.highlights?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
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
                      <FaWhatsapp size={16} />
                      Chat About This Event
                    </a>
                  )}
                </>
              ) : (
                <div className="text-center py-6">
                  <Bell size={28} className="text-amber-300 mx-auto mb-3" />
                  <p className="text-white/85 font-medium">No events right now — stay tuned!</p>
                </div>
              )}
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
