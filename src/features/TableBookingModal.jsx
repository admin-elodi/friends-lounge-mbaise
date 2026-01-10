// src/features/TableBookingModal.jsx
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLeaf,
  FaBirthdayCake,
  FaRing,
  FaCheckCircle,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaChair,
  FaPeace,
} from "react-icons/fa";
import Logo from "@/assets/images/friends-logo.webp";
import CaneImage from "@/assets/images/cane.png";

const enquiryPhoneNumber = "+2347066064379";

const eventTables = [
  {
    id: "heritage",
    name: "Mbaise Heritage Table",
    description: "Ancient flavours, timeless pride — the soul of our ancestors",
    icon: <FaLeaf className="text-white/70" />,
    price: "₦38,000",
    dineIn: [
      { name: "Oha Soup with Poundo Yam", quantity: 3, description: "Sacred oha leaves, thick cocoyam fufu" },
      { name: "Assorted Pepper Soup (Goat + Catfish)", quantity: 2, description: "Hot, fragrant, soul-cleansing" },
      { name: "Nkwobi", quantity: 1, description: "Cow foot in ehuru-scented palm oil sauce" },
      { name: "Ugba & Stockfish", quantity: 1, description: "Fermented locust bean salad" },
      { name: "Fresh Palm Wine (Ngwo-Ngwo)", quantity: 3, description: "Tapped this morning, frothy & sweet" },
      { name: "Zobo-Infused Chapman", quantity: 4, description: "Deep hibiscus house blend" },
    ],
    takeHome: [
      { name: "Oha Soup Pack (1.5L)", quantity: 1 },
      { name: "Sealed Palm Wine (75cl)", quantity: 1 },
      { name: "Nkwobi Small Bowl", quantity: 1 },
    ],
  },
  {
    id: "birthday",
    name: "Birthday Royalty Table",
    description: "For Kings and Queens — celebrate like Igbo royalty",
    icon: <FaBirthdayCake className="text-white/70" />,
    price: "₦45,000",
    dineIn: [
      { name: "Smokey Jollof + Fried Rice Combo", quantity: 4, description: "Firewood jollof meets golden fried rice" },
      { name: "Grilled/Roasted Full Chicken", quantity: 1, description: "Whole chicken, marinated perfection" },
      { name: "Peppered Goat Meat + Assorted Meat", quantity: 3, description: "Goat, cowleg, shaki celebration" },
      { name: "Chicken & Chips + Gizdodo", quantity: 2, description: "Crispy wings, yam fries, gizzard mix" },
      { name: "Chapman + Chamdor Sparkling", quantity: 6, description: "Royal non-alcoholic toast" },
      { name: "Parfait (4 tall cups)", quantity: 1, description: "Layered yogurt, fruit & granola" },
    ],
    takeHome: [
      { name: "Jollof Pack + Chicken", quantity: 1 },
      { name: "Extra Parfait Cups", quantity: 2 },
      { name: "Chamdor Bottle", quantity: 1 },
    ],
  },
  {
    id: "wedding",
    name: "Igba Nkwụ Special",
    description: "For love, legacy & the sweetest wine",
    icon: <FaRing className="text-white/70" />,
    price: "₦42,000",
    dineIn: [
      { name: "White Soup (Nsala) with Poundo", quantity: 2, description: "Light, silky, elegant" },
      { name: "Native Soup with Eba", quantity: 2, description: "Rich palm-oil depth" },
      { name: "Whole Grilled Tilapia Fish", quantity: 2, description: "Fresh, smoky, perfectly spiced" },
      { name: "Peppered Snail + Goat Meat", quantity: 2, description: "Luxury protein, fiery & tender" },
      { name: "Chamdor Sparkling + Chapman", quantity: 6, description: "Bubbles for the toast" },
      { name: "Coleslaw + Vegetable Salad", quantity: 2, description: "Fresh & crisp" },
    ],
    takeHome: [
      { name: "White Soup Pack", quantity: 1 },
      { name: "Grilled Tilapia Wrap", quantity: 1 },
      { name: "Chamdor Bottle", quantity: 1 },
      { name: "Fruit Salad Bowl", quantity: 1 },
    ],
  },
];

export const TableBookingModal = ({ isOpen, onClose }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [units, setUnits] = useState(1);
  const [selectedTable, setSelectedTable] = useState(eventTables[0]);
  const [expandedId, setExpandedId] = useState(null);
  const [hostName, setHostName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setShowPayment(false);
    setUnits(1);
    setSelectedTable(eventTables[0]);
    setExpandedId(null);
    setHostName("");
    setSelectedDate("");
    setSelectedTime("");
  };

  const toggleExpand = (id) => {
    const newId = expandedId === id ? null : id;
    setExpandedId(newId);
    if (newId) setSelectedTable(eventTables.find((t) => t.id === id));
  };

  const handleUnitsChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setUnits("");
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 1 && num <= 6) setUnits(num);
  };

  const handleProceedToPayment = () => {
    if (!units || units < 1 || !hostName.trim() || !selectedDate || !selectedTime) {
      alert("Please fill Host Name, Date, Time, and Units (1–6).");
      return;
    }
    setShowPayment(true);
  };

  const openWhatsApp = () => {
    const unitsCount = Number(units) || 1;
    const dineInLines = selectedTable.dineIn.map(
      (i) => `${i.name}: ${i.quantity} serving${i.quantity > 1 ? "s" : ""}`
    );
    const takeHomeLines = selectedTable.takeHome.map(
      (i) => `${i.name}: ${i.quantity} serving${i.quantity > 1 ? "s" : ""} (Take-Home)`
    );
    const menuDetails = [...dineInLines, ...takeHomeLines].join("\n");
    const pricePerTable = parseInt(selectedTable.price.replace(/[^0-9]/g, ""), 10);
    const totalPrice = unitsCount * pricePerTable;

    const message = encodeURIComponent(
      `*TABLE BOOKING — FRIENDS LOUNGE MBAISE*\n\n` +
        `Host: ${hostName.trim()}\n` +
        `Date: ${selectedDate}\n` +
        `Time: ${selectedTime}\n\n` +
        `Package: ${unitsCount} × "${selectedTable.name}"\n` +
        `Total: ₦${totalPrice.toLocaleString()}\n\n` +
        `Full Menu per Table:\n${menuDetails}\n\n` +
        `Payment Details:\n` +
        `➤ ACCOUNT NAME: JUST FRIENDS INVESTMENT LTD\n` +
        `➤ ACCOUNT NO: 3001586851\n` +
        `➤ BANK: GUARANTY TRUST BANK\n\n` +
        `Send proof of payment to confirm.\n\n` +
        `Thank you for choosing Friends Lounge ❤️\n` +
        `One Table. One Vibe. One Udo.`
    );

    window.open(
      `https://wa.me/${enquiryPhoneNumber.replace(/\D/g, "")}?text=${message}`,
      "_blank"
    );
    handleClose();
  };

  const totalPrice = units
    ? Number(units) * parseInt(selectedTable.price.replace(/[^0-9]/g, ""), 10)
    : 0;

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-lg"
        onClick={handleClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.94, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 30,
          mass: 0.75,
        }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-full max-w-[480px] bg-black/35 backdrop-blur-2xl 
                   border border-white/20 rounded-2xl shadow-xl overflow-hidden 
                   flex flex-col max-h-[88vh] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent z-[1000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Logo left + Image right */}
        <div className="relative h-32 bg-gradient-to-r from-black/70 to-transparent flex items-center px-6 border-b border-white/10">
          <img
            src={Logo}
            alt="Friends Lounge"
            className="w-32 md:w-40 object-contain opacity-95 z-10"
          />
          <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
            <img
              src={CaneImage}
              alt="Premium Table"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-transparent to-transparent" />
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 text-white/80 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>

        {/* Content */}
        <div className="flex-1 px-6 pt-5 pb-8 overflow-y-auto">
          <h3 className="text-2xl font-bold text-white mb-1">Premium Tables</h3>
          <p className="text-gray-400 text-sm mb-6">Served with Mbaise Hospitality</p>

          <div className="space-y-4">
            {eventTables.map((table) => {
              const isOpen = expandedId === table.id;
              return (
                <div key={table.id}>
                  <motion.div
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleExpand(table.id)}
                    className={`p-4 bg-white/8 border border-white/15 rounded-xl cursor-pointer transition-all ${
                      isOpen ? "bg-white/12 border-red-500/40" : "hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{table.icon}</div>
                        <div>
                          <p className="text-white font-medium text-sm">{table.name}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{table.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-red-400 font-bold text-sm">{table.price}</p>
                        {isOpen ? (
                          <FaChevronUp className="text-white/60 text-xs mt-1" />
                        ) : (
                          <FaChevronDown className="text-white/60 text-xs mt-1" />
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 bg-white/6 rounded-xl p-5 border border-white/10 space-y-5 text-sm">
                          {/* Dine-in */}
                          <div>
                            <p className="text-white/90 font-medium mb-2">Dine-In Includes:</p>
                            <ul className="space-y-1.5 text-gray-300 text-xs">
                              {table.dineIn.map((item, i) => (
                                <li key={i}>
                                  • {item.name} × {item.quantity} ({item.description})
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Take-home */}
                          <div>
                            <p className="text-white/90 font-medium mb-2">Take-Home:</p>
                            <ul className="space-y-1 text-gray-300 text-xs">
                              {table.takeHome.map((item, i) => (
                                <li key={i}>• {item.name} × {item.quantity}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Form / Payment */}
                          {!showPayment ? (
                            <div className="space-y-4 pt-4 border-t border-white/10">
                              <input
                                type="text"
                                value={hostName}
                                onChange={(e) => setHostName(e.target.value)}
                                placeholder="Host Name"
                                className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:border-red-500/50 focus:bg-white/15 outline-none transition-all text-sm"
                              />
                              <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white focus:border-red-500/50 focus:bg-white/15 outline-none transition-all text-sm"
                              />
                              <input
                                type="time"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white focus:border-red-500/50 focus:bg-white/15 outline-none transition-all text-sm"
                              />
                              <input
                                type="number"
                                value={units}
                                onChange={handleUnitsChange}
                                placeholder="Units (1–6)"
                                min="1"
                                max="6"
                                className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:border-red-500/50 focus:bg-white/15 outline-none transition-all text-sm"
                              />
                              <button
                                onClick={handleProceedToPayment}
                                className="w-full py-3.5 bg-red-600 hover:bg-red-700 rounded-xl text-white font-medium transition text-sm"
                              >
                                Proceed to Payment
                              </button>
                            </div>
                          ) : (
                            <div className="pt-4 space-y-5 text-center">
                              <div>
                                <p className="text-green-400 font-medium text-base flex items-center justify-center gap-2">
                                  <FaCheckCircle /> Ready to Confirm!
                                </p>
                                <p className="text-white font-bold text-xl mt-2">
                                  ₦{totalPrice.toLocaleString()}
                                </p>
                              </div>
                              <button
                                onClick={openWhatsApp}
                                className="w-full py-3.5 bg-green-600 hover:bg-green-700 rounded-xl text-white font-medium transition text-sm flex items-center justify-center gap-2"
                              >
                                <FaWhatsapp /> Send Booking via WhatsApp
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>,
    document.body
  );
};