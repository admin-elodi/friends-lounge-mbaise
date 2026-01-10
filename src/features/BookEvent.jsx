// src/features/BookEvent.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Clock } from "lucide-react";
import Logo from "@/assets/images/friends-logo.webp";
import EventsImage from "@/assets/images/events.webp"; // ← Right side image

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
    name: "", phone: "", email: "", eventType: "", guests: "", date: "", time: "", message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `
NEW EVENT BOOKING @ Friends' Lounge

👤 Name: ${form.name}
📞 Phone: ${form.phone}
✉️ Email: ${form.email || "—"}
🎉 Event: ${form.eventType}
👥 Guests: ${form.guests}
📅 Date: ${form.date}
🕒 Time: ${form.time}
${form.message ? `\n💬 Message:\n${form.message}` : ""}
    `.trim();

    window.open(`https://wa.me/2347066064379?text=${encodeURIComponent(message)}`, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/30 backdrop-blur-lg px-4 pt-16 pb-10 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 450, damping: 30, mass: 0.75 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[480px] bg-black/35 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-xl overflow-hidden flex flex-col"
          >
            {/* Header with logo left + image right */}
            <div className="relative h-32 bg-gradient-to-r from-black/70 to-transparent flex items-center px-6 border-b border-white/10">
              <img
                src={Logo}
                alt="Friends Lounge"
                className="w-32 md:w-40 object-contain opacity-95 z-10"
              />
              <div className="absolute right-0 top-0 bottom-0 w-1/2">
                <img
                  src={EventsImage}
                  alt="Events"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-transparent to-transparent" />
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 text-white/80 hover:text-white transition-colors"
            >
              <X size={22} strokeWidth={2.5} />
            </button>

            <div className="flex-1 px-6 pb-8 pt-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <h2 className="text-2xl font-bold text-white mb-1">Book Your Event</h2>
              <p className="text-gray-400 text-sm mb-6">Let's make it unforgettable</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* All form fields remain the same as previous version */}
                <input required name="name" placeholder="Full Name *" value={form.name} onChange={handleChange} className="w-full px-5 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:border-red-500/50 focus:bg-white/15 outline-none transition-all duration-300 text-sm" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input required name="phone" type="tel" placeholder="Phone (WhatsApp) *" value={form.phone} onChange={handleChange} className="w-full px-5 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:border-red-500/50 focus:bg-white/15 outline-none transition-all duration-300 text-sm" />
                  <input name="email" type="email" placeholder="Email (optional)" value={form.email} onChange={handleChange} className="w-full px-5 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:border-red-500/50 focus:bg-white/15 outline-none transition-all duration-300 text-sm" />
                </div>

                <select required name="eventType" value={form.eventType} onChange={handleChange} className="w-full px-5 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white focus:border-red-500/50 focus:bg-white/15 outline-none transition-all duration-300 appearance-none text-sm">
                  <option value="">Event Type *</option>
                  {eventTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input required name="date" type="date" value={form.date} onChange={handleChange} className="w-full pl-11 pr-5 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white focus:border-red-500/50 focus:bg-white/15 outline-none transition-all duration-300 text-sm" />
                  </div>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input required name="guests" type="number" min="20" placeholder="Guests *" value={form.guests} onChange={handleChange} className="w-full pl-11 pr-5 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:border-red-500/50 focus:bg-white/15 outline-none transition-all duration-300 text-sm" />
                  </div>
                </div>

                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input required name="time" type="time" value={form.time} onChange={handleChange} className="w-full pl-11 pr-5 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white focus:border-red-500/50 focus:bg-white/15 outline-none transition-all duration-300 text-sm" />
                </div>

                <textarea name="message" placeholder="Special requests (optional)" value={form.message} onChange={handleChange} rows={3} className="w-full px-5 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:border-red-500/50 focus:bg-white/15 outline-none transition-all duration-300 resize-none text-sm" />

                <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 space-y-2">
                  <p className="text-red-400 font-medium flex items-center gap-1.5"><span className="text-sm">★</span> From ₦500,000</p>
                  <p>• 50% deposit to secure date</p>
                  <p>• Chairs, tables, sound, security & cleaning included</p>
                  <p className="text-green-400 mt-2">Team will contact you within 30 mins</p>
                </div>

                <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }} type="submit" className="w-full mt-6 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded-xl font-medium text-white tracking-wide shadow-lg shadow-red-900/20 transition-all duration-300 text-sm">
                  Send via WhatsApp
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}