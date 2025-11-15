// src/components/common/Header.jsx
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import Logo from "@/assets/images/friends-logo.webp";
import Banner from "@/components/sections/Banner";

// ✅ Import Food Order Modal hook
import { useFoodOrder, FoodOrderModal } from "@/features/food-order";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ FOOD ORDER HOOK (connected to modal)
  const {
    isOpen: foodModalOpen,
    open: openFoodOrder,
    close: closeFoodOrder,
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

  // TIMESTAMP (NO CHANGE)
  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const formattedDate = `${dayNames[now.getDay()]}, ${monthNames[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  const timestamp = `${formattedDate} at ${time} WAT`;

  return (
    <header className="w-full bg-black/90 text-white font-montserrat relative z-50">
      {/* TIME STAMP */}
      <div className="w-full text-center text-xs py-1 tracking-wide opacity-80">{timestamp}</div>

      {/* TOP SECTION — LOGO + EVENT BANNER */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-3 gap-4">
        
        {/* LOGO + NAME + SLOGAN */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3 text-center md:text-left">
          <img src={Logo} alt="Friends Lounge Logo" className="w-32 md:w-[250px] object-contain" />
          <div className="text-center">
            <h1 className="mt-1 text-lg md:text-xl font-montserrat font-semibold tracking-widest">
              Friends' Lounge Mbaise
            </h1>
            <p className="text-[13px] opacity-80 -mt-1 font-montserrat">
              Making Friends & Building Communities
            </p>
          </div>
        </div>

        {/* ✅ AD / EVENT BANNER (NO CHANGE) */}
        <div className="w-full md:w-2/3 flex justify-center relative -mx-4 md:mx-0">
          <Banner
            title="UDO DAY 2025"
            subtitle="Advertise here — reach thousands of eyes daily"
            ctaText="Buy Ad"
            ctaBg="bg-green-500"
          />
        </div>
      </div>

      {/* ✅ DESKTOP NAV */}
      <nav className="hidden md:flex justify-between items-center px-10 py-3 border-t border-white/10">
        <ul className="flex gap-10 text-sm font-montserrat tracking-wide">
          <li className="cursor-pointer hover:text-green-400">Home</li>
          <li className="cursor-pointer hover:text-green-400">Friends</li>
          <li className="cursor-pointer hover:text-green-400">Community</li>
          <li className="cursor-pointer hover:text-green-400">Events</li>
          <li className="cursor-pointer hover:text-green-400">Projects</li>
        </ul>

        {/* ✅ BUTTON GROUP ON RIGHT (NEW) */}
        <div className="flex items-center gap-3">
          {/* BOOK EVENT BUTTON */}
          <button className="bg-white text-black px-4 py-[6px] rounded-full text-sm font-semibold font-montserrat hover:bg-gray-300 transition">
            Book Event
          </button>

          {/* ORDER FOOD BUTTON (opens FoodOrderModal.jsx) */}
          <button
            className="bg-red-600 px-4 py-[6px] rounded-full text-sm font-semibold font-montserrat hover:bg-red-500 transition"
            onClick={openFoodOrder}
          >
            Order Food
          </button>

          {/* SEARCH BUTTON (unchanged, just moved to rightmost) */}
          <button className="flex items-center gap-2 border border-green-400 px-4 py-1 rounded-full hover:bg-green-500 hover:text-black transition font-montserrat text-sm">
            <Search size={16} />
            Search
          </button>
        </div>
      </nav>

      {/* ✅ MOBILE NAV */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 border-t border-white/10">
        <button className="flex items-center gap-2 border border-green-400 px-3 py-[6px] rounded-full text-xs font-montserrat">
          <Search size={14} />
          Search
        </button>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ✅ MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className="absolute w-[90%] left-1/2 -translate-x-1/2 mt-2 rounded-3xl backdrop-blur-xl bg-black/30 p-6 shadow-2xl border border-white/20 font-montserrat">
          <ul className="flex flex-col items-center gap-4 text-base">
            <li className="cursor-pointer hover:text-green-400">Home</li>
            <li className="cursor-pointer hover:text-green-400">Friends</li>
            <li className="cursor-pointer hover:text-green-400">Community</li>
            <li className="cursor-pointer hover:text-green-400">Events</li>
            <li className="cursor-pointer hover:text-green-400">Projects</li>
          </ul>

          <div className="flex flex-col gap-3 mt-6">
            {/* OPEN MODAL FROM MOBILE */}
            <button onClick={openFoodOrder} className="bg-red-600 w-full py-2 rounded-full font-semibold text-sm">
              Order Food
            </button>

            <button className="bg-white w-full py-2 rounded-full text-black font-semibold text-sm">
              Book Event
            </button>
          </div>
        </div>
      )}

      {/* ✅ FOOD ORDER MODAL (connected to button above) */}
      <FoodOrderModal
        isOpen={foodModalOpen}
        close={closeFoodOrder}
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
}
