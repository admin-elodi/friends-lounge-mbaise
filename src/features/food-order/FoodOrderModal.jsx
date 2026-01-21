// src/features/food-order/FoodOrderModal.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaTimes, FaWhatsapp } from "react-icons/fa";
import { createPortal } from "react-dom";
import Logo from "@/assets/images/friends-logo.webp";
import ChipsImage from "@/assets/images/food/salad.webp";

// 1) Short descriptions (≤ 4 words, single line)
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

export const FoodOrderModal = ({ isOpen, close }) => {
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(DEFAULT_CUSTOMER_INFO);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setCart([]);
      setCustomerInfo(DEFAULT_CUSTOMER_INFO);
      setErrors({});
    }
  }, [isOpen]);

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

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!customerInfo.name.trim()) newErrors.name = "Full name is required";
    if (!customerInfo.phone.trim()) newErrors.phone = "Phone number is required";
    if (!customerInfo.address.trim()) newErrors.address = "Delivery address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [customerInfo]);

  const generateWhatsAppMessage = useCallback(() => {
    const orderItems = cart
      .map(
        (item) =>
          `${item.name} (x${item.quantity}) - ₦${(item.price * item.quantity).toLocaleString()}`
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

📱 Send proof of payment here to confirm!`
    );
  }, [cart, customerInfo, subtotal, totalWithDelivery]);

  const handleWhatsAppPayment = useCallback(() => {
    if (!validateForm()) return;
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_MSISDN}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  }, [generateWhatsAppMessage, close, validateForm]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    },
    [close]
  );

  if (!mounted || !isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden="true"
          />

          {/* Centering wrapper – ensures modal is always in the middle of the visible screen */}
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
            onKeyDown={handleKeyDown}
          >
            <motion.div
              className="
                w-full max-w-md max-h-[90vh] overflow-hidden
                rounded-2xl shadow-2xl border border-white/20
                bg-gradient-to-br from-black/90 via-black/80 to-gray-900/90
                backdrop-blur-xl relative
                mt-6
              "
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.7)), url(${ChipsImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="food-order-title"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative z-10 pt-6 px-6 pb-4">
                {/* Logo */}
                <motion.img
                  src={Logo}
                  alt="Friends Lounge"
                  className="w-16 h-16 rounded-full mb-4"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Close button – now working because prop name matches */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    close();
                  }}
                  aria-label="Close food order modal"
                  className="
                    absolute top-4 right-4 z-30
                    w-10 h-10 rounded-full
                    bg-black/70 hover:bg-red-600/80 border border-white/40
                    flex items-center justify-center text-white text-base
                    transition-all focus:outline-none focus:ring-2 focus:ring-red-400
                    cursor-pointer
                  "
                >
                  <FaTimes />
                </button>

                <div>
                  <h1
                    id="food-order-title"
                    className="text-xl font-bold text-white mb-1"
                  >
                    Order Food
                  </h1>
                  <p className="text-yellow-100 text-sm font-medium">
                    Mbaise-wide delivery • ₦{DELIVERY_FEE.toLocaleString()} delivery fee
                  </p>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="relative z-10 max-h-[calc(90vh-140px)] overflow-y-auto px-6 pb-7 space-y-6">
                {/* Guidance text */}
                <p className="text-center text-sm text-gray-300 italic">
                  Select your quantities → delivery form appears below
                </p>

                {/* Menu */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white/90">Select items</h2>
                  {FOOD_MENU.map((item) => {
                    const cartItem = cart.find((c) => c.id === item.id);
                    const quantity = cartItem?.quantity || 0;

                    return (
                      <motion.div
                        key={item.id}
                        className="
                          group bg-white/5 hover:bg-white/10 border border-white/20
                          rounded-2xl p-4 flex items-center gap-4
                          transition-all hover:shadow-lg
                        "
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-sm mb-1 truncate">
                            {item.name}
                          </h3>
                          <p className="text-gray-300 text-xs truncate">
                            {item.desc}
                          </p>
                          <p className="text-yellow-400 font-bold text-sm mt-1">
                            ₦{item.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            type="button"
                            className="
                              w-9 h-9 rounded-full bg-white/15 hover:bg-white/25
                              flex items-center justify-center text-white text-xs
                              disabled:opacity-30 disabled:cursor-not-allowed
                              transition-all focus:outline-none focus:ring-2 focus:ring-yellow-300
                            "
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={quantity === 0}
                          >
                            <FaMinus />
                          </button>

                          <div className="w-6 text-center">
                            <span className="text-base font-bold text-white">
                              {quantity}
                            </span>
                          </div>

                          <button
                            type="button"
                            className="
                              w-9 h-9 rounded-full bg-yellow-400 hover:bg-yellow-500
                              flex items-center justify-center text-black text-xs font-bold
                              transition-all active:scale-95
                              focus:outline-none focus:ring-2 focus:ring-yellow-300
                            "
                            onClick={() => addToCart(item)}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Customer Details */}
                {cart.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 pt-5 border-t border-white/20"
                  >
                    <h2 className="text-lg font-semibold text-white/90">
                      Delivery details
                    </h2>

                    {/* Name */}
                    <div>
                      <input
                        placeholder="Full Name *"
                        value={customerInfo.name}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className={`
                          w-full px-4 py-3 rounded-xl text-sm
                          bg-white/10 border text-white placeholder:text-gray-300
                          focus:outline-none focus:ring-2 focus:ring-yellow-400/50
                          ${
                            errors.name
                              ? "border-red-400"
                              : "border-white/30"
                          }
                        `}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <input
                        placeholder="Phone Number *"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className={`
                          w-full px-4 py-3 rounded-xl text-sm
                          bg-white/10 border text-white placeholder:text-gray-300
                          focus:outline-none focus:ring-2 focus:ring-yellow-400/50
                          ${
                            errors.phone
                              ? "border-red-400"
                              : "border-white/30"
                          }
                        `}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-400 mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <textarea
                        placeholder="Full Delivery Address *"
                        value={customerInfo.address}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        rows={3}
                        className={`
                          w-full px-4 py-3 rounded-xl text-sm resize-none
                          bg-white/10 border text-white placeholder:text-gray-300
                          focus:outline-none focus:ring-2 focus:ring-yellow-400/50
                          ${
                            errors.address
                              ? "border-red-400"
                              : "border-white/30"
                          }
                        `}
                      />
                      {errors.address && (
                        <p className="text-xs text-red-400 mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* Notes */}
                    <div>
                      <textarea
                        placeholder="Extra notes (time, landmark, etc.)"
                        value={customerInfo.note}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            note: e.target.value,
                          }))
                        }
                        rows={2}
                        className="
                          w-full px-4 py-3 rounded-xl text-sm resize-none
                          bg-white/10 border border-white/30 text-white placeholder:text-gray-300
                          focus:outline-none focus:ring-2 focus:ring-yellow-400/50
                        "
                      />
                    </div>

                    {/* Summary */}
                    <div className="bg-white/5 rounded-xl p-4 space-y-2 border border-white/20">
                      <h3 className="text-white font-semibold text-sm">
                        Order summary
                      </h3>

                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-xs text-gray-200"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-semibold text-white">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}

                      <div className="border-t border-white/20 pt-2 space-y-1 text-xs">
                        <div className="flex justify-between text-gray-300">
                          <span>Delivery</span>
                          <span>₦{DELIVERY_FEE.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-white font-bold text-sm">
                          <span>Total</span>
                          <span className="text-yellow-400 text-base">
                            ₦{totalWithDelivery.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp CTA */}
                    <motion.button
                      type="button"
                      className="
                        w-full py-3 rounded-xl
                        bg-gradient-to-r from-emerald-500 to-green-600
                        text-white font-semibold text-sm flex items-center justify-center gap-2
                        shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.01]
                        active:scale-[0.98] transition-all
                        focus:outline-none focus:ring-2 focus:ring-emerald-400/60
                      "
                      onClick={handleWhatsAppPayment}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaWhatsapp className="text-base" />
                      Proceed on WhatsApp (₦{totalWithDelivery.toLocaleString()})
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};