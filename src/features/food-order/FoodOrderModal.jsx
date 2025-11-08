import React from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";

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

export const FoodOrderModal = ({
  isOpen,
  close,
  cart,
  addToCart,
  updateQuantity,
  getTotal,
  customerInfo,
  setCustomerInfo,
  handlePayment,
  isPaying,
  paymentSuccess,
  deliveryFee,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-sm"
        onClick={close}
      />

      {/* Modal Card – CRYSTALLINE GLASSMORPHISM */}
      <motion.div
        initial={{ scale: 0.92, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 15, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 24,
          mass: 0.8,
          duration: 0.22
        }}
        className="fixed top-1/2 left-1/2 max-w-md w-full -translate-x-1/2 -translate-y-1/2 
                   bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/25 
                   p-6 max-h-[90vh] overflow-y-auto z-[1001] scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-white/60 hover:text-white text-xl z-10 transition-colors"
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <h3 className="text-xl font-bold text-white text-center mb-6 tracking-wider">
          Order Food • Mbaise Delivery
        </h3>

        {/* Menu */}
        <div className="space-y-4 mb-6">
          {foodMenu.map((item) => {
            const qty = cart.find((i) => i.id === item.id)?.quantity || 0;
            return (
              <div
                key={item.id}
                className="bg-white/20 rounded-xl p-4 border border-white/25 flex justify-between items-center"
              >
                <div className="flex-1">
                  <h5 className="font-semibold text-white">{item.name}</h5>
                  <p className="text-xs text-gray-300">{item.desc}</p>
                  <p className="text-sm font-medium text-red-400 mt-1">₦{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={qty === 0}
                    className="w-8 h-8 rounded-full bg-white/25 hover:bg-white/35 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
                  >
                    <FaMinus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-bold text-white">{qty}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-colors"
                  >
                    <FaPlus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Summary & Form */}
        {cart.length > 0 && (
          <div className="bg-white/20 rounded-xl p-5 border border-white/25 space-y-4">
            <h4 className="font-bold text-white mb-3">Your Order</h4>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-200">
                <span>{item.name} × {item.quantity}</span>
                <span>₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t border-white/25 pt-2 mt-2 flex justify-between text-sm">
              <span className="text-gray-300">Delivery</span>
              <span>₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="border-t border-white/25 pt-2 mt-2 flex justify-between font-bold text-white">
              <span>Total</span>
              <span className="text-red-400">₦{getTotal().toLocaleString()}</span>
            </div>

            {/* Customer Form */}
            <div className="space-y-3 mt-5">
              <input
                placeholder="Full Name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                className="w-full bg-white/25 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />
              <input
                placeholder="Phone"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                className="w-full bg-white/25 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />
              <input
                placeholder="Email (required)"
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                className="w-full bg-white/25 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />
              <textarea
                placeholder="Delivery Address"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                className="w-full bg-white/25 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 h-20 resize-none transition-all"
              />
              <textarea
                placeholder="Notes (e.g., Okada pickup)"
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                className="w-full bg-white/25 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 h-16 resize-none transition-all"
              />
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={isPaying || !customerInfo.email || cart.length === 0}
              className={`w-full mt-5 py-3 rounded-xl font-bold text-white transition-all ${
                isPaying || !customerInfo.email || cart.length === 0
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isPaying ? "Processing..." : `Pay ₦${getTotal().toLocaleString()} via Paystack`}
            </button>

            {/* Success Message */}
            {paymentSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-green-900/30 border border-green-500 rounded-xl text-green-300 text-center text-sm"
              >
                <p className="font-bold">Order Confirmed!</p>
                <p>Rider dispatched from Achingali/Okada network.</p>
                <p className="mt-1">We’ll call {customerInfo.phone || "you"}.</p>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>

      {/* Scrollbar Style */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
      `}</style>
    </>,
    document.body
  );
};