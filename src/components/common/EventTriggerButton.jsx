// src/components/common/EventTriggerButton.jsx
//
// Just the button UI - safe to render more than once (desktop nav, mobile
// nav) because it holds no state of its own. All real state lives in
// EventContext, and the actual modal is rendered exactly once elsewhere
// (see EventModal.jsx, mounted once in App.jsx).

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Bell } from "lucide-react";
import { useEvent } from "@/context/EventContext";

export default function EventTriggerButton({ className = "" }) {
  const { currentEvent, openModal } = useEvent();

  return (
    <motion.button
      onClick={() => openModal("announcement")}
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
  );
}
