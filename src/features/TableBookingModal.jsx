// src/features/TableBookingModal.jsx
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLeaf,
  FaBirthdayCake,
  FaRing,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaWhatsapp,
} from "react-icons/fa";

import beerBg from "@/assets/images/outside.webp";
import Logo from "@/assets/images/friends-logo.webp";

/* ================= CONFIG ================= */

const enquiryPhoneNumber = "+2347066064379";

const BANK = {
  name: "Just Friends Investment Limited",
  bank: "Guarantee Trust Bank",
  account: "3001586851",
};

/* ================= TABLE DATA ================= */

const eventTables = [
  {
    id: "heritage",
    name: "Mbaise Heritage Table",
    caption: "Event & Hangout Table • For 4 persons",
    icon: <FaLeaf />,
    price: 43000,
    menu: [
      { item: "Oha Soup", qty: 1, price: 4000 },
      { item: "Bitterleaf Soup", qty: 1, price: 4000 },
      { item: "Pounded Yam", qty: 2, price: 4000 },
      { item: "Fufu", qty: 2, price: 3000 },
      { item: "Goat Meat", qty: 2, price: 12000 },
      { item: "Cow Leg", qty: 1, price: 8000 },
      { item: "Beverage Bundle", qty: 1, price: 5000 },
      { item: "Bottled Water", qty: 4, price: 3000 },
    ],
  },
  {
    id: "birthday",
    name: "Birthday Table",
    caption: "Event & Hangout Table • For 4 persons",
    icon: <FaBirthdayCake />,
    price: 46000,
    menu: [
      { item: "Jollof Rice", qty: 2, price: 8000 },
      { item: "Fried Rice", qty: 2, price: 8000 },
      { item: "Peppered Chicken", qty: 2, price: 12000 },
      { item: "Suya Stick", qty: 2, price: 10000 },
      { item: "Beverage Bundle", qty: 1, price: 5000 },
      { item: "Bottled Water", qty: 4, price: 3000 },
    ],
  },
  {
    id: "igba",
    name: "Igba Nkwu Special",
    caption: "Event & Hangout Table • For 4 persons",
    icon: <FaRing />,
    price: 44500,
    menu: [
      { item: "Egusi Soup", qty: 1, price: 4500 },
      { item: "Vegetable Soup", qty: 1, price: 6000 },
      { item: "Pounded Yam", qty: 2, price: 4000 },
      { item: "Semo", qty: 2, price: 4000 },
      { item: "Turkey", qty: 2, price: 12000 },
      { item: "Dry Fish", qty: 1, price: 6000 },
      { item: "Beverage Bundle", qty: 1, price: 5000 },
      { item: "Bottled Water", qty: 4, price: 3000 },
    ],
  },
];

/* ================= COMPONENT ================= */

export const TableBookingModal = ({ isOpen, onClose }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [units, setUnits] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!isOpen) return null;

  const selected = eventTables.find((t) => t.id === expandedId);
  const total = selected && selected.price * units;

  const handleClose = () => {
    onClose();
    setExpandedId(null);
    setUnits(1);
    setCustomerName("");
    setDate("");
    setTime("");
  };

  const openWhatsApp = () => {
    if (!customerName || !date || !time) {
      alert("Please complete all fields");
      return;
    }

    const menuList = selected.menu
      .map((m) => `• ${m.item} (${m.qty})`)
      .join("\n");

    const msg = encodeURIComponent(
      `TABLE BOOKING – FRIENDS LOUNGE

Customer Name:
${customerName}

Date:
${date}

Time:
${time}

Table:
${selected.name}

MENU
${menuList}

Units:
${units}

TOTAL PAYABLE:
₦${total.toLocaleString()}

PAY TO:
Bank: ${BANK.bank}
Account Name: ${BANK.name}
Account Number: ${BANK.account}

➡ Send payment proof here to confirm booking
📞 ENQUIRIES & SUPPORT
Phone: +234 706 606 4379

Thank you for choosing Friends’ Lounge Mbaise.
We look forward to serving your table`
    );

    window.open(
      `https://wa.me/${enquiryPhoneNumber.replace(/\D/g, "")}?text=${msg}`,
      "_blank"
    );

    handleClose();
  };

  return createPortal(
    <>
      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* MODAL */}
      <motion.div
        initial={{ y: 30, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="
          fixed z-[9999]
          inset-x-4
          top-1/2 -translate-y-1/2
          sm:left-1/2 sm:-translate-x-1/2
          w-auto sm:w-full sm:max-w-[480px]
          bg-black/60 backdrop-blur-2xl
          
          /* MULTI-COLORED BORDERS */
          border-t-4 border-b-4 border-green-400
          border-l-4 border-r-4 border-red-500
          
          rounded-xl shadow-2xl
          max-h-[82vh] flex flex-col overflow-hidden
        "
        style={{
          backgroundImage: `url(${beerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-black/70" />

        {/* HEADER */}
        <div className="relative h-24 z-10">
          <motion.img
            src={Logo}
            className="w-20 absolute left-4 top-4"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* CLOSE */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white z-20"
        >
          <FaTimes size={14} />
        </button>

        {/* CONTENT */}
        <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-6 text-left">
          <h3 className="text-xl font-bold text-white mb-1">Premium Tables</h3>
          <p className="text-gray-400 text-sm mb-4">
            Event & Hangout Tables • For 4 persons
          </p>

          <div className="space-y-3">
            {eventTables.map((table) => {
              const open = expandedId === table.id;

              return (
                <div key={table.id}>
                  <button
                    onClick={() => setExpandedId(open ? null : table.id)}
                    className={`w-full p-4 rounded-xl text-left
                      bg-white/10 border border-white/15
                      flex justify-between items-center
                      ${open && "border-red-500/40"}
                    `}
                  >
                    <div className="flex gap-3">
                      <div className="text-green-400">{table.icon}</div>
                      <div>
                        <p className="text-white text-sm font-medium">
                          {table.name}
                        </p>
                        <p className="text-xs text-gray-400">{table.caption}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-green-400 text-sm font-bold">
                        ₦{table.price.toLocaleString()}
                      </p>
                      {open ? <FaChevronUp className="text-white" /> : <FaChevronDown className="text-white" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 bg-white/5 rounded-xl p-4 space-y-4">
                          <ul className="text-gray-200 text-sm space-y-2">
                            {table.menu.map((m, i) => (
                              <li key={i}>• {m.item} ({m.qty})</li>
                            ))}
                          </ul>

                          <input
                            placeholder="Customer Name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="input"
                          />

                          {/* MOBILE LABEL */}
                          <label className="sm:hidden text-xs text-gray-300">
                            Event Date
                          </label>
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="input"
                          />

                          {/* MOBILE LABEL */}
                          <label className="sm:hidden text-xs text-gray-300">
                            Event Time
                          </label>
                          <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="input"
                          />

                          <input
                            type="number"
                            min="1"
                            value={units}
                            onChange={(e) => setUnits(Number(e.target.value))}
                            className="input"
                          />

                          <div className="flex justify-between text-sm text-gray-300">
                            <span>Total</span>
                            <span className="text-green-400 font-bold">
                              ₦{total?.toLocaleString()}
                            </span>
                          </div>

                          <button
                            onClick={openWhatsApp}
                            className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-xl text-white flex items-center justify-center gap-2 transition-colors"
                          >
                            <FaWhatsapp /> Confirm via WhatsApp
                          </button>
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
          .input{
            width:100%;
            padding:12px;
            border-radius:12px;
            background:rgba(255,255,255,.1);
            border:1px solid rgba(255,255,255,.15);
            color:white;
            font-size:14px;
            outline: none;
          }
          .input:focus {
            border-color: rgba(74, 222, 128, 0.5);
          }
        `}</style>
      </motion.div>
    </>,
    document.body
  );
};