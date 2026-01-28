// src/features/food-order/FoodOrderModal.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaTimes, FaWhatsapp } from "react-icons/fa";
import { createPortal } from "react-dom";
import Logo from "@/assets/images/friends-logo.webp";
import CookingVideo from "@/assets/videos/despatch.webm";

/* ---------------- MENU ---------------- */

const FOOD_MENU = [
  { id: 1, name: "Ofe Onugbu", price: 2500, desc: "Bitterleaf soup assorted" },
  { id: 2, name: "Abacha & Ugba", price: 1800, desc: "Spicy African salad" },
  { id: 3, name: "Isi Ewu", price: 3200, desc: "Goat head pepper" },
  { id: 4, name: "Palm Wine Flight", price: 1500, desc: "Fresh palm wine set" },
  { id: 5, name: "Suya Skewers", price: 1200, desc: "Grilled spicy beef" },
  { id: 6, name: "Grilled Prawns", price: 2800, desc: "Prawns with pepper sauce" },
  { id: 7, name: "Small Plates", price: 900, desc: "Assorted small bites" },
  { id: 8, name: "Craft Cocktails", price: 2200, desc: "Signature lounge drinks" },
];

const BANK_DETAILS = {
  accountName: "JUST FRIENDS INVESTMENT LTD",
  accountNumber: "3001586851",
  bankName: "GUARANTY TRUST BANK",
};

const WHATSAPP_MSISDN = "2347066064379";
const DELIVERY_FEE = 800;

const DEFAULT_CUSTOMER_INFO = {
  name: "",
  phone: "",
  address: "",
  note: "",
};

/* ---------------- COMPONENT ---------------- */

export const FoodOrderModal = ({ isOpen, close }) => {
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(DEFAULT_CUSTOMER_INFO);
  const [errors, setErrors] = useState({});

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) {
      setCart([]);
      setCustomerInfo(DEFAULT_CUSTOMER_INFO);
      setErrors({});
    }
  }, [isOpen]);

  /* ---------------- CART LOGIC ---------------- */

  const addToCart = useCallback((item) => {
    setCart((current) => {
      const existing = current.find((c) => c.id === item.id);
      if (existing) {
        return current.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id, delta) => {
    setCart((current) =>
      current
        .map((c) =>
          c.id === id ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c
        )
        .filter((c) => c.quantity > 0)
    );
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const totalWithDelivery = subtotal + DELIVERY_FEE;

  /* ---------------- VALIDATION ---------------- */

  const validateForm = () => {
    const e = {};
    if (!customerInfo.name.trim()) e.name = "Full name is required";
    if (!customerInfo.phone.trim()) e.phone = "Phone number is required";
    if (!customerInfo.address.trim()) e.address = "Delivery address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const generateWhatsAppMessage = () => {
    const orderItems = cart
      .map(
        (item) =>
          `${item.name} (x${item.quantity}) - ₦${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    return encodeURIComponent(
      `🌟 FRIENDS' LOUNGE FOOD ORDER 🌟

📋 ORDER ITEMS:
${orderItems}

💰 PAYMENT BREAKDOWN:
Subtotal: ₦${subtotal.toLocaleString()}
Delivery: ₦${DELIVERY_FEE.toLocaleString()}
TOTAL: ₦${totalWithDelivery.toLocaleString()}

👤 CUSTOMER DETAILS:
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
Address: ${customerInfo.address}
Notes: ${customerInfo.note || "None"}

🏦 BANK DETAILS:
Account: ${BANK_DETAILS.accountName}
Number: ${BANK_DETAILS.accountNumber}
Bank: ${BANK_DETAILS.bankName}

📱 Send proof of payment here to confirm!
📞 ENQUIRIES & SUPPORT
Phone: +234 706 606 4379

Thank you for choosing Friends' Lounge Mbaise.`
    );
  };

  const handleWhatsAppPayment = () => {
    if (!validateForm()) return;
    window.open(
      `https://wa.me/${WHATSAPP_MSISDN}?text=${generateWhatsAppMessage()}`,
      "_blank"
    );
    close();
  };

  if (!mounted || !isOpen) return null;

  /* ---------------- RENDER ---------------- */

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={close}
      />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
        <motion.div
          className="
            relative w-full max-w-md max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl
            /* MULTI-COLORED BORDERS */
            border-t-4 border-b-4 border-yellow-400
            border-l-4 border-r-4 border-red-600
          "
          initial={{ scale: 0.95, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* VIDEO */}
          <video
            autoPlay
            loop
            muted
            playsInline
            src={CookingVideo}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* CONTRAST LAYER */}
          <div className="absolute inset-0 bg-black/55 z-[1]" />

          {/* HEADER */}
          <div className="relative z-10 px-6 pt-6 pb-4">
            <motion.img
              src={Logo}
              className="w-16 h-16 mb-3 rounded-full"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <button
              onClick={close}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 border border-white/40 text-white flex items-center justify-center"
            >
              <FaTimes />
            </button>

            <h1 className="text-xl font-bold text-white">Order Food</h1>
            <p className="text-yellow-300 text-sm">
              Mbaise-wide delivery • ₦{DELIVERY_FEE.toLocaleString()} delivery fee
            </p>
          </div>

          {/* CONTENT */}
          <div className="relative z-10 max-h-[calc(90vh-140px)] overflow-y-auto px-6 pb-7 space-y-6">
            {FOOD_MENU.map((item) => {
              const cartItem = cart.find((c) => c.id === item.id);
              const quantity = cartItem?.quantity || 0;

              return (
                <div
                  key={item.id}
                  className="bg-black/45 border border-white/20 rounded-xl p-4 flex justify-between items-center"
                >
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{item.name}</p>
                    <p className="text-gray-300 text-xs">{item.desc}</p>
                    <p className="text-yellow-400 font-bold text-sm">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={quantity === 0}
                      className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white disabled:opacity-30"
                    >
                      <FaMinus size={12} />
                    </button>

                    <span className="w-6 text-center text-white font-bold">
                      {quantity}
                    </span>

                    <button
                      onClick={() => addToCart(item)}
                      className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-black"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>
              );
            })}

            {cart.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-white/20 text-left">
                <h2 className="text-white font-semibold">Delivery details</h2>

                <input
                  placeholder="Full Name *"
                  className="input"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                  }
                />
                <input
                  placeholder="Phone Number *"
                  className="input"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                  }
                />
                <textarea
                  placeholder="Delivery Address *"
                  rows={3}
                  className="input"
                  value={customerInfo.address}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, address: e.target.value })
                  }
                />

                <div className="bg-black/40 rounded-xl p-4 text-sm text-white border border-white/10">
                  <div className="flex justify-between">
                    <span>Total (inc. Delivery)</span>
                    <span className="text-yellow-400 font-bold">
                      ₦{totalWithDelivery.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppPayment}
                  className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white flex items-center justify-center gap-2 font-semibold transition-colors"
                >
                  <FaWhatsapp /> Proceed on WhatsApp
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          background: rgba(255,255,255,.12);
          border: 1px solid rgba(255,255,255,.25);
          color: white;
          outline: none;
        }
        .input:focus {
          border-color: rgba(250, 204, 21, 0.5);
        }
        .input::placeholder {
          color: rgba(255,255,255,.6);
        }
      `}</style>
    </AnimatePresence>,
    document.body
  );
};