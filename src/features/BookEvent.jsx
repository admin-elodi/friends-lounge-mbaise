import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import Logo from "@/assets/images/friends-logo.webp";
import ClockImage from "@/assets/images/clock.webp";

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

    if (
      !form.name ||
      !form.phone ||
      !form.eventType ||
      !form.guests ||
      !form.date ||
      !form.time
    ) {
      return alert("Please fill all required fields");
    }

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
        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* CENTER WRAPPER */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">

        {/* Modal */}
        <motion.div
          initial={{ y: 30, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="
            w-full max-w-[480px]
            rounded-xl shadow-2xl
            relative overflow-hidden
            border-1 border-white
          "
          style={{
            backgroundImage: `url(${ClockImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/75" />

          {/* SCROLL CONTAINER */}
          <div
            className="
              relative z-10
              max-h-[85vh]
              overflow-y-auto
              px-5 py-6
            "
          >
            {/* Header Row */}
            <div className="flex items-center justify-between mb-6">

              {/* Logo - left – now rotates like in FoodOrderModal */}
              <motion.img
                src={Logo}
                className="w-20"
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Text - right */}
              <div className="text-right">
                <h2 className="text-xl font-bold text-white">
                  Book Your Event
                </h2>
                <p className="text-gray-300 text-sm">
                  Let’s make it unforgettable
                </p>
              </div>
            </div>

            {/* Close */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="
                absolute top-1 right-4
                w-10 h-10 rounded-full 
                bg-black/60 border border-white/20
                flex items-center justify-center
                text-white z-20
              "
            >
              <X size={18} />
            </motion.button>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 pb-8"
            >
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

              {/* EVENT TYPE (BLACK BG) */}
              <select
                required
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
                className="input bg-black text-white"
              >
                <option value="">Event Type</option>
                {eventTypes.map((t) => (
                  <option
                    key={t}
                    value={t}
                    className="bg-black text-white"
                  >
                    {t}
                  </option>
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

              {/* CTA */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="
                  w-full py-3 rounded-xl 
                  bg-red-600 hover:bg-red-700
                  text-white text-sm font-semibold
                "
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
              background:rgba(255,255,255,.12);
              border:1px solid rgba(255,255,255,.2);
              color:white;
              font-size:14px;
            }
            .input::placeholder{
              color:rgba(255,255,255,.6);
            }
          `}</style>
        </motion.div>
      </div>
    </>,
    document.body
  );
}