import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaMotorcycle,
  FaConciergeBell,
  FaFacebookF,
} from "react-icons/fa";
import { Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import trees from "@/assets/images/palms.jpg";

import { useFoodOrder, FoodOrderModal } from "@/features/food-order";
import { TableBookingModal } from "@/features/TableBookingModal";
import BookEvent from "@/features/BookEvent"; 

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
  { title: "Heritage Food Fair", date: "Monthly", highlight: "Taste of Mbaise", desc: "Curated local dishes." },
];

const Footer = () => {
  const navigate = useNavigate();

  const [currentEvent, setCurrentEvent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [booked, setBooked] = useState(false);

  const [bookEventOpen, setBookEventOpen] = useState(false);

  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

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

  useEffect(() => {
    const target = new Date("December 26, 2025 00:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      setDaysLeft(Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24))));
      setHoursLeft(Math.max(0, Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))));
      setMinutesLeft(Math.max(0, Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))));
      setSecondsLeft(Math.max(0, Math.floor((difference % (1000 * 60)) / 1000)));
    }, 1000);
    return () => clearInterval(timer);
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
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${trees})` }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-gradient-to-t from-red-600 via-red-400 to-transparent blur-xl opacity-35 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-t from-red-900 via-red-700 to-transparent blur-2xl opacity-30 animate-thrust"></div>

      <span className="absolute inset-0 flex justify-center items-center text-[6rem] sm:text-[10rem] font-black text-white/10 pointer-events-none select-none tracking-wide animate-glowText z-0 uppercase">
        Friendship Community Progress
      </span>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">

          {/* EVENTS COLUMN */}
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

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setBookEventOpen(true)}
                  className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 text-white font-medium text-sm tracking-wider hover:from-white/20 hover:to-white/10 transition-all duration-300 shadow-lg"
                >
                  Book Your Event
                </motion.button>
              </motion.div>
            </div>

            {/* SOCIAL ICONS */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex space-x-6 justify-center mt-4">
              {[
                { Icon: FaXTwitter, label: "X", href: "#", hoverBg: "hover:bg-black" },
                { Icon: SiTiktok, label: "TikTok", href: "https://www.tiktok.com/@friends.lounge6", hoverBg: "hover:bg-black", hoverText: "hover:text-[#ff0050]" },
                { Icon: FaFacebookF, label: "Facebook", href: "https://web.facebook.com/people/Zee-Zee/...", hoverBg: "hover:bg-[#1877F2]" },
                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/friends_lounge_udo/", hoverBg: "hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-500 hover:to-orange-400" },
              ].map(({ Icon, label, href, hoverBg, hoverText = "hover:text-white" }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group" aria-label={label}>
                  <div className={`transform hover:scale-110 transition-all duration-300 rounded-full flex items-center justify-center w-12 h-12 border-2 border-white/30 bg-transparent text-white shadow-md hover:shadow-lg hover:border-opacity-0 ${hoverBg} ${hoverText}`}>
                    <Icon className="text-xl" />
                  </div>
                  <span className="mt-1 text-sm text-gray-300">{label}</span>
                </a>
              ))}
            </motion.div>
          </Card>

          {/* SPECIAL SERVICES + AD SLOT */}
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

              {/* 🔥 NEUTRAL AD SLOT */}
              <Link to="/advertise" className="block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative mt-6 p-6 bg-gradient-to-br 
                  from-black via-gray-900 to-black 
                  backdrop-blur-md border border-red-500/40 
                  shadow-lg overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>

                  <div className="relative z-10 text-center space-y-2">
                    <p className="text-xs uppercase tracking-widest text-red-400 font-light">
                      Sponsored Space
                    </p>

                    <div className="w-14 h-14 mx-auto rounded-full 
                    border border-red-500/60 flex items-center 
                    justify-center text-red-500 font-black">
                      LOGO
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-widest animate-softPulse">
                      YOUR BRAND HERE
                    </h3>

                    <p className="text-xs text-gray-200 italic">
                      Reach the Mbaise community
                    </p>

                    <p className="text-xs text-gray-300">
                      Banner • Programs • Footer exposure
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-3 px-5 py-2 rounded-[10px] 
                      bg-gradient-to-r from-red-600 to-red-500 
                      text-white text-sm font-bold tracking-wider 
                      hover:from-red-500 hover:to-red-400 
                      transition-all shadow-lg"
                    >
                      Advertise With Us
                    </motion.button>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </Card>

          {/* CONNECT COLUMN */}
          <Card className="w-full">
            <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold text-white">
              Connect
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-start space-y-4 text-base text-gray-300 mt-4 w-full max-w-md mx-auto"
            >
              <div className="flex items-start space-x-3 w-full">
                <FaMapMarkerAlt className="text-xl text-red-600 mt-1 flex-shrink-0" />
                <p className="text-left leading-relaxed">
                  Friends' Lounge • Donameche Crescent Umuofor Udo • Ezinihitte LGA Mbaise • Imo State
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-xl text-red-600 flex-shrink-0" />
                <a href="tel:+447848149416" className="hover:text-red-500 transition-colors">
                  07066064379
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-xl text-red-600 flex-shrink-0" />
                <a href="mailto:enquiries@friendsloungembaise.com" className="hover:text-red-500 text-[15px] transition-colors break-all">
                  enquiries@friendsloungembaise.com
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

              <div className="w-full mt-6 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-2 font-medium">Explore</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Link to="/friends" className="text-gray-300 hover:text-white transition">Friends</Link>
                  <Link to="/programs" className="text-gray-300 hover:text-white transition">Programs</Link>
                  <Link to="/mbaise" className="text-gray-300 hover:text-white transition">Mbaise</Link>
                  <Link to="/projects" className="text-gray-300 hover:text-white transition">Projects</Link>
                </div>
              </div>
            </motion.div>
          </Card>
        </div>

        {/* FOOTER BOTTOM */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-16 pt-10 border-t border-red-600/50 text-center relative z-10">
          <p className="font-bold text-[12px] text-gray-300">
            © {new Date().getFullYear()} Friends’ Lounge Mbaise — All Rights Reserved.
          </p>

          <div className="relative flex flex-col items-center justify-center mt-8 space-y-2">
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 pt-8 border-t border-white/5 text-center"
          >
            <p className="text-[10px] text-gray-500 tracking-widest font-light">
              Website crafted by
            </p>
            <p className="text-[8px] text-gray-400 mt-1 font-medium tracking-wider">
              ELODI NIGERIA ENTERPRISES
            </p>
            <a href="tel:+2348136573235" className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors">
              08136573235
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* MODALS */}
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

      <BookEvent
        isOpen={bookEventOpen}
        onClose={() => setBookEventOpen(false)}
      />

      <style jsx>{`
        @keyframes thrust { 0%,100%{transform:translateX(-50%) scaleY(1);opacity:.2} 50%{transform:translateX(-50%) scaleY(1.1);opacity:.3} }
        .animate-thrust { animation: thrust 8s ease-in-out infinite; }
        @keyframes glowText { 0%,100%{text-shadow:0 0 5px rgba(255,255,255,.05)} 50%{text-shadow:0 0 15px rgba(255,255,255,.08)} }
        .animate-glowText { animation: glowText 5s ease-in-out infinite; }
        @keyframes softPulse { 0%,100%{text-shadow:0 0 8px rgba(220,38,38,.4)} 50%{text-shadow:0 0 14px rgba(220,38,38,.8)} }
        .animate-softPulse { animation: softPulse 4s infinite; }
        @keyframes float { 0%{transform:translateY(0)} 50%{transform:translateY(-10px)} 100%{transform:translateY(0)} }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </footer>
  );
};

export default Footer;
