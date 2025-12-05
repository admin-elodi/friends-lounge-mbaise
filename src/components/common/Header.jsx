// src/components/common/Header.jsx
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import Logo from "@/assets/images/friends-logo.webp";
import upaBadge from "@/assets/images/upa.png"; // ← badge image
import Banner from "@/components/sections/Banner";

// Food Order Modal hook
import { useFoodOrder, FoodOrderModal } from "@/features/food-order";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const formattedDate = `${dayNames[now.getDay()]}, ${monthNames[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  const timestamp = `${formattedDate} at ${time} WAT`;

  const goTo = (path) => {
    window.location.href = path;
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-black/90 text-white font-montserrat relative z-50">
      {/* TIMESTAMP */}
      <div className="relative w-full py-3 overflow-hidden border-b border-white/10">
        <div className="absolute top-1/2 left-1/2 w-[260px] h-[260px] -translate-x-1/2 -translate-y-1/2 bg-yellow-300/20 blur-2xl rounded-full animate-bigSun pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
        <div className="relative text-center text-sm tracking-wider font-semibold bg-gradient-to-r from-green-400/20 via-green-400/10 to-green-400/20 py-[6px] border-y border-green-400/20 backdrop-blur-md shadow-lg animate-timeLift">
          {timestamp}
        </div>
      </div>

      {/* TOP SECTION — LOGO + EVENT BANNER */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-3 gap-4">
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3 text-center md:text-left">
          <img src={Logo} alt="Friends Lounge Logo" className="w-32 md:w-[250px] object-contain" />
          <div className="text-center">
            <h1 className="mt-1 text-md md:text-xl font-montserrat font-semibold tracking-widest">
              Friends' Lounge Mbaise
            </h1>
            <p className="text-[13px] opacity-80 -mt-1 font-montserrat">
              Making Friends & Building Communities
            </p>
          </div>
        </div>
        <div className="w-full md:w-2/3 flex justify-center relative -mx-4 md:mx-0">
          <Banner
            title="UDO DAY 2025"
            subtitle="Advertise here — reach thousands of eyes daily"
            ctaText="Buy Ad"
            ctaBg="bg-green-500"
          />
        </div>
      </div>

      {/* DESKTOP NAV */}
      <nav className="hidden md:flex justify-between items-center px-10 py-3 border-t border-white/10">
        <ul className="flex gap-10 text-sm font-montserrat tracking-wide relative">
          <li><a onClick={() => goTo("/")} className="cursor-pointer hover:text-green-400 transition">Home</a></li>

          {/* PROGRAMS WITH BADGE */}
          <li className="relative">
            <a onClick={() => goTo("/programs")} className="cursor-pointer hover:text-green-400 transition flex items-center gap-1">
              Programs
            </a>
            <img src={upaBadge} alt="badge" className="absolute -top-2 -right-4 w-5 h-5 md:w-6 md:h-6 rounded-full border border-white/30 shadow-lg" />
          </li>

          <li><a onClick={() => goTo("/friends")} className="cursor-pointer hover:text-green-400 transition">Friends</a></li>
          <li><a onClick={() => goTo("/mbaise")} className="cursor-pointer hover:text-green-400 transition">Mbaise</a></li>
          <li><a onClick={() => goTo("/projects")} className="cursor-pointer hover:text-green-400 transition">Projects</a></li>
        </ul>

        <div className="flex items-center gap-3">
          <button className="bg-white text-black px-4 py-[6px] rounded-full text-sm font-semibold font-montserrat hover:bg-gray-300 transition">
            Book Event
          </button>
          <button
            className="bg-red-600 px-4 py-[6px] rounded-full text-sm font-semibold font-montserrat hover:bg-red-500 transition"
            onClick={openFoodOrder}
          >
            Order Food
          </button>
          <button className="flex items-center gap-2 border border-green-400 px-4 py-1 rounded-full hover:bg-green-500 hover:text-black transition font-montserrat text-sm">
            <Search size={16} />
            Search
          </button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 border-t border-white/10">
        <button className="flex items-center gap-2 border border-green-400 px-3 py-[6px] rounded-full text-xs font-montserrat">
          <Search size={14} />
          Search
        </button>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="absolute w-[90%] left-1/2 -translate-x-1/2 mt-2 rounded-3xl backdrop-blur-xl bg-black/30 p-6 shadow-2xl border border-white/20 font-montserrat">
          <ul className="flex flex-col items-center gap-4 text-base">
            <li><a onClick={() => goTo("/")} className="hover:text-green-400 transition">Home</a></li>

            {/* MOBILE PROGRAMS BADGE */}
            <li className="relative">
              <a onClick={() => goTo("/programs")} className="hover:text-green-400 transition flex items-center gap-1">
                Programs
              </a>
              <img src={upaBadge} alt="badge" className="absolute -top-1 -right-5 w-4 h-4 md:w-5 md:h-5 rounded-full border border-white/30 shadow-sm" />
            </li>

            <li><a onClick={() => goTo("/friends")} className="hover:text-green-400 transition">Friends</a></li>
            <li><a onClick={() => goTo("/mbaise")} className="hover:text-green-400 transition">Mbaise</a></li>
            <li><a onClick={() => goTo("/projects")} className="hover:text-green-400 transition">Projects</a></li>
          </ul>

          <div className="flex flex-col gap-3 mt-6">
            <button onClick={openFoodOrder} className="bg-red-600 w-full py-2 rounded-full font-semibold text-sm">
              Order Food
            </button>
            <button className="bg-white w-full py-2 rounded-full text-black font-semibold text-sm">
              Book Event
            </button>
          </div>
        </div>
      )}

      {/* FOOD ORDER MODAL */}
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

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes bigSun {0% { opacity: 0.15; transform: scale(1); }50% { opacity: 0.35; transform: scale(1.15); }100% { opacity: 0.15; transform: scale(1); }}
          @keyframes shine {0% { opacity: 0; }100% { opacity: 0.1; }}
          @keyframes timeLift {0% { transform: translateY(0); }50% { transform: translateY(-2px); }100% { transform: translateY(0); }}
          .animate-bigSun {animation: bigSun 7s ease-in-out infinite;}
          .animate-shine {animation: shine 2s ease-in forwards;}
          .animate-timeLift {animation: timeLift 4s ease-in-out infinite;}
        `}
      </style>
    </header>
  );
}
