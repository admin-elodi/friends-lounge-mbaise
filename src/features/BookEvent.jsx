// src/features/BookEvent.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import Logo from "@/assets/images/friends-logo.webp";
import EventsImage from "@/assets/images/events.jpg";

const eventTypes = [
  "Wedding Reception",
  "Traditional Marriage",
  "Birthday Celebration",
  "Burial Ceremony",
  "Chieftaincy Title",
  "Club / Association Meeting",
  "Church Programme",
  "Corporate Event",
  "Other",
];

export default function BookEvent({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    guests: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const msg = `
NEW EVENT BOOKING @ Friends' Lounge

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email || "—"}
Event: ${form.eventType}
Guests: ${form.guests}
Date: ${form.date}
Time: ${form.time}

${form.message || ""}
`.trim();

    window.open(
      `https://wa.me/2347066064379?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      {/* CENTER WRAPPER */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">

        {/* Modal */}
        <motion.div
          initial={{ y: 30, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 30, scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="
            pointer-events-auto
            w-full max-w-[480px]
            bg-black/40 backdrop-blur-2xl 
            border border-white/20 
            rounded-lg shadow-2xl 
            overflow-hidden flex flex-col 
            max-h-[82vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative h-32">
            <img
              src={EventsImage}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <div className="absolute inset-0 flex items-center left-4">
              <img
                src={Logo}
                className="w-24 drop-shadow-2xl animate-floatSlow"
              />
            </div>
          </div>

          {/* Close */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-3 right-3 
            w-10 h-10 rounded-full 
            bg-black/60 border border-white/20
            flex items-center justify-center
            text-white"
          >
            <X size={18} />
          </motion.button>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 pt-4 pb-6">
            <h2 className="text-xl font-bold text-white">
              Book Your Event
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Let’s make it unforgettable
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="input"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  required
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="input"
                />
                <input
                  name="email"
                  placeholder="Email (optional)"
                  value={form.email}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <select
                required
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
                className="input"
              >
                <option value="">Event Type</option>
                {eventTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="input"
                />
                <input
                  required
                  name="time"
                  type="time"
                  value={form.time}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <input
                required
                name="guests"
                type="number"
                min="20"
                placeholder="Guests"
                value={form.guests}
                onChange={handleChange}
                className="input"
              />

              <textarea
                name="message"
                rows="3"
                placeholder="Special requests"
                value={form.message}
                onChange={handleChange}
                className="input resize-none"
              />

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-xl 
                bg-red-600 text-white text-sm"
              >
                Send via WhatsApp
              </motion.button>
            </form>
          </div>

          <style>{`
            .input{
              width:100%;
              padding:12px;
              border-radius:12px;
              background:rgba(255,255,255,.1);
              border:1px solid rgba(255,255,255,.15);
              color:white;
              font-size:14px;
            }
            @keyframes floatSlow{
              0%,100%{transform:translateY(0)}
              50%{transform:translateY(-6px)}
            }
            .animate-floatSlow{animation:floatSlow 4s ease-in-out infinite}
          `}</style>
        </motion.div>
      </div>
    </>,
    document.body
  );
}
