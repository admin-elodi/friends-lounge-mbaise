import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import Logo from "@/assets/images/friends-logo.webp";
import palmsVideo from "@/assets/videos/palm.mp4";  
import Banner from "@/components/sections/Banner";
import { useFoodOrder, FoodOrderModal } from "@/features/food-order";
import BookEvent from "@/features/BookEvent";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookEventOpen, setBookEventOpen] = useState(false);

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

  return (
    <header className="w-full font-montserrat relative z-50">

      {/* TOP SECTION – VIDEO BACKGROUND */}
      <div className="relative overflow-hidden">

        {/* Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          // style={{
          //   filter: "grayscale(100%) brightness(1.4) contrast(1.1)"
          // }}
        >
          <source src={palmsVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Lighter overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-6 gap-4 z-10">

          {/* LOGO AREA */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/3 text-center md:text-left">
            <img
              src={Logo}
              alt="Friends Lounge"
              className="w-28 md:w-[110px] drop-shadow-xl"
            />

            <h1 className="mt-2 text-lg md:text-xl font-semibold tracking-widest text-white">
              Friends' Lounge Mbaise
            </h1>

            <p className="text-[13px] text-gray-200">
              Making Friends & Building Communities
            </p>
          </div>

          {/* BANNER */}
          <div className="w-full md:w-2/3 flex justify-center relative -mx-4 md:mx-0">
            <Banner />
          </div>
        </div>
      </div>

      {/* DESKTOP NAV */}
      <nav className="hidden md:flex justify-between items-center px-10 py-4 bg-black/50 backdrop-blur-xl">

        <ul className="flex gap-10 text-sm tracking-wide text-black font-semibold">

          {[
            { name: "Home", path: "/" },
            { name: "Programs", path: "/programs", badge: true },
            { name: "Friends", path: "/friends" },
            { name: "Mbaise", path: "/mbaise" },
            { name: "Projects", path: "/projects" },
          ].map((item, i) => (
            <li key={i} className="relative">

              <Link
                to={item.path}
                className="hover:text-green-400 transition"
              >
                {item.name}
              </Link>

              {/* NEUTRAL AD BADGE */}
              {item.badge && (
                <span className="absolute -top-2 -right-5 bg-red-600 text-white text-[9px] px-2 py-[2px] rounded-full font-bold tracking-wider shadow-md">
                  AD
                </span>
              )}

            </li>
          ))}
        </ul>

        {/* ACTIONS */}
        <div className="flex gap-3">

          <button
            onClick={() => setBookEventOpen(true)}
            className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
          >
            Book Event
          </button>

          <button
            onClick={openFoodOrder}
            className="bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-500 transition"
          >
            Order Food
          </button>

          <button className="flex items-center gap-2 border border-green-400 px-4 py-2 rounded-full text-sm text-green-300 hover:bg-green-400 hover:text-black transition">
            <Search size={16} /> Search
          </button>
        </div>
      </nav>

      {/* MOBILE BAR */}
      <div className="md:hidden flex justify-between items-center px-4 py-4 bg-white/10 backdrop-blur-md border-t border-white/15">

        <button className="flex items-center gap-2 border border-green-400 px-4 py-2 rounded-full text-xs text-green-300">
          <Search size={14} /> Search
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white bg-black/40 p-2 rounded-lg"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="absolute left-0 top-full w-full bg-black/85 backdrop-blur-xl border-t border-white/10 shadow-xl">

          <ul className="flex flex-col divide-y divide-white/10 text-white font-semibold">

            {[
              { name: "Home", path: "/" },
              { name: "Programs", path: "/programs", badge: true },
              { name: "Friends", path: "/friends" },
              { name: "Mbaise", path: "/mbaise" },
              { name: "Projects", path: "/projects" },
            ].map((item, i) => (
              <li key={i} className="relative">

                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-6 py-4 hover:bg-white/10 transition"
                >
                  {item.name}
                </Link>

                {/* MOBILE AD BADGE */}
                {item.badge && (
                  <span className="absolute top-4 right-6 bg-red-600 text-white text-[10px] px-2 py-[2px] rounded-full font-bold tracking-wider">
                    AD
                  </span>
                )}

              </li>
            ))}
          </ul>

          {/* ACTIONS */}
          <div className="px-6 py-5 space-y-3 border-t border-white/10">

            <button
              onClick={openFoodOrder}
              className="w-full bg-red-600 py-3 rounded-xl font-semibold text-sm hover:bg-red-500 transition"
            >
              Order Food
            </button>

            <button
              onClick={() => setBookEventOpen(true)}
              className="w-full bg-white py-3 rounded-xl text-black font-semibold text-sm hover:bg-gray-200 transition"
            >
              Book Event
            </button>
          </div>
        </div>
      )}

      {/* FADE INTO HERO */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />

      {/* MODALS */}
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

      <BookEvent
        isOpen={bookEventOpen}
        onClose={() => setBookEventOpen(false)}
      />
    </header>
  );
}
