// src/components/common/Header.jsx
import React, { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import logo from "@/assets/images/friends-logo.webp";
import { useFoodOrder, FoodOrderModal } from "@/features/food-order";   // <-- NEW

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);

  // ---------- FOOD ORDER HOOK ----------
  const {
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
  } = useFoodOrder();

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    setSearchOpen(false);
  };

  // ---- SCROLL DETECTION ----
  useEffect(() => {
    let rafId;
    let timeoutId;

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsScrolling(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setIsScrolling(false), 150);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ✅ Close dropdown when user opens modal or performs key action
  const handleOrderFood = () => {
    setMenuOpen(false); // close dropdown
    open(); // open food order modal
  };

  const handleBookEvent = () => {
    setMenuOpen(false); // close dropdown
    // future event booking logic can go here
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 flex justify-between items-center sm:px-4 py-4
      text-white transition-all duration-300 ease-out will-change-transform ${
        isScrolling ? "bg-black/90 shadow-lg" : "bg-transparent"
      }`}
      style={{ willChange: "background-color, box-shadow" }}
    >
      {/* ===== Left: Logo & Name ===== */}
      <div className="flex flex-col sm:flex-row items-center sm:gap-2 ml-2 sm:ml-3 text-center sm:text-left transition-all duration-300 ease-out">
        <div className="flex flex-col items-left sm:flex-row sm:items-center sm:gap-2">
          <img
            src={logo}
            alt="Friends Lounge Logo"
            className="w-18 h-14 sm:w-14 sm:h-14 object-contain"
            loading="eager"
          />
          <span className="font-[Montserrat] text-[17px] sm:text-base font-bold tracking-widest whitespace-nowrap mt-1 sm:mt-0 text-center sm:text-left">
            Friends' Lounge Mbaise
          </span>
        </div>

        {/* ✅ Replaced address with a sharp slogan */}
        <span className="text-[11px] sm:text-xs text-gray-300 mt-1 sm:mt-0 sm:ml-2 italic tracking-wide transition-all duration-500 ease-out">
          | Making Friends and Building Communities
        </span>
      </div>

      {/* ===== Right: Menu & Search ===== */}
      <div className="flex items-center gap-3 sm:gap-5 mr-2 sm:mr-3">
        <div className="relative flex items-center">
          {/* Search Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full 
              bg-transparent hover:bg-white/20 transition-all duration-300 ease-out shadow-none"
              style={{ zIndex: 20 }}
            >
              <Search size={22} className="text-white" />
            </button>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`relative z-30 flex flex-col justify-center items-center w-14 h-14 
            bg-white/15 rounded-lg shadow-lg hover:bg-white/25 transition-all duration-300 ease-out 
            transform-gpu ${menuOpen ? "scale-95" : "scale-100"}`}
          >
            <div
              className={`w-8 h-[2.5px] bg-white rounded-full transition-all duration-300 ease-out transform-gpu ${
                menuOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            ></div>
            <div
              className={`w-8 h-[2.5px] bg-white rounded-full my-[5px] transition-all duration-300 ease-out transform-gpu ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></div>
            <div
              className={`w-8 h-[2.5px] bg-white rounded-full transition-all duration-300 ease-out transform-gpu ${
                menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* ===== Dropdown Menu ===== */}
      {menuOpen && (
        <div className="absolute top-full right-4 sm:right-6 mt-3 w-56 bg-white/20 
          backdrop-blur-xl rounded-2xl shadow-2xl border border-white/25 
          py-4 flex flex-col gap-3 items-center animate-fadeIn transform-gpu">
          {["Home", "Friends", "Community", "Events", "Projects"].map((item) => (
            <button
              key={item}
              className="text-white font-medium tracking-wide hover:text-red-500 
              transition-all duration-300 ease-out transform-gpu"
            >
              {item}
            </button>
          ))}

          <div className="flex flex-col gap-2 mt-3 w-full px-4">
            {/* <<< ORDER FOOD BUTTON NOW OPENS MODAL >>> */}
            <button
              onClick={handleOrderFood}
              className="w-full bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition-all ease-out"
            >
              Order Food
            </button>

            <button
              onClick={handleBookEvent}
              className="w-full bg-white text-red-600 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-all ease-out"
            >
              Book Event
            </button>
          </div>
        </div>
      )}

      {/* ===== Search Modal ===== */}
      {searchOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[999] animate-fadeIn mt-60"
          onClick={() => setSearchOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/15 border border-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-80 flex flex-col items-center gap-4 text-center text-white animate-fadeInUp transform-gpu"
          >
            <h3 className="text-lg font-semibold tracking-wide">
              Search food, drink, etc
            </h3>
            <input
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all ease-out"
            />

            <div className="flex justify-between w-full mt-3">
              <button
                onClick={handleSearch}
                className="flex-1 mr-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 hover:opacity-90 text-white rounded-xl font-semibold transition-all ease-out"
              >
                Search
              </button>
              <button
                onClick={() => setSearchOpen(false)}
                className="flex-1 ml-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-medium transition-all ease-out"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <<<--- FOOD ORDER MODAL (shared) --->>> */}
      <FoodOrderModal
        isOpen={isOpen}
        close={close}
        cart={cart}
        addToCart={addToCart}
        updateQuantity={updateQuantity}
        getTotal={getTotal}
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
        handlePayment={handlePayment}
        isPaying={isPaying}
        paymentSuccess={paymentSuccess}
        deliveryFee={deliveryFee}
      />
    </header>
  );
};

export default Header;
