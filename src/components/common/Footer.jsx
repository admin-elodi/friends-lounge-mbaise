// src/components/common/Footer.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaMotorcycle,
  FaConciergeBell,
} from "react-icons/fa";
import { Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import trees from "@/assets/images/palms.jpg";

// Import from features
import { useFoodOrder, FoodOrderModal } from "@/features/food-order";
import { TableBookingModal } from "@/features/TableBookingModal";

const DropdownCard = ({ children, className = "", onClick }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    onClick={onClick}
    className={`relative p-5 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 transition-all duration-300 hover:border-red-500/30 hover:bg-gray-800/50 cursor-pointer ${className}`}
  >
    {children}
  </motion.div>
);

const Card = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className={`space-y-6 text-center rounded-xl p-6 bg-gray-900/70 shadow-lg ${className}`}
  >
    {children}
  </motion.div>
);

const events = [
  { title: "Udo Day 2025", date: "Dec 26 • Nkwo Udo", highlight: "₦1M Sponsor for Unity", desc: "Celebrate culture, food, and community." },
  { title: "Live Jazz Nights", date: "Every Friday", highlight: "Sunset Sessions", desc: "Smooth sounds, craft cocktails." },
  { title: "Heritage Food Fair", date: "Monthly", highlight: "Taste of Mbaise", desc: "Curated local dishes." },
];

const Footer = () => {
  const [currentEvent, setCurrentEvent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [booked, setBooked] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setSelectedExp(null);
    setBooked(false);
  };

  const handleReserve = () => {
    if (!selectedExp || !selectedDate || !selectedTime) return;
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setBooked(true);
      setTimeout(() => {
        setBooked(false);
        closeModal();
      }, 2500);
    }, 1000);
  };

  return (
    <footer className="relative overflow-hidden bg-gray-900/90 text-white py-20 font-montserrat z-10">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${trees})` }}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-gradient-to-t from-red-600 via-red-400 to-transparent blur-xl opacity-35 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-t from-red-900 via-red-700 to-transparent blur-2xl opacity-30 animate-thrust"></div>

      <span className="absolute inset-0 flex justify-center items-center text-[6rem] sm:text-[10rem] font-black text-white/10 pointer-events-none select-none tracking-wide animate-glowText z-0 uppercase">
        Friendship Community Progress
      </span>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        {/* tightened mobile grid spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {/* EVENTS */}
          <Card className="flex flex-col justify-between w-full">
            <div>
              <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold text-white">
                Events
              </motion.h3>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4">
                <div className="relative h-36 overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentEvent}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="absolute inset-0 p-4 flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="text-lg font-bold text-white">{events[currentEvent].title}</h4>
                        <p className="text-sm text-red-400 mt-1">{events[currentEvent].date}</p>
                        <p className="text-xs text-gray-300 mt-1">{events[currentEvent].desc}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-red-400">{events[currentEvent].highlight}</span>
                        <span className="text-2xl font-black text-red-500">→</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="flex justify-center space-x-2 mt-2">
                  {events.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentEvent(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === currentEvent ? "bg-red-500 w-6" : "bg-white/30"}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex space-x-6 justify-center mt-4">
              {[{ Icon: FaXTwitter, label: "X", hover: "hover:bg-[#1DA1F2]" },
                { Icon: SiTiktok, label: "TikTok", hover: "hover:bg-gradient-to-br hover:from-black hover:to-red-700" },
                { Icon: Instagram, label: "Instagram", hover: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:via-[#dc2743] hover:via-[#cc2366] hover:to-[#bc1888]" }
              ].map(({ Icon, label, hover }, i) => (
                <a key={i} href="#" className="flex flex-col items-center group" aria-label={label}>
                  <div className={`transform hover:scale-110 transition-all duration-300 rounded-full flex items-center justify-center w-12 h-12 border-2 border-white/30 bg-transparent text-white shadow-md hover:shadow-lg hover:border-opacity-0 ${hover}`}>
                    <Icon className="text-xl" />
                  </div>
                  <span className="mt-1 text-sm text-gray-300">{label}</span>
                </a>
              ))}
            </motion.div>
          </Card>

          {/* SPECIAL SERVICES + AD */}
          <Card className="w-full">
            <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold text-white">
              Special Services
            </motion.h3>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
              <DropdownCard onClick={openFoodOrder}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaMotorcycle className="text-2xl text-red-400" />
                    <div className="text-left">
                      <h5 className="font-semibold text-white">Order Food</h5>
                      <p className="text-xs text-gray-400">Mbaise-wide • Paystack</p>
                    </div>
                  </div>
                  <span className="text-3xl font-black text-red-500">→</span>
                </div>
              </DropdownCard>

              <DropdownCard onClick={openModal}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaConciergeBell className="text-2xl text-white/70" />
                    <div className="text-left">
                      <h5 className="font-semibold text-white">Book a Table</h5>
                      <p className="text-xs text-gray-400">Choose Time & Experience</p>
                    </div>
                  </div>
                  <span className="text-3xl font-black text-red-500">→</span>
                </div>
              </DropdownCard>

              {/* AD SPACE */}
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} className="relative mt-4 p-6 rounded-2xl border border-white/10 bg-gray-800/20 backdrop-blur-sm hover:border-red-500/30 hover:bg-gray-800/40 transition-all duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-red-900/10 via-transparent to-transparent opacity-30 pointer-events-none"></div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-400 tracking-wide">Sponsored Space</p>
                  <h4 className="text-white font-semibold text-lg">Showcase Your Brand Here</h4>
                  <p className="text-sm text-gray-500 italic">Reach thousands of visitors monthly</p>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="mt-3 px-4 py-1.5 rounded-full border border-red-500/40 text-xs text-red-400 hover:bg-red-500/10 transition-all">
                    Sponsor This Space
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </Card>

          {/* CONTACT */}
          <Card className="w-full">
            <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold text-white">
              Connect
            </motion.h3>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col items-start space-y-4 text-base text-gray-300 mt-4 w-full max-w-md mx-auto">
              <div className="flex items-start space-x-3 w-full">
                <FaMapMarkerAlt className="text-xl text-red-600 mt-1 flex-shrink-0" />
                <p className="text-left leading-relaxed">
                  Friends' House • Donameche Crescent Umuofor Udo • Ezinihitte LGA Mbaise • Imo State
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-xl text-red-600 flex-shrink-0" />
                <a href="tel:+447848149416" className="hover:text-red-500 transition-colors">
                  +44 7848 149416
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-xl text-red-600 flex-shrink-0" />
                <a href="mailto:info@friendsloungembaise.com" className="hover:text-red-500 transition-colors break-all">
                  info@friendsloungembaise.com
                </a>
              </div>
              <motion.a
                href="https://maps.app.goo.gl/qa1JNAykYzaZV6EEA"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 w-full px-4 py-2 text-sm rounded-xl text-white bg-gray-800/40 border border-white/20 hover:bg-red-500/10 text-center transition-colors"
              >
                View Location on Google Maps
              </motion.a>
            </motion.div>
          </Card>
        </div>

        {/* FOOTER BOTTOM */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-16 pt-10 border-t border-red-600/50 text-center relative z-10">
          <p className="font-bold text-[12px] text-gray-300">
            © {new Date().getFullYear()} Friends’ Lounge Mbaise — All Rights Reserved.
          </p>
          <div className="relative flex flex-col items-center justify-center mt-8 space-y-2">
            <div className="relative flex flex-col items-center justify-center">
              <motion.h3
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="text-lg md:text-[13px] font-black text-white tracking-widest drop-shadow-lg"
                style={{ textShadow: "0 0 10px rgba(220,38,38,0.8), 0 0 20px rgba(220,38,38,0.6)" }}
              >
                Making Friends and Building Communities
              </motion.h3>
              
            </div>
          </div>
        </motion.div>
      </div>

      <TableBookingModal
        isOpen={modalOpen}
        onClose={closeModal}
        selectedExp={selectedExp}
        setSelectedExp={setSelectedExp}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        isBooking={isBooking}
        setIsBooking={setIsBooking}
        booked={booked}
        setBooked={setBooked}
        handleReserve={handleReserve}
      />

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

      <style jsx>{`
        @keyframes thrust { 0%, 100% { transform: translateX(-50%) scaleY(1); opacity: 0.2; } 50% { transform: translateX(-50%) scaleY(1.1); opacity: 0.3; } }
        .animate-thrust { animation: thrust 8s ease-in-out infinite; }
        @keyframes glow { 0%, 100% { opacity: 0.6; box-shadow: 0 0 10px rgba(220,38,38,0.3); } 50% { opacity: 1; box-shadow: 0 0 20px rgba(220,38,38,0.6); } }
        .animate-glow { animation: glow 4s ease-in-out infinite; }
        @keyframes glowText { 0%, 100% { text-shadow: 0 0 5px rgba(255,255,255,0.05); } 50% { text-shadow: 0 0 15px rgba(255,255,255,0.08); } }
        .animate-glowText { animation: glowText 5s ease-in-out infinite; }
      `}</style>
    </footer>
  );
};

export default Footer;
