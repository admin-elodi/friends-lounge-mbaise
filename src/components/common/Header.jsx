import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, X as CloseIcon } from "lucide-react";

import Logo from "@/assets/images/friends-logo.webp";
import palmsVideo from "@/assets/videos/palm.mp4";

import Banner from "@/components/sections/Banner";
import { useFoodOrder, FoodOrderModal } from "@/features/food-order";
import BookEvent from "@/features/BookEvent";

const navItems = [
  { name: "Home", path: "/" },
  { name: "BrandHub", path: "/brand-hub", badge: true },
  { name: "Friends", path: "/friends" },
  { name: "Mbaise", path: "/mbaise" },
  { name: "Projects", path: "/projects" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookEventOpen, setBookEventOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    deliveryFee,
  } = useFoodOrder();

  const navList = useMemo(() => navItems, []);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Minimal addition: Force scroll to top before opening the food modal
  const handleOpenFoodOrder = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    openFoodOrder();
  };

  const handleSearchClick = () => {
    setSearchModalOpen(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Placeholder: Implement actual search logic here (e.g., navigate to search page or fetch results)
    alert(`Searching for: ${searchQuery}`);
    setSearchModalOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="w-full font-montserrat relative z-50">
      {/* VIDEO HERO SECTION */}
      <div className="relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ filter: 'grayscale(100%)' }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={palmsVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-6 gap-4 z-10">
          {/* Logo & Title - Centered text always */}
          <div className="flex flex-col items-center w-full md:w-1/3 text-center">
            <Link to="/">
              <img
                src={Logo}
                alt="Friends Lounge Mbaise"
                className="w-28 md:w-[110px] drop-shadow-xl cursor-pointer"
                loading="eager"
              />
            </Link>
            <h1 className="mt-2 text-lg md:text-xl font-semibold tracking-widest text-white">
              Friends' Lounge Mbaise
            </h1>
            <p className="text-[13px] text-gray-200">
              Making Friends & Building Communities
            </p>
          </div>

          {/* Banner */}
          <div className="w-full md:w-2/3 flex justify-center relative -mx-4 md:mx-0">
            <Banner />
          </div>
        </div>
      </div>

      {/* DESKTOP NAVIGATION */}
      <nav className="hidden md:flex justify-between items-center px-10 py-4 bg-black/50 backdrop-blur-xl">
        <ul className="flex gap-10 text-sm tracking-wide text-black font-semibold">
          {navList.map((item) => (
            <li key={item.path} className="relative">
              <Link to={item.path} className="hover:text-green-400 transition-colors">
                {item.name}
              </Link>
              {item.badge && (
                <span className="absolute -top-2 -right-5 bg-red-600 text-white text-[9px] px-2 py-[2px] rounded-full font-bold tracking-wider shadow-md">
                  AD
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <button
            onClick={() => setBookEventOpen(true)}
            className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors"
          >
            Book Event
          </button>

          <button
            onClick={handleOpenFoodOrder} // ← Changed only here
            className="bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-500 transition-colors"
          >
            Order Food
          </button>

          <button
            onClick={handleSearchClick}
            className="flex items-center gap-2 border border-green-400 px-4 py-2 rounded-full text-sm text-green-300 hover:bg-green-400 hover:text-black transition-colors"
          >
            <Search size={16} />
            Search
          </button>
        </div>
      </nav>

      {/* MOBILE QUICK BAR */}
      <div className="md:hidden flex justify-between items-center px-4 py-2.5 bg-black/50 backdrop-blur-lg border-t border-white/10">
        <button
          onClick={handleSearchClick}
          className="flex items-center gap-2 px-3 py-1.5 bg-green-900/40 hover:bg-green-900/60 border border-green-500/60 rounded-lg text-green-300 hover:text-green-200 transition-all font-medium shadow-sm"
          aria-label="Open search"
        >
          <Search size={20} strokeWidth={2.5} />
          <span className="text-sm">Search</span>
        </button>

        <button
          onClick={toggleMobileMenu}
          className="p-2.5 bg-emerald-900/50 hover:bg-emerald-800/70 rounded-lg text-white transition-all shadow-md"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X size={26} strokeWidth={2.5} />
          ) : (
            <Menu size={26} strokeWidth={2.5} />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="absolute left-0 top-full w-full bg-black/92 backdrop-blur-xl border-t border-white/10 shadow-2xl">
          <ul className="flex flex-col divide-y divide-white/10 text-white font-medium">
            {navList.map((item) => (
              <li key={item.path} className="relative">
                <Link
                  to={item.path}
                  onClick={closeMobileMenu}
                  className="block px-6 py-3.5 hover:bg-white/10 transition-colors"
                >
                  {item.name}
                </Link>
                {item.badge && (
                  <span className="absolute top-1/2 -translate-y-1/2 right-6 bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold tracking-wider">
                    AD
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="px-6 py-5 space-y-3 border-t border-white/10">
            <button
              onClick={() => {
                handleOpenFoodOrder(); // ← Changed only here
                closeMobileMenu();
              }}
              className="w-full bg-red-600 py-3 rounded-xl font-semibold text-sm hover:bg-red-500 transition-colors"
            >
              Order Food
            </button>

            <button
              onClick={() => {
                setBookEventOpen(true);
                closeMobileMenu();
              }}
              className="w-full bg-white py-3 rounded-xl text-black font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Book Event
            </button>
          </div>
        </div>
      )}

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />

      {/* Modals */}
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

      <BookEvent isOpen={bookEventOpen} onClose={() => setBookEventOpen(false)} />

      {/* Search Modal - Small & Cute */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-80 max-w-[90%] bg-white/95 rounded-2xl shadow-2xl p-6 animate-fade-in">
            <button
              onClick={() => setSearchModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close search modal"
            >
              <CloseIcon size={20} />
            </button>

            <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4">
              <h3 className="text-center text-lg font-semibold text-emerald-800">
                What are you looking for?
              </h3>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter keywords..."
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-800 placeholder-gray-500"
                autoFocus
              />
              <button
                type="submit"
                className="bg-emerald-500 text-white py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors shadow-sm"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

// Optional animation for modal
<style>{`
  @keyframes fade-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }
`}</style>