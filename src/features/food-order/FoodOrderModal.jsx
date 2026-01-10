// src/features/food-order/FoodOrderModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaTimes, FaWhatsapp } from "react-icons/fa";
import { createPortal } from "react-dom";
import Logo from "@/assets/images/friends-logo.webp";
import ChipsImage from "@/assets/images/food/salad.webp";

const foodMenu = [
  { id: 1, name: "Ofe Onugbu", price: 2500, desc: "Rich bitterleaf soup with assorted meat" },
  { id: 2, name: "Abacha & Ugba", price: 1800, desc: "Spicy African salad with oil bean" },
  { id: 3, name: "Isi Ewu", price: 3200, desc: "Spicy goat head pepper soup" },
  { id: 4, name: "Palm Wine Flight", price: 1500, desc: "Fresh palm wine tasting set" },
  { id: 5, name: "Suya Skewers", price: 1200, desc: "Grilled spicy beef sticks" },
  { id: 6, name: "Grilled Prawns", price: 2800, desc: "Fresh prawns with pepper sauce" },
  { id: 7, name: "Small Plates", price: 900, desc: "Assorted bite-sized appetizers" },
  { id: 8, name: "Craft Cocktails", price: 2200, desc: "Signature Mbaise-inspired drinks" },
];

const BANK_DETAILS = {
  accountName: "JUST FRIENDS INVESTMENT LTD",
  accountNumber: "3001586851",
  bankName: "GUARANTY TRUST BANK",
};

const WHATSAPP_NUMBER = "+447848149416";

export const FoodOrderModal = ({
  isOpen,
  close,
  cart,
  addToCart,
  updateQuantity,
  getTotal,
  customerInfo,
  setCustomerInfo,
  deliveryFee,
}) => {
  if (!isOpen) return null;

  const handleWhatsAppPayment = () => {
    if (cart.length === 0) {
      alert("Please add items to your cart.");
      return;
    }

    const orderSummary = cart
      .map((item) => `${item.name} (x${item.quantity}) - ₦${(item.price * item.quantity).toLocaleString()}`)
      .join("\n");
    const totalAmount = getTotal() + deliveryFee;
    const message = encodeURIComponent(
      `🌟 Friends' Lounge Mbaise Order 🌟

Making Friends and Building Communities – Your Order Awaits!

📋 **Order Summary:**
${orderSummary}

💰 **Subtotal:** ₦${getTotal().toLocaleString()}
🚚 **Delivery Fee:** ₦${deliveryFee.toLocaleString()}
💎 **Grand Total:** ₦${totalAmount.toLocaleString()}

👤 **Customer Details:**
Name: ${customerInfo.name || "N/A"}
Phone: ${customerInfo.phone || "N/A"}
Email: ${customerInfo.email || "—"}
Address: ${customerInfo.address || "N/A"}
Notes: ${customerInfo.notes || "N/A"}

🏦 **Bank Transfer Instructions:**
1. Transfer ₦${totalAmount.toLocaleString()} to:
   - Account Name: ${BANK_DETAILS.accountName}
   - Account No: ${BANK_DETAILS.accountNumber}
   - Bank: ${BANK_DETAILS.bankName}

2. Send payment evidence (screenshot/transfer ref) for instant order confirmation & rider dispatch from Udo kitchen (45 mins delivery).

We're thrilled to serve you! Reply 'PAID' once transferred.

Tagline: Friends' Lounge – Making friends and building communities 🍲✨`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    close();
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[1000] bg-black/30 backdrop-blur-lg"
        onClick={close}
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
                   flex flex-col max-h-[88vh] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent z-[1001]"
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
              src={ChipsImage}
              alt="Delicious Food"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-transparent to-transparent" />
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 z-20 text-white/80 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>

        {/* Content */}
        <div className="flex-1 px-6 pt-5 pb-8 overflow-y-auto">
          <h3 className="text-2xl font-bold text-white mb-1">Order Food</h3>
          <p className="text-gray-400 text-sm mb-6">Mbaise-wide Delivery</p>

          {/* Menu Items */}
          <div className="space-y-4 mb-6">
            {foodMenu.map((item) => {
              const qty = cart.find((i) => i.id === item.id)?.quantity || 0;
              return (
                <div
                  key={item.id}
                  className="bg-white/10 border border-white/15 rounded-xl p-4 flex justify-between items-center"
                >
                  <div className="flex-1">
                    <h5 className="font-semibold text-white text-sm">{item.name}</h5>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    <p className="text-sm font-medium text-red-400 mt-1">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={qty === 0}
                      className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
                    >
                      <FaMinus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center font-medium text-white text-sm">{qty}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-7 h-7 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-colors"
                    >
                      <FaPlus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary & Customer Form */}
          {cart.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-5">
              <h4 className="font-semibold text-white text-base">Your Order</h4>

              <div className="space-y-2 text-sm">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-300">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between text-gray-300">
                  <span>Delivery</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-white/15 pt-3 mt-3 flex justify-between font-semibold text-white">
                  <span>Total</span>
                  <span className="text-red-400">₦{(getTotal() + deliveryFee).toLocaleString()}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-4">
                <input
                  placeholder="Full Name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder-gray-400 focus:border-red-500/50 focus:bg-white/15 outline-none transition-all text-sm"
                />
                <input
                  placeholder="Phone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder-gray-400 focus:border-red-500/50 focus:bg-white/15 outline-none transition-all text-sm"
                />
                <input
                  placeholder="Email (optional)"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder-gray-400 focus:border-red-500/50 focus:bg-white/15 outline-none transition-all text-sm"
                />
                <textarea
                  placeholder="Delivery Address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder-gray-400 focus:border-red-500/50 focus:bg-white/15 outline-none transition-all h-20 resize-none text-sm"
                />
                <textarea
                  placeholder="Notes (e.g., Okada pickup)"
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-5 py-3.5 text-white placeholder-gray-400 focus:border-red-500/50 focus:bg-white/15 outline-none transition-all h-16 resize-none text-sm"
                />
              </div>

              {/* Payment Button */}
              <button
                onClick={handleWhatsAppPayment}
                disabled={cart.length === 0}
                className={`w-full mt-6 py-4 rounded-xl font-medium text-white transition-all flex items-center justify-center gap-2 text-sm tracking-wide ${
                  cart.length === 0
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                <FaWhatsapp className="text-lg" />
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>,
    document.body
  );
};