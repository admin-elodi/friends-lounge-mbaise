// src/features/BookEvent.jsx
import React, { useState } from "react";
import { X, Calendar, Users, Info } from "lucide-react";
import { motion } from "framer-motion";

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

  if (!isOpen) return null;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `
      NEW EVENT BOOKING
      Name: ${form.name}
      Phone: ${form.phone}
      Email: ${form.email || "—"}
      Event: ${form.eventType}
      Guests: ${form.guests}
      Date: ${form.date}
      Time: ${form.time}
      Message: ${form.message || "—"}
    `.trim();

    const whatsappUrl = `https://wa.me/2347066064379?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-lg px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md max-h-[95vh] overflow-y-auto bg-gray-900 border border-red-600/40 rounded-3xl shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white z-10 transition"
        >
          <X size={32} />
        </button>

        <div className="p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white tracking-wider mb-8">
            Book Your Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="text"
              required
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 text-lg focus:border-red-500 focus:outline-none transition"
            />

            <div className="grid grid-cols-1 gap-5">
              <input
                type="tel"
                required
                placeholder="Phone Number (WhatsApp)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition"
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition"
              />
            </div>

            <select
              required
              value={form.eventType}
              onChange={(e) => setForm({ ...form, eventType: e.target.value })}
              className="w-full px-5 py-4 bg-black border border-white/20 rounded-xl text-white text-base focus:border-red-500 focus:outline-none transition"
            >
              <option value="">Select Event Type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-5">
              <div className="relative">
                <Calendar className="absolute left-4 top-4 text-gray-400" size={20} />
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:border-red-500 focus:outline-none transition"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-4 top-4 text-gray-400" size={20} />
                <input
                  type="number"
                  required
                  placeholder="Guests"
                  min="20"
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition"
                />
              </div>
            </div>

            <input
              type="time"
              required
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:border-red-500 focus:outline-none transition"
            />

            <textarea
              placeholder="Special requests / Additional info (optional)"
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition resize-none"
            />

            {/* Pricing Info */}
            <div className="p-5 bg-gradient-to-r from-red-900/30 to-black border border-red-600/30 rounded-2xl space-y-3">
              <p className="flex items-center gap-2 text-yellow-400 font-semibold text-sm">
                <Info size={18} /> Venue Hire & Terms
              </p>
              <ul className="text-xs text-gray-300 space-y-1 leading-relaxed">
                <li>• Full hall hire starts from ₦500,000</li>
                <li>• 50% deposit required to secure date</li>
                <li>• Includes chairs, tables, sound, security, cleaning</li>
              </ul>
              <p className="text-green-400 font-bold text-sm">
                Our team will call you within 30 minutes
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded-xl font-black text-sm tracking-wider transition shadow-xl"
            >
              Send Booking Request via WhatsApp
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}