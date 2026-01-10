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
  FaWhatsapp,
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

  const handleProceedToPayment = () => {
    if (!units || !hostName || !selectedDate || !selectedTime) {
      alert("Please complete all fields.");
      return;
    }
    setShowPayment(true);
  };

  const openWhatsApp = () => {
    const price = parseInt(selectedTable.price.replace(/\D/g, ""), 10);
    const total = price * units;

    const message = encodeURIComponent(
      `*TABLE BOOKING — FRIENDS LOUNGE MBAISE*\n\n` +
        `Host: ${hostName}\nDate: ${selectedDate}\nTime: ${selectedTime}\n\n` +
        `Package: ${units} × ${selectedTable.name}\n` +
        `Total: ₦${total.toLocaleString()}\n\n` +
        `Send proof of payment to confirm.`
    );

    window.open(
      `https://wa.me/${enquiryPhoneNumber.replace(/\D/g, "")}?text=${message}`,
      "_blank"
    );
    handleClose();
  };

  const totalPrice =
    units * parseInt(selectedTable.price.replace(/\D/g, ""), 10);

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-lg"
        onClick={handleClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.94, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-full max-w-[480px] bg-black/35 backdrop-blur-2xl 
        border border-white/20 rounded-lg shadow-xl overflow-hidden 
        flex flex-col max-h-[88vh] z-[1000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* IMAGE HEADER */}
        <div className="relative h-24 w-full flex-shrink-0">
          <img
            src={CaneImage}
            alt="Tables"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />

          {/* Floating Logo */}
          <div className="absolute inset-0 flex justify-left left-6 items-center">
            <img
              src={Logo}
              alt="Friends Lounge"
              className="w-24 drop-shadow-2xl animate-floatSlow"
            />
          </div>
        </div>

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-white/80 hover:text-white z-20"
        >
          <FaTimes size={20} />
        </button>

        {/* SCROLL AREA */}
        <div className="flex-1 overflow-y-auto px-6 pt-5 pb-8 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">

          <h3 className="text-2xl font-bold text-white mb-1">
            Premium Tables
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Served with Mbaise Hospitality
          </p>

          <div className="space-y-4">
            {eventTables.map((table) => {
              const isOpen = expandedId === table.id;
              return (
                <div key={table.id}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    onClick={() => toggleExpand(table.id)}
                    className={`p-4 bg-white/8 border border-white/15 rounded-xl cursor-pointer transition-all ${
                      isOpen
                        ? "bg-white/12 border-red-500/40"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-3">
                        <div className="text-xl">{table.icon}</div>
                        <div>
                          <p className="text-white text-sm font-medium">
                            {table.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {table.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-red-400 font-bold text-sm">
                          {table.price}
                        </p>
                        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
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
                        <div className="mt-3 bg-white/6 rounded-xl p-5 space-y-4 text-sm">

                          {!showPayment ? (
                            <>
                              <input
                                placeholder="Host Name"
                                value={hostName}
                                onChange={(e) => setHostName(e.target.value)}
                                className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white text-sm"
                              />
                              <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white text-sm"
                              />
                              <input
                                type="time"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white text-sm"
                              />
                              <input
                                type="number"
                                value={units}
                                onChange={(e) => setUnits(e.target.value)}
                                min="1"
                                max="6"
                                className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white text-sm"
                              />
                              <button
                                onClick={handleProceedToPayment}
                                className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white text-sm"
                              >
                                Proceed to Payment
                              </button>
                            </>
                          ) : (
                            <>
                              <p className="text-green-400 font-medium">
                                Total: ₦{totalPrice.toLocaleString()}
                              </p>
                              <button
                                onClick={openWhatsApp}
                                className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white flex justify-center gap-2"
                              >
                                <FaWhatsapp /> Confirm via WhatsApp
                              </button>
                            </>
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

        <style>{`
          @keyframes floatSlow {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
            100% { transform: translateY(0px); }
          }
          .animate-floatSlow {
            animation: floatSlow 4.5s ease-in-out infinite;
          }
        `}</style>
      </motion.div>
    </>,
    document.body
  );
};
