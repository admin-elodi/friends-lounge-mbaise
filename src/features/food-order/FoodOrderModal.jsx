// src/features/food-order/FoodOrderModal.jsx
import React from "react";
import { motion } from "framer-motion";
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
      .map(
        (item) =>
          `${item.name} (x${item.quantity}) - ₦${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    const totalAmount = getTotal() + deliveryFee;

    const message = encodeURIComponent(
      `🌟 Friends' Lounge Mbaise Order 🌟

📋 Order Summary:
${orderSummary}

💰 Subtotal: ₦${getTotal().toLocaleString()}
🚚 Delivery Fee: ₦${deliveryFee.toLocaleString()}
💎 Grand Total: ₦${totalAmount.toLocaleString()}

👤 Customer:
${customerInfo.name || "N/A"}
${customerInfo.phone || "N/A"}
${customerInfo.email || "—"}
${customerInfo.address || "N/A"}

🏦 Bank Transfer:
${BANK_DETAILS.accountName}
${BANK_DETAILS.accountNumber}
${BANK_DETAILS.bankName}

Send payment proof to confirm order.

Friends’ Lounge – Making friends & building communities`
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
        w-full max-w-[480px] bg-black/35 backdrop-blur-2xl border 
        border-white/20 rounded-lg shadow-xl overflow-hidden flex flex-col 
        max-h-[88vh] z-[1001]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* IMAGE HEADER */}
        <div className="relative w-full h-50">

          {/* Full width image */}
          <img
            src={ChipsImage}
            alt="Food"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Floating logo */}
          <div className="absolute inset-0 flex items-center justify-left left-4 z-10">
            <img
              src={Logo}
              alt="Friends Lounge"
              className="w-24 md:w-28 object-contain drop-shadow-2xl animate-floatSlow"
            />
          </div>
        </div>

        {/* Close */}
        <button
          onClick={close}
          className="absolute top-3 right-3 z-20 text-white/80 hover:text-white"
        >
          <FaTimes size={20} />
        </button>

        {/* CONTENT */}
        <div className="flex-1 px-6 pt-5 pb-8 overflow-y-auto">
          <h3 className="text-2xl font-bold text-white mb-1">Order Food</h3>
          <p className="text-gray-400 text-sm mb-6">Mbaise-wide Delivery</p>

          {/* MENU */}
          <div className="space-y-4 mb-6">
            {foodMenu.map((item) => {
              const qty =
                cart.find((i) => i.id === item.id)?.quantity || 0;
              return (
                <div
                  key={item.id}
                  className="bg-white/10 border border-white/15 rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <h5 className="font-semibold text-white text-sm">
                      {item.name}
                    </h5>
                    <p className="text-xs text-gray-400">
                      {item.desc}
                    </p>
                    <p className="text-sm font-medium text-red-400">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={qty === 0}
                      className="w-7 h-7 rounded-full bg-white/15 disabled:opacity-40"
                    >
                      <FaMinus size={12} />
                    </button>

                    <span className="w-6 text-center text-white text-sm">
                      {qty}
                    </span>

                    <button
                      onClick={() => addToCart(item)}
                      className="w-7 h-7 rounded-full bg-red-600"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SUMMARY */}
          {cart.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">

              <h4 className="text-white font-semibold">Your Order</h4>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm text-gray-300"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}

              <div className="flex justify-between text-sm text-gray-300">
                <span>Delivery</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between text-white font-semibold">
                <span>Total</span>
                <span className="text-red-400">
                  ₦{(getTotal() + deliveryFee).toLocaleString()}
                </span>
              </div>

              {/* CUSTOMER */}
              <div className="space-y-3">
                <input
                  placeholder="Full Name"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-white/10 rounded-xl px-4 py-3 text-white text-sm"
                />

                <input
                  placeholder="Phone"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      phone: e.target.value,
                    })
                  }
                  className="w-full bg-white/10 rounded-xl px-4 py-3 text-white text-sm"
                />

                <textarea
                  placeholder="Delivery Address"
                  value={customerInfo.address}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      address: e.target.value,
                    })
                  }
                  className="w-full bg-white/10 rounded-xl px-4 py-3 text-white text-sm h-16"
                />
              </div>

              {/* PAY */}
              <button
                onClick={handleWhatsAppPayment}
                className="w-full mt-4 py-4 rounded-xl bg-green-600 flex items-center justify-center gap-2 text-white text-sm"
              >
                <FaWhatsapp />
                Proceed to Payment
              </button>
            </div>
          )}
        </div>

        {/* Floating animation */}
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
