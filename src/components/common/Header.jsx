import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/friends-logo.webp";
import palmsVideo from "@/assets/videos/palms.mp4";
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
    deliveryFee,
  } = useFoodOrder();

  const navList = useMemo(() => navItems, []);

  const handleOpenFoodOrder = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    openFoodOrder();
  };

  return (
    <header className="w-full font-montserrat relative z-10">
      {/* VIDEO HERO */}
      <div className="relative overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={palmsVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-6 gap-4 z-10">
          <div className="flex flex-col items-center w-full md:w-1/3 text-center">
            <Link to="/">
              <img
                src={Logo}
                alt="Friends Lounge Mbaise"
                className="w-28 md:w-[110px]"
              />
            </Link>
            <h1 className="mt-2 text-lg md:text-xl font-semibold tracking-widest text-white">
              Friends' Lounge Mbaise
            </h1>
            <p className="text-[13px] text-gray-200">
              Making Friends & Building Communities
            </p>
          </div>

          <div className="w-full md:w-2/3 flex justify-center relative z-10 -mx-4 md:mx-0">
            <Banner />
          </div>
        </div>
      </div>

      <nav className="hidden md:flex justify-between items-center px-10 py-4 bg-black/50 backdrop-blur-xl">
        <ul className="flex gap-10 text-[15px] text-black font-semibold">
          {navList.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

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
    </header>
  );
}