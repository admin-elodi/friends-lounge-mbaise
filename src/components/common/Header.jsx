import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import Logo from "@/assets/images/friends-logo.webp";
import mtnBadge from "@/assets/images/mtn-n.png";
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

  const now = new Date();
  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const formattedDate = `${dayNames[now.getDay()]}, ${monthNames[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  const time = now.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:true});
  const timestamp = `${formattedDate} at ${time} WAT`;

  return (
    <header className="w-full bg-black/95 text-white font-montserrat relative z-50">

      {/* TIMESTAMP */}
      <div className="relative w-full py-3 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[260px] h-[260px] -translate-x-1/2 -translate-y-1/2 bg-yellow-300/20 blur-2xl rounded-full animate-bigSun pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine" />
        <div className="relative text-center text-sm tracking-wider font-semibold bg-gradient-to-r from-yellow-400/20 via-yellow-400/10 to-yellow-400/20 py-[6px] border-y border-yellow-400/20 backdrop-blur-md shadow-lg animate-timeLift">
          {timestamp}
        </div>
      </div>

      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-4 gap-4">
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3 text-center md:text-left">
          <img src={Logo} alt="Friends Lounge" className="w-32 md:w-[250px]" />
          <h1 className="mt-1 text-md md:text-xl font-semibold tracking-widest">
            Friends' Lounge Mbaise
          </h1>
          <p className="text-[13px] opacity-80 -mt-1">
            Making Friends & Building Communities
          </p>
        </div>

        <div className="w-full md:w-2/3 flex justify-center relative -mx-4 md:mx-0">
          <Banner />
        </div>
      </div>

      {/* DESKTOP NAV */}
      <nav className="hidden md:flex justify-between items-center px-10 py-3">
        <ul className="flex gap-10 text-sm tracking-wide">
          <li><Link to="/" className="hover:text-green-400">Home</Link></li>

          <li className="relative">
            <Link to="/programs" className="hover:text-green-400 flex gap-1">
              Programs
            </Link>
            <img
              src={mtnBadge}
              alt="badge"
              className="absolute -top-2 -right-4 w-5 h-5 rounded-full border border-white/30"
            />
          </li>

          <li><Link to="/friends" className="hover:text-green-400">Friends</Link></li>
          <li><Link to="/mbaise" className="hover:text-green-400">Mbaise</Link></li>
          <li><Link to="/projects" className="hover:text-green-400">Projects</Link></li>
        </ul>

        <div className="flex gap-3">
          <button
            onClick={()=>setBookEventOpen(true)}
            className="bg-white text-black px-4 py-[6px] rounded-full text-sm font-semibold"
          >
            Book Event
          </button>

          <button
            onClick={openFoodOrder}
            className="bg-red-600 px-4 py-[6px] rounded-full text-sm font-semibold"
          >
            Order Food
          </button>

          <button className="flex items-center gap-2 border border-yellow-400/40 px-4 py-1 rounded-full text-sm">
            <Search size={16}/> Search
          </button>
        </div>
      </nav>

      {/* MOBILE NAV BAR */}
      <div className="md:hidden flex justify-between items-center px-4 py-3">
        <button className="flex items-center gap-2 border border-green-400 px-3 py-[6px] rounded-full text-xs">
          <Search size={14}/> Search
        </button>

        <button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28}/> : <Menu size={28}/>}
        </button>
      </div>

      {/* MOBILE DROPDOWN – REFINED */}
      {mobileMenuOpen && (
        <div className="absolute left-0 top-full w-full bg-black/95 border-t border-white/10 shadow-2xl">

          <ul className="flex flex-col divide-y divide-white/10">

            <li>
              <Link
                to="/"
                onClick={()=>setMobileMenuOpen(false)}
                className="block px-6 py-4 hover:bg-white/5 transition"
              >
                Home
              </Link>
            </li>

            <li className="relative">
              <Link
                to="/programs"
                onClick={()=>setMobileMenuOpen(false)}
                className="block px-6 py-4 hover:bg-white/5 transition"
              >
                Programs
              </Link>

              <img
                src={mtnBadge}
                alt="badge"
                className="absolute top-4 right-6 w-4 h-4 rounded-full border border-white/30"
              />
            </li>

            <li>
              <Link
                to="/friends"
                onClick={()=>setMobileMenuOpen(false)}
                className="block px-6 py-4 hover:bg-white/5 transition"
              >
                Friends
              </Link>
            </li>

            <li>
              <Link
                to="/mbaise"
                onClick={()=>setMobileMenuOpen(false)}
                className="block px-6 py-4 hover:bg-white/5 transition"
              >
                Mbaise
              </Link>
            </li>

            <li>
              <Link
                to="/projects"
                onClick={()=>setMobileMenuOpen(false)}
                className="block px-6 py-4 hover:bg-white/5 transition"
              >
                Projects
              </Link>
            </li>
          </ul>

          {/* ACTION BUTTONS */}
          <div className="px-6 py-4 space-y-3 border-t border-white/10">
            <button
              onClick={openFoodOrder}
              className="w-full bg-red-600 py-3 rounded-lg font-semibold text-sm"
            >
              Order Food
            </button>

            <button
              onClick={()=>setBookEventOpen(true)}
              className="w-full bg-white py-3 rounded-lg text-black font-semibold text-sm"
            >
              Book Event
            </button>
          </div>
        </div>
      )}

      {/* FADE INTO HERO */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-black pointer-events-none" />

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

      <BookEvent isOpen={bookEventOpen} onClose={()=>setBookEventOpen(false)} />

      <style>
        {`
        @keyframes bigSun{0%{opacity:.15}50%{opacity:.35}100%{opacity:.15}}
        @keyframes shine{0%{opacity:0}100%{opacity:.1}}
        @keyframes timeLift{0%{transform:translateY(0)}50%{transform:translateY(-2px)}100%{transform:translateY(0)}}
        .animate-bigSun{animation:bigSun 7s infinite}
        .animate-shine{animation:shine 2s forwards}
        .animate-timeLift{animation:timeLift 4s infinite}
        `}
      </style>
    </header>
  );
}
