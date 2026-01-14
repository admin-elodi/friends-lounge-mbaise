
BOARD STATE OF UDO DAY 2025
// src/components/sections/Banner.jsx
import React, { useEffect, useState } from "react";
import oasisFlyer from "@/assets/images/ugwu.jpg";
import upaLogo from "@/assets/images/upa.png"; // ← Added: Upa Logo
import { Maximize2, Minimize2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Banner() {
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [showFlyer, setShowFlyer] = useState(false);
  const [viewMode, setViewMode] = useState('fit'); // 'fit' or 'full'

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

  const toggleFlyer = () => setShowFlyer(!showFlyer);
  const toggleViewMode = () => setViewMode(viewMode === 'fit' ? 'full' : 'fit');

  return (
    <div className="relative group overflow-hidden w-screen -ml-4 md:w-[700px] md:ml-0 rounded-none border-t-2 border-b-2 border-white shadow-[0_0_5px_rgba(0,255,0,0.4)] cursor-pointer transition-all duration-500 select-none min-h-[80px] md:min-h-[120px] flex items-center">

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 opacity-60 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content — Full-span gradient */}
      <div className="relative w-full h-full bg-gradient-to-r from-[hsl(160,100%,10%)] via-black to-[hsl(160,100%,18%)] py-1 md:py-2 text-center transition-all duration-500 group-hover:scale-[1.02] flex flex-col justify-center items-center px-4 space-y-0.5 md:space-y-1">

        {/* Line 1: Rationale */}
        <p className="text-xs md:text-sm uppercase text-gray-300 font-light tracking-wide italic">
          Friends' Ad • Amplify Your Brand
        </p>

        {/* Line 2: Event name */}
        <h2 className="text-xl md:text-2xl font-bold tracking-widest w-full font-montserrat text-green-400 drop-shadow-lg animate-softPulse">
          UDO DAY 2025
        </h2>

        {/* Line 3: Auto-typing subtitle */}
        <p className="font-montserrat text-gray-200 text-xs md:text-sm typing-effect max-w-[90%]">
          A Celebration of Peace • Culture • Unity
        </p>

        {/* Line 4: Location */}
        <p className="text-[10px] md:text-base text-gray-300 font-montserrat tracking-wide">
          Mbaise, Imo State
        </p>

        {/* Line 5: Date + Days Left */}
        <p className="text-[10px] md:text-base text-gray-300 font-montserrat tracking-wide">
          26th December, 2025 • {daysLeft} Days Left
        </p>

        {/* Countdown Clock */}
        <p className="text-[10px] md:text-base text-gray-300 font-mono font-light tracking-wide">
          {hoursLeft.toString().padStart(2, '0')}h : {minutesLeft.toString().padStart(2, '0')}m : {secondsLeft.toString().padStart(2, '0')}s
        </p>

        {/* Line 6: Hover CTA */}
        <span className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 text-green-400 font-semibold text-[10px] cursor-pointer tracking-widest">
          CLICK TO VIEW DETAILS
        </span>

        {/* Line 7: Flyer Button */}
        <button
          onClick={toggleFlyer}
          className="opacity-70 hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300 text-green-400 font-medium text-xs tracking-wider border border-green-400/30 rounded-full px-3 md:px-4 py-1 md:py-2 bg-black/20 backdrop-blur-sm"
        >
          View Official Flyer
        </button>
      </div>

      {/* UPA LOGO — Left Side, Fully Visible, Perfect Balance */}
      <Link to = "/programs">
        <div className="absolute top-1/2 -translate-y-1/2 left-1 md:left-2 pointer-events-none z-10">
          <div className="relative">
            <div className="absolute inset-0 w-20 h-20 md:w-28 md:h-28 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
            <img
              src={upaLogo}
              alt="UPA Mbaise"
              className="relative w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-2xl border-4 border-green-300/50 rounded-full bg-black/30 p-2"
            />
            <div className="absolute inset-0 w-16 h-16 md:w-24 md:h-24 bg-green-400/30 rounded-full animate-ping"></div>
          </div>
        </div>
      
      </Link>


      {/* Flyer Modal Overlay */}
      {showFlyer && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={toggleFlyer}
        >
          <div className="relative w-full h-full p-4 flex items-center justify-center">
            <button
              onClick={toggleFlyer}
              className="absolute top-4 right-4 text-white hover:text-green-400 text-3xl transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              ×
            </button>
            <button
              onClick={toggleViewMode}
              className="absolute top-4 left-4 text-white hover:text-green-400 text-xl transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              {viewMode === 'fit' ? <Maximize2 /> : <Minimize2 />}
            </button>
            <img
              src={oasisFlyer}
              alt="UDO Day 2025 Official Flyer"
              className={`w-full h-full object-${viewMode === 'fit' ? 'contain' : 'cover'} rounded-lg shadow-2xl z-0`}
            />
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        .typing-effect {
          width: fit-content;
          margin: auto;
          overflow: hidden;
          white-space: nowrap;
          animation: typing 4s steps(40, end) infinite;
        }

        @keyframes typing {
          0% { width: 0 }
          50% { width: 100% }
          100% { width: 0 }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-softPulse {
          animation: softPulse 4s infinite;
        }

        @keyframes softPulse {
          0%, 100% { text-shadow: 0 0 8px rgba(0,255,0,0.4); }
          50% { text-shadow: 0 0 14px rgba(0,255,0,0.8); }
        }
      `}</style>
    </div>
  );
}

BOARD STATE FOR MTN NIGERIA
import React, { useState } from "react";
import mtnLogo from "@/assets/images/mtn-n.png";   // ✅ existing MTN image
import campaignVisual from "@/assets/images/ugwu.jpg"; // ✅ existing image
import { Maximize2, Minimize2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Banner() {
  const [showVisual, setShowVisual] = useState(false);
  const [viewMode, setViewMode] = useState("fit"); // 'fit' | 'full'

  const toggleVisual = () => setShowVisual((v) => !v);
  const toggleViewMode = () =>
    setViewMode((v) => (v === "fit" ? "full" : "fit"));

  return (
    <div className="relative group overflow-hidden w-screen -ml-4 md:w-[700px] md:ml-0 rounded-none border-t-2 border-b-2 border-yellow-400 shadow-[0_0_6px_rgba(255,204,0,0.5)] cursor-pointer transition-all duration-500 select-none min-h-[90px] md:min-h-[130px] flex items-center">

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-yellow-400/70 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative w-full h-full bg-gradient-to-r from-black via-yellow-900/20 to-black py-2 md:py-3 text-center transition-all duration-500 group-hover:scale-[1.02] flex flex-col justify-center items-center px-4 space-y-1">

        {/* Line 1 */}
        <p className="text-xs md:text-sm uppercase text-gray-300 tracking-widest font-light">
          Sponsored • MTN Nigeria
        </p>

        {/* Line 2 */}
        <h2 className="text-xl md:text-3xl font-black tracking-widest w-full text-yellow-400 drop-shadow-lg animate-softPulse">
          EVERYWHERE YOU GO
        </h2>

        {/* Line 3 */}
        <p className="text-xs md:text-sm text-gray-200 font-medium tracking-wide">
          Data • Voice • Digital Lifestyle
        </p>

        {/* Line 4 */}
        <p className="text-[10px] md:text-base text-gray-300 tracking-wide">
          Proudly connecting communities across Imo State
        </p>

        {/* Hover CTA */}
        <span className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 text-yellow-400 font-semibold text-[10px] tracking-widest">
          DISCOVER MTN DIGITAL EXPERIENCES
        </span>

        {/* Action Button */}
        <button
          onClick={toggleVisual}
          className="opacity-80 hover:opacity-100 transition-opacity duration-300 text-yellow-400 font-semibold text-xs tracking-wider border border-yellow-400/40 rounded-full px-4 py-1.5 bg-black/30 backdrop-blur-sm"
        >
          View MTN Campaign
        </button>
      </div>

      {/* MTN LOGO */}
      <Link to="/programs">
        <div className="absolute top-1/2 -translate-y-1/2 left-1 md:left-2 z-10">
          <div className="relative">
            <div className="absolute inset-0 w-20 h-20 md:w-28 md:h-28 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
            <img
              src={mtnLogo}
              alt="MTN Nigeria"
              className="relative w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-2xl border-4 border-yellow-300/60 rounded-full bg-black/30 p-2"
            />
            <div className="absolute inset-0 w-16 h-16 md:w-24 md:h-24 bg-yellow-400/30 rounded-full animate-ping"></div>
          </div>
        </div>
      </Link>

      {/* Campaign Visual Modal */}
      {showVisual && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={toggleVisual}
        >
          <div className="relative w-full h-full p-4 flex items-center justify-center">
            <button
              onClick={toggleVisual}
              className="absolute top-4 right-4 text-white hover:text-yellow-400 text-3xl transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              ×
            </button>

            <button
              onClick={toggleViewMode}
              className="absolute top-4 left-4 text-white hover:text-yellow-400 text-xl transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              {viewMode === "fit" ? <Maximize2 /> : <Minimize2 />}
            </button>

            <img
              src={campaignVisual}
              alt="MTN Nigeria Campaign"
              className={`w-full h-full ${
                viewMode === "fit" ? "object-contain" : "object-cover"
              } rounded-lg shadow-2xl`}
            />
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes softPulse {
          0%, 100% { text-shadow: 0 0 8px rgba(255,204,0,0.4); }
          50% { text-shadow: 0 0 16px rgba(255,204,0,0.9); }
        }
        .animate-softPulse {
          animation: softPulse 4s infinite;
        }
      `}</style>
    </div>
  );
}

BANNER STATE IN MTN NIGERIA MODE
import React, { useState, useMemo, useEffect } from "react";
import mtnLogo from "@/assets/images/mtn-n.png";
import campaignVisual from "@/assets/images/mtn.jpg";
import { Maximize2, Minimize2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Banner({
  sponsor = "MTN Nigeria",
  slogan = "EVERYWHERE YOU GO",
  subline = "Data • Voice • Digital Lifestyle",
  tagline = "Proudly connecting communities across Mbaise",
  cta = "DISCOVER MTN DIGITAL EXPERIENCES",
  logo = mtnLogo,
  image = campaignVisual,
  link = "/programs",
}) {
  const [showVisual, setShowVisual] = useState(false);
  const [viewMode, setViewMode] = useState("fit");

  const toggleVisual = () => setShowVisual(v => !v);
  const toggleViewMode = () =>
    setViewMode(v => (v === "fit" ? "full" : "fit"));

  /* Stable particles */
  const particles = useMemo(() => {
    return [...Array(14)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 6,
    }));
  }, []);

  /* ESC close */
  useEffect(() => {
    const handleKey = e => {
      if (e.key === "Escape") setShowVisual(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="w-full">

      {/* FRIENDS ADS LABEL (STATIC BRAND) */}
      <div className="w-screen -ml-4 md:ml-0 md:w-[700px] text-center py-1 bg-black border-t border-yellow-400/40">
        <p className="text-[10px] md:text-xs uppercase tracking-widest text-yellow-400 font-semibold">
          Friends’ Ads • Amplify Your Brand
        </p>
      </div>

      {/* MAIN BANNER */}
      <div className="relative group overflow-hidden w-screen -ml-4 md:w-[700px] md:ml-0 rounded-none border-b-2 border-yellow-400 shadow-[0_0_6px_rgba(255,204,0,0.5)] cursor-pointer transition-all duration-500 select-none min-h-[90px] md:min-h-[130px] flex items-center">

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-yellow-400/70 rounded-full animate-float"
              style={{
                top: `${p.top}%`,
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative w-full h-full bg-gradient-to-r from-black via-yellow-900/20 to-black py-2 md:py-3 text-center transition-all duration-500 group-hover:scale-[1.02] flex flex-col justify-center items-center px-4 space-y-1">

          <p className="text-xs md:text-sm uppercase text-gray-300 tracking-widest font-light">
            Sponsored • {sponsor}
          </p>

          <h2 className="text-xl md:text-3xl font-black tracking-widest w-full text-yellow-400 drop-shadow-lg animate-softPulse">
            {slogan}
          </h2>

          <p className="text-xs md:text-sm text-gray-200 font-medium tracking-wide">
            {subline}
          </p>

          <p className="text-[10px] md:text-base text-gray-300 tracking-wide">
            {tagline}
          </p>

          <span className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 text-yellow-400 font-semibold text-[10px] tracking-widest">
            {cta}
          </span>

          <button
            onClick={toggleVisual}
            aria-label="View campaign visual"
            className="opacity-80 hover:opacity-100 transition-opacity duration-300 text-yellow-400 font-semibold text-xs tracking-wider border border-yellow-400/40 rounded-full px-4 py-1.5 bg-black/30 backdrop-blur-sm"
          >
            View Campaign
          </button>
        </div>

        {/* Logo */}
        <Link to={link}>
          <div className="absolute top-1/2 -translate-y-1/2 left-1 md:left-2 z-10">
            <div className="relative">
              <div className="absolute inset-0 w-20 h-20 md:w-28 md:h-28 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>

              <img
                src={logo}
                alt={sponsor}
                className="relative w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-2xl border-4 border-yellow-300/60 rounded-full bg-black/30 p-2"
              />

              <div className="absolute inset-0 w-16 h-16 md:w-24 md:h-24 bg-yellow-400/30 rounded-full animate-ping"></div>
            </div>
          </div>
        </Link>

        {/* Modal */}
        {showVisual && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={toggleVisual}
          >
            <div
              className="relative w-full h-full p-4 flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={toggleVisual}
                aria-label="Close"
                className="absolute top-4 right-4 text-white hover:text-yellow-400 text-3xl transition-colors z-10 bg-black/50 rounded-full p-2"
              >
                ×
              </button>

              <button
                onClick={toggleViewMode}
                aria-label="Toggle view mode"
                className="absolute top-4 left-4 text-white hover:text-yellow-400 text-xl transition-colors z-10 bg-black/50 rounded-full p-2"
              >
                {viewMode === "fit" ? <Maximize2 /> : <Minimize2 />}
              </button>

              <img
                src={image}
                alt={`${sponsor} Campaign`}
                className={`w-full h-full ${
                  viewMode === "fit" ? "object-contain" : "object-cover"
                } rounded-lg shadow-2xl`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


BOARD STATE IN BLANK COME & ADVERTIZE MODE
import React, { useState, useMemo, useEffect } from "react";
// import placeholder from "@/assets/images/ugwu.jpg";
import logoPlaceholder from "@/assets/images/friends-logo.webp";
import { Maximize2, Minimize2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Banner({
  sponsor = "Featured Partner",
  headline = "Put Your Brand In Front Of Thousands",
  subline = "Community • Culture • Real Engagement",
  note = "Friends Lounge Media Network",
  cta = "Become a Partner",
  logo = logoPlaceholder,
  image = '',
  link = "/advertise",
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("fit");

  const particles = useMemo(() =>
    [...Array(10)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    })), []);

  useEffect(() => {
    const esc = e => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <div className="border-b border-white">

      {/* PLATFORM ID */}
      <div className="w-screen -ml-4 md:ml-0 md:w-[700px] py-1 text-center bg-black border-b border-white">
        <p className="text-[10px] md:text-xs tracking-widest uppercase text-gray-300">
          Friends’ Ads • Digital Visibility Platform
        </p>
      </div>

      {/* BANNER */}
      <div className="relative group overflow-hidden w-screen -ml-4 md:w-[700px] md:ml-0 min-h-[95px] md:min-h-[140px]
        border-b border-white/10 bg-gradient-to-r from-black via-neutral-900 to-black flex items-center">

        {/* Particles */}
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{ top: `${p.top}%`, left: `${p.left}%`, animationDelay: `${p.delay}s` }}
          />
        ))}

        {/* Content */}
        <div className="relative w-full text-center px-4 space-y-1">

          <p className="text-xs uppercase tracking-widest text-gray-400">
            {sponsor}
          </p>

          <h2 className="text-xl md:text-3xl font-black text-white tracking-wide">
            {headline}
          </h2>

          <p className="text-xs md:text-sm text-gray-300">
            {subline}
          </p>

          <p className="text-[10px] md:text-xs text-gray-500">
            {note}
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-1 text-xs border border-white/30 px-4 py-1 rounded-full
            hover:bg-white hover:text-black transition"
          >
            Preview Placement
          </button>
        </div>

        {/* Logo */}
        <Link to={link}>
          <div className="absolute left-2 top-1/2 -translate-y-1/2">
            <img
              src={logo}
              className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-black/50 p-2 border border-white/20"
            />
          </div>
        </Link>

        {/* MODAL */}
        {open && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center"
            onClick={() => setOpen(false)}
          >
            <div
              className="relative w-full h-full p-6 flex justify-center items-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white text-3xl"
                onClick={() => setOpen(false)}
              >
                ×
              </button>

              <button
                className="absolute top-4 left-4 text-white"
                onClick={() => setMode(m => m === "fit" ? "full" : "fit")}
              >
                {mode === "fit" ? <Maximize2 /> : <Minimize2 />}
              </button>

              <img
                src={image}
                className={`w-full h-full ${mode === "fit" ? "object-contain" : "object-cover"}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


FOOTER STATE MTN NIGERIA
// src/components/common/Footer.jsx
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
import mtnLogo from "@/assets/images/mtn-n.png"; // ✅ MTN LOGO

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

          {/* SPECIAL SERVICES + MTN AD */}
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

              {/* 🔥 MTN AD – ONLY CHANGE */}
              <Link to="/programs" className="block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative mt-6 p-6 bg-gradient-to-br from-yellow-400/30 via-black/60 to-yellow-500/40 backdrop-blur-md border-t-2 border-b-2 border-yellow-400 shadow-lg overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>

                  <div className="relative z-10 text-center space-y-2">
                    <p className="text-xs uppercase tracking-widest text-yellow-300 font-light">
                      Sponsored Partner
                    </p>

                    <img
                      src={mtnLogo}
                      alt="MTN Nigeria"
                      className="w-14 mx-auto"
                    />

                    <h3 className="text-2xl font-bold text-yellow-400 tracking-widest animate-softPulse">
                      MTN NIGERIA
                    </h3>

                    <p className="text-xs text-gray-200 italic">
                      Everywhere You Go
                    </p>

                    <p className="text-xs text-gray-300">
                      Powering digital connection across communities
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-3 px-5 py-2 rounded-[10px] bg-yellow-300 text-black text-sm font-bold tracking-wider hover:bg-yellow-400 transition-all shadow-lg"
                    >
                      Explore MTN Offers
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

      <BookEvent isOpen={bookEventOpen} onClose={() => setBookEventOpen(false)} />

      <style jsx>{`
        @keyframes thrust { 0%,100%{transform:translateX(-50%) scaleY(1);opacity:.2} 50%{transform:translateX(-50%) scaleY(1.1);opacity:.3} }
        .animate-thrust { animation: thrust 8s ease-in-out infinite; }
        @keyframes glowText { 0%,100%{text-shadow:0 0 5px rgba(255,255,255,.05)} 50%{text-shadow:0 0 15px rgba(255,255,255,.08)} }
        .animate-glowText { animation: glowText 5s ease-in-out infinite; }
        @keyframes softPulse { 0%,100%{text-shadow:0 0 8px rgba(255,204,0,.4)} 50%{text-shadow:0 0 14px rgba(255,204,0,.8)} }
        .animate-softPulse { animation: softPulse 4s infinite; }
        @keyframes float { 0%{transform:translateY(0)} 50%{transform:translateY(-10px)} 100%{transform:translateY(0)} }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </footer>
  );
};

export default Footer;
aer

FOOTER STATE UDO DAY 2025





