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
import Logo from "@/assets/images/friends-logo.webp";
import CaneImage from "@/assets/images/cane.png";

const enquiryPhoneNumber = "+2347066064379";

const eventTables = [
  {
    id: "heritage",
    name: "Mbaise Heritage Table",
    description: "Ancient flavours, timeless pride",
    icon: <FaLeaf />,
    price: "₦38,000",
  },
  {
    id: "birthday",
    name: "Birthday Royalty Table",
    description: "Celebrate like Igbo royalty",
    icon: <FaBirthdayCake />,
    price: "₦45,000",
  },
  {
    id: "wedding",
    name: "Igba Nkwụ Special",
    description: "For love & legacy",
    icon: <FaRing />,
    price: "₦42,000",
  },
];

export const TableBookingModal = ({ isOpen, onClose }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [units, setUnits] = useState(1);
  const [hostName, setHostName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setExpandedId(null);
    setUnits(1);
    setHostName("");
    setDate("");
    setTime("");
  };

  const selected = eventTables.find((t) => t.id === expandedId);

  const total =
    selected &&
    units * parseInt(selected.price.replace(/\D/g, ""), 10);

  const openWhatsApp = () => {
    if (!hostName || !date || !time) {
      alert("Please complete all fields");
      return;
    }

    const msg = encodeURIComponent(
      `TABLE BOOKING – FRIENDS LOUNGE

Host: ${hostName}
Date: ${date}
Time: ${time}

Package: ${units} × ${selected.name}
Total: ₦${total.toLocaleString()}

Send payment proof to confirm.`
    );

    window.open(
      `https://wa.me/${enquiryPhoneNumber.replace(/\D/g, "")}?text=${msg}`,
      "_blank"
    );
    handleClose();
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ y: 30, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="
        fixed z-[9999]
        inset-x-4
        top-1/2 -translate-y-1/2
        sm:left-1/2 sm:-translate-x-1/2
        w-auto sm:w-full sm:max-w-[480px]
        bg-black/40 backdrop-blur-2xl
        border border-white/20
        rounded-lg shadow-2xl
        max-h-[82vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-25">
          <img
            src={CaneImage}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 flex items-center left-4">
            <img
              src={Logo}
              className="w-20 drop-shadow-xl animate-floatSlow"
            />
          </div>
        </div>

        {/* Close */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
          className="absolute top-3 right-3 
          w-9 h-9 rounded-full 
          bg-black/60 border border-white/20
          flex items-center justify-center text-white"
        >
          <FaTimes size={14} />
        </motion.button>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-6">
          <h3 className="text-xl font-bold text-white mb-1">
            Premium Tables
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Mbaise hospitality
          </p>

          <div className="space-y-3">
            {eventTables.map((table) => {
              const open = expandedId === table.id;

              return (
                <div key={table.id}>
                  <button
                    onClick={() =>
                      setExpandedId(open ? null : table.id)
                    }
                    className={`w-full p-4 rounded-xl text-left
                    bg-white/10 border border-white/15
                    flex justify-between items-center
                    ${open && "border-red-500/40"}`}
                  >
                    <div className="flex gap-3">
                      <div className="text-red-400">
                        {table.icon}
                      </div>
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
                      <p className="text-red-400 text-sm font-bold">
                        {table.price}
                      </p>
                      {open ? <FaChevronUp /> : <FaChevronDown />}
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
                        <div className="mt-3 bg-white/5 rounded-xl p-4 space-y-3">

                          <input
                            placeholder="Host name"
                            value={hostName}
                            onChange={(e) =>
                              setHostName(e.target.value)
                            }
                            className="input"
                          />

                          <input
                            type="date"
                            value={date}
                            onChange={(e) =>
                              setDate(e.target.value)
                            }
                            className="input"
                          />

                          <input
                            type="time"
                            value={time}
                            onChange={(e) =>
                              setTime(e.target.value)
                            }
                            className="input"
                          />

                          <input
                            type="number"
                            min="1"
                            max="6"
                            value={units}
                            onChange={(e) =>
                              setUnits(e.target.value)
                            }
                            className="input"
                          />

                          <div className="flex justify-between text-sm text-gray-300">
                            <span>Total</span>
                            <span className="text-green-400">
                              ₦{total?.toLocaleString()}
                            </span>
                          </div>

                          <button
                            onClick={openWhatsApp}
                            className="w-full py-3 
                            bg-green-600 hover:bg-green-500
                            rounded-xl text-white
                            flex items-center justify-center gap-2"
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
          }

          @keyframes floatSlow{
            0%,100%{transform:translateY(0)}
            50%{transform:translateY(-6px)}
          }
          .animate-floatSlow{
            animation:floatSlow 4s ease-in-out infinite
          }
        `}</style>
      </motion.div>
    </>,
    document.body
  );
};
