// src/features/food-order/useFoodOrder.js
import { useState, useEffect, useCallback } from "react";

export const useFoodOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "", phone: "", email: "", address: "", notes: ""
  });
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paystackHandler, setPaystackHandler] = useState(null);

  const deliveryFee = 500;

  // Load Paystack
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setPaystackHandler(() => window.PaystackPop);
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  // Load cart
  useEffect(() => {
    const saved = sessionStorage.getItem("foodCart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Save cart
  useEffect(() => {
    sessionStorage.setItem("foodCart", JSON.stringify(cart));
  }, [cart]);

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setPaymentSuccess(false);
  };

  const addToCart = useCallback((item) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id, delta) => {
    setCart(prev => prev.map(i => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)));
  }, []);

  const getTotal = useCallback(() => {
    return cart.reduce((s, i) => s + i.price * i.quantity, 0) + deliveryFee;
  }, [cart]);

  const handlePayment = useCallback(() => {
    if (!customerInfo.email || cart.length === 0 || !paystackHandler) return;

    const totalKobo = getTotal() * 100;
    const ref = `FLM-${Date.now()}`;

    paystackHandler()({
      key: "pk_test_YOUR_KEY_HERE", // ← Replace
      email: customerInfo.email,
      amount: totalKobo,
      ref,
      metadata: { ...customerInfo },
      callback: () => {
        setIsPaying(false);
        setPaymentSuccess(true);
        setCart([]);
        sessionStorage.removeItem("foodCart");
        setTimeout(close, 3000);
      },
      onClose: () => setIsPaying(false),
    });

    setIsPaying(true);
  }, [customerInfo, cart, getTotal, paystackHandler]);

  return {
    isOpen,
    open,
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
    deliveryFee
  };
};