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
    if (!cart.length) return alert("Add items to cart");

    const summary = cart
      .map(
        (i) =>
          `${i.name} (x${i.quantity}) - ₦${(
            i.price * i.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    const total = getTotal() + deliveryFee;

    const message = encodeURIComponent(
      `🌟 Friends' Lounge Order 🌟

${summary}

Subtotal: ₦${getTotal().toLocaleString()}
Delivery: ₦${deliveryFee.toLocaleString()}
Total: ₦${total.toLocaleString()}

Customer:
${customerInfo.name || "—"}
${customerInfo.phone || "—"}
${customerInfo.address || "—"}

Bank:
${BANK_DETAILS.accountName}
${BANK_DETAILS.accountNumber}
${BANK_DETAILS.bankName}

Send payment proof to confirm.`
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
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-md"
        onClick={close}
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
        <div className="relative h-50">
          <img
            src={ChipsImage}
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
          onClick={close}
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
            Order Food
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Mbaise-wide delivery
          </p>

          {/* Menu */}
          <div className="space-y-3 mb-5">
            {foodMenu.map((item) => {
              const qty =
                cart.find((i) => i.id === item.id)?.quantity || 0;

              return (
                <div
                  key={item.id}
                  className="bg-white/10 border border-white/15 
                  rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <h5 className="text-white text-sm font-medium">
                      {item.name}
                    </h5>
                    <p className="text-xs text-gray-400">
                      {item.desc}
                    </p>
                    <p className="text-sm text-red-400">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={!qty}
                      className="w-8 h-8 rounded-full bg-white/15
                      flex items-center justify-center
                      disabled:opacity-40"
                    >
                      <FaMinus size={12} />
                    </button>

                    <span className="w-6 text-center text-white text-sm">
                      {qty}
                    </span>

                    <button
                      onClick={() => addToCart(item)}
                      className="w-8 h-8 rounded-full bg-red-600
                      flex items-center justify-center"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          {cart.length > 0 && (
            <div className="bg-white/5 border border-white/10 
            rounded-xl p-5 space-y-4">

              <h4 className="text-white font-semibold">
                Your Order
              </h4>

              {cart.map((i) => (
                <div
                  key={i.id}
                  className="flex justify-between text-sm text-gray-300"
                >
                  <span>{i.name} × {i.quantity}</span>
                  <span>
                    ₦{(i.price * i.quantity).toLocaleString()}
                  </span>
                </div>
              ))}

              <div className="flex justify-between text-sm text-gray-300">
                <span>Delivery</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>

              <div className="border-t border-white/10 pt-3 
              flex justify-between text-white font-semibold">
                <span>Total</span>
                <span className="text-red-400">
                  ₦{(getTotal() + deliveryFee).toLocaleString()}
                </span>
              </div>

              {/* Customer */}
              <div className="space-y-3">
                <input
                  placeholder="Full Name"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                  }
                  className="input"
                />

                <input
                  placeholder="Phone"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                  }
                  className="input"
                />

                <textarea
                  placeholder="Delivery Address"
                  value={customerInfo.address}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, address: e.target.value })
                  }
                  className="input h-16 resize-none"
                />
              </div>

              {/* Pay */}
              <button
                onClick={handleWhatsAppPayment}
                className="w-full mt-3 py-3 
                rounded-xl bg-green-600
                flex items-center justify-center gap-2
                text-white text-sm"
              >
                <FaWhatsapp />
                Proceed to Payment
              </button>
            </div>
          )}
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
