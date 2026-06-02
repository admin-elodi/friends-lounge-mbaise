// src/features/events/BookEvent.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import Logo from "@/assets/images/friends-logo.webp";
import RafiaTexture from "@/assets/images/rafia.jpg";

/* ---------------- EVENT TYPES ---------------- */

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

/* ---------------- PRICING & SPACES ---------------- */

const SPACE_OPTIONS = [
  { name: "Full facility for event", price: 2005000 },
  { name: "Roof Top", price: 307500 },
  { name: "Birthday space (Outside bar)", price: 20500 },
  { name: "Picture space", price: 10200 },
];

/* ---------------- LIVE ANALOG CLOCK ---------------- */

function LiveClockBackground() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
      <div className="relative w-[260px] sm:w-[300px] aspect-square rounded-full bg-white shadow-xl">
        <div
          className="absolute w-[6px] h-[65px] bg-black top-1/2 left-1/2 origin-bottom rounded-full"
          style={{
            transform: `translate(-50%, -100%) rotate(${hours * 30 + minutes * 0.5}deg)`,
          }}
        />
        <div
          className="absolute w-[4px] h-[95px] bg-black top-1/2 left-1/2 origin-bottom rounded-full"
          style={{
            transform: `translate(-50%, -100%) rotate(${minutes * 6}deg)`,
          }}
        />
        <div
          className="absolute w-[2px] h-[110px] bg-red-600 top-1/2 left-1/2 origin-bottom"
          style={{
            transform: `translate(-50%, -100%) rotate(${seconds * 6}deg)`,
          }}
        />
        <div className="absolute w-3 h-3 bg-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}

/* ---------------- MAIN MODAL ---------------- */

export default function BookEvent({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    selectedSpace: "", // Added to track selection
    eventType: "",
    guests: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Get price for the selected space
  const selectedSpaceData = SPACE_OPTIONS.find(s => s.name === form.selectedSpace);
  const currentPrice = selectedSpaceData ? selectedSpaceData.price : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.selectedSpace ||
      !form.eventType ||
      !form.guests ||
      !form.date ||
      !form.time
    ) {
      return alert("Please fill all required fields");
    }

    const msg = `
📌 FRIENDS’ LOUNGE MBAISE – EVENT BOOKING REQUEST

CLIENT DETAILS
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email || "—"}

EVENT DETAILS
Event Space: ${form.selectedSpace}
Event Type: ${form.eventType}
Guests: ${form.guests}
Date: ${form.date}
Time: ${form.time}

EVENT SPACE FEE
₦${currentPrice.toLocaleString()}

ADDITIONAL NOTES
${form.message || "—"}

------------------------------------

💳 PAYMENT INFORMATION
Account Name: JUST FRIENDS INVESTMENT LTD
Bank: GUARANTY TRUST BANK
Account Number: 3001586851

➡ Kindly pay the event space fee and send your **payment evidence** here to confirm booking.

📞 ENQUIRIES & SUPPORT
+234 706 606 4379
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

      {/* Center wrapper */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
        <motion.div
          initial={{ y: 30, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="w-full max-w-[480px] rounded-xl border-4 border-red-600 shadow-2xl relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* RAFIA BACKGROUND */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              backgroundImage: `url(${RafiaTexture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* CLOCK */}
          <LiveClockBackground />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/65 z-[3]" />

          {/* CONTENT */}
          <div className="relative z-10 max-h-[85vh] overflow-y-auto px-5 py-6">
            <div className="flex items-center justify-between mb-6">
              <motion.img
                src={Logo}
                className="w-20"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            
              <div className="text-right">
                <h2 className="text-xl font-bold text-white">
                  Book Your Event
                </h2>
          
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-1 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white z-20"
            >
              <X size={18} />
            </motion.button>
            <div className="text-center text-white">
              Let's Make it Memorable
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pb-8">

              <input required name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="input" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input required name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="input" />
                <input name="email" placeholder="Email (optional)" value={form.email} onChange={handleChange} className="input" />
              </div>

              {/* SPACE SELECTION INTEGRATED */}
              <select required name="selectedSpace" value={form.selectedSpace} onChange={handleChange} className="input bg-black text-white">
                <option value="">Select Event Space</option>
                {SPACE_OPTIONS.map((s) => (
                  <option key={s.name} value={s.name}>{s.name} (₦{s.price.toLocaleString()})</option>
                ))}
              </select>

              <select required name="eventType" value={form.eventType} onChange={handleChange} className="input bg-black text-white">
                <option value="">Event Type</option>
                {eventTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <label className="sm:hidden text-xs text-gray-300">Event Date</label>
              <input required name="date" type="date" value={form.date} onChange={handleChange} className="input" />

              <label className="sm:hidden text-xs text-gray-300">Event Time</label>
              <input required name="time" type="time" value={form.time} onChange={handleChange} className="input" />

              <input required name="guests" type="number" placeholder="Number of Guests" value={form.guests} onChange={handleChange} className="input" />

              <textarea name="message" rows="3" placeholder="Special requests" value={form.message} onChange={handleChange} className="input resize-none" />

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold"
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