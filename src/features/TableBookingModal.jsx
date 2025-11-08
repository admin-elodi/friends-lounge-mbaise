// src/features/TableBookingModal.jsx
import React from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { FaUtensils, FaGlassCheers, FaMusic, FaCheckCircle, FaCalendarAlt, FaClock, FaTimes } from "react-icons/fa";

const experiences = [
  { id: "heritage", name: "The Heritage Feast", icon: <FaUtensils className="text-white/70" />, price: "₦45,000", capacity: "Up to 6" },
  { id: "sunset", name: "The Sunset Grill", icon: <FaGlassCheers className="text-white/70" />, price: "₦38,000", capacity: "Up to 5" },
  { id: "midnight", name: "The Midnight Lounge", icon: <FaMusic className="text-white/70" />, price: "₦30,000", capacity: "Up to 4" },
];

const DropdownCard = ({ children, className = "", onClick }) => (
  <motion.div
    whileHover={{ y: -2, scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`relative p-5 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 transition-all duration-300 hover:border-red-500/30 hover:bg-gray-800/50 cursor-pointer ${className}`}
  >
    {children}
  </motion.div>
);

export const TableBookingModal = ({
  isOpen,
  onClose,
  selectedExp,
  setSelectedExp,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  isBooking,
  setIsBooking,
  booked,
  setBooked,
  handleReserve,
}) => {
  if (!isOpen) return null;

  const modalContent = (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[999] bg-black/30 flex items-center justify-center p-4"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 24, mass: 0.8, duration: 0.25 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-full mx-auto bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/25 p-6 max-h-[90vh] overflow-y-auto z-[1000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white text-xl z-10 transition-colors"
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <h3 className="text-xl font-bold text-white text-center mb-6 tracking-wider">
          Reserve a Table • Friends Lounge Mbaise
        </h3>

        {/* Experience Selection */}
        <div className="space-y-4 mb-6">
          {experiences.map((exp) => (
            <DropdownCard
              key={exp.id}
              onClick={() => setSelectedExp(exp)}
              className={selectedExp?.id === exp.id ? "border-red-500/50 bg-red-900/20" : ""}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {exp.icon}
                  <span className="text-white font-semibold">{exp.name}</span>
                </div>
                <div className="text-white/80 text-sm">{exp.capacity}</div>
              </div>
              <div className="mt-2 text-red-400 font-bold">{exp.price}</div>
            </DropdownCard>
          ))}
        </div>

        {/* Date & Time */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          />
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          >
            <option value="">Select Time</option>
            {["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Reserve Button */}
        <button
          onClick={handleReserve}
          disabled={!selectedExp || !selectedDate || !selectedTime || isBooking || booked}
          className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
            !selectedExp || !selectedDate || !selectedTime || isBooking || booked
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isBooking ? "Booking..." : booked ? "Booked!" : "Reserve Table"}
        </button>

        {/* Success Message */}
        {booked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-green-900/30 border border-green-500 rounded-xl text-green-300 text-center text-sm"
          >
            <p className="font-bold">Reservation Confirmed!</p>
            <p>
              Your table for <span className="text-white">{selectedExp?.name}</span> is booked on{" "}
              <span className="text-white">{selectedDate}</span> at <span className="text-white">{selectedTime}</span>.
            </p>
          </motion.div>
        )}
      </motion.div>
    </>
  );

  return createPortal(modalContent, document.body);
};
