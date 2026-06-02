// src/features/food-order/FoodOrderModal.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaTimes, FaWhatsapp } from "react-icons/fa";
import { createPortal } from "react-dom";
import Logo from "@/assets/images/friends-logo.webp";
import CookingVideo from "@/assets/videos/despatch.webm";

/* ---------------- MENU ---------------- */

const FOOD_MENU = [
  { id: 1, name: "Afang Soup", price: 5075, desc: "Vegetable soup rich in crayfish" },
  { id: 2, name: "Egusi Soup", price: 4100, desc: "Ground melon with assorted meat" },
  { id: 3, name: "Fisherman Okro Soup", price: 25500, desc: "Seafood cooked in rich stock" },
  { id: 4, name: "Jollof Rice", price: 3050, desc: "Smoky tomato favourite" },
  { id: 5, name: "Coconut Rice", price: 6100, desc: "Fragrant, creamy coconut milk" },
  { id: 6, name: "Special Fried Rice", price: 15400, desc: "Extra-loaded premium rice" },
  { id: 7, name: "BBQ Catfish (Large)", price: 30500, desc: "Deeply marinated whole" },
  { id: 8, name: "Goat Head (IsiEwu)", price: 20450, desc: "Traditional spiced goat head" },
  { id: 9, name: "Nkwobi", price: 8200, desc: "Cow foot in spicy palm oil" },
  { id: 10, name: "Chicken & Chips (Full Option)", price: 10300, desc: "Fried chicken with crispy chips" },
  { id: 11, name: "Full Grilled Chicken & Chips", price: 35000, desc: "Whole grilled golden chicken" },
  { id: 12, name: "Goat Meat Pepper Soup", price: 6100, desc: "Goat aromatic spicy soup" },
  { id: 13, name: "Gizdodo", price: 10200, desc: "Peppered gizzard with plantain" },
  { id: 14, name: "Palm Wine", price: 1500, desc: "Freshly tapped natural wine" },
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

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) {
      setCart([]);
      setCustomerInfo(DEFAULT_CUSTOMER_INFO);
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

  const handleWhatsAppPayment = (e) => {
    // Prevent double triggers
    e.preventDefault();
    e.stopPropagation();

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Please fill in all required fields.");
      return;
    }

    const itemsList = cart
      .map(item => `${item.name} (x${item.quantity}) - ₦${(item.price * item.quantity).toLocaleString()}`)
      .join("\n");

    const fullMessage = `🌟 FRIENDS' LOUNGE FOOD ORDER 🌟

📋 ORDER ITEMS:
${itemsList}

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
📞 ENQUIRIES & SUPPORT: +234 706 606 4379

Thank you for choosing Friends' Lounge Mbaise.`;

    const finalUrl = `https://wa.me/${WHATSAPP_MSISDN}?text=${encodeURIComponent(fullMessage)}`;
    window.open(finalUrl, "_blank");
    close();
  };

  if (!mounted || !isOpen) return null;

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
          className="relative w-full max-w-md max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl border-t-4 border-b-4 border-yellow-400 border-l-4 border-r-4 border-red-600"
          initial={{ scale: 0.95, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 30, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <video autoPlay loop muted playsInline src={CookingVideo} className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 bg-black/60 z-[1]" />

          <div className="relative z-10 px-6 pt-6 pb-4">
            <motion.img src={Logo} className="w-16 h-16 mb-2 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
            <button onClick={close} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center">
              <FaTimes />
            </button>
            <h1 className="text-xl font-bold text-white">Order Food</h1>
            <p className="text-yellow-300 text-sm">₦{DELIVERY_FEE.toLocaleString()} Mbaise-wide delivery</p>
          </div>

          <div className="relative z-10 max-h-[calc(90vh-160px)] overflow-y-auto px-6 pb-8 space-y-5">
            {FOOD_MENU.map((item) => {
              const qty = cart.find(c => c.id === item.id)?.quantity || 0;
              return (
                <div key={item.id} className="bg-black/50 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{item.name}</p>
                    <p className="text-yellow-400 font-bold text-sm">₦{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)} 
                      disabled={qty === 0} 
                      className="w-8 h-8 rounded-full bg-white/10 text-white disabled:opacity-20 flex items-center justify-center"
                    >
                      <FaMinus size={12} />  {/* ← Centered perfectly */}
                    </button>
                    <span className="text-white font-bold w-4 text-center">{qty}</span>
                    <button 
                      onClick={() => addToCart(item)} 
                      className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center"
                    >
                      <FaPlus size={12} />  {/* ← Centered perfectly */}
                    </button>
                  </div>
                </div>
              );
            })}

            {cart.length > 0 && (
              <div className="pt-4 space-y-3 border-t border-white/20">
                <input placeholder="Full Name *" className="custom-input" value={customerInfo.name} onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} />
                <input placeholder="Phone Number *" className="custom-input" value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} />
                <textarea placeholder="Delivery Address *" rows={2} className="custom-input" value={customerInfo.address} onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})} />
                <input placeholder="Notes (e.g. Extra pepper)" className="custom-input" value={customerInfo.note} onChange={e => setCustomerInfo({...customerInfo, note: e.target.value})} />

                <div className="bg-yellow-400/10 border border-yellow-400/20 p-3 rounded-lg flex justify-between">
                  <span className="text-white">Total (inc. Delivery)</span>
                  <span className="text-yellow-400 font-bold">₦{totalWithDelivery.toLocaleString()}</span>
                </div>

                <button onClick={handleWhatsAppPayment} className="w-full py-4 bg-green-600 rounded-xl text-white font-bold flex items-center justify-center gap-2">
                  <FaWhatsapp size={20} /> Proceed on WhatsApp
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        .custom-input {
          width: 100%; padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2); color: white; outline: none; font-size: 14px;
        }
        .custom-input:focus { border-color: #fbbf24; }
      `}</style>
    </AnimatePresence>,
    document.body
  );
};