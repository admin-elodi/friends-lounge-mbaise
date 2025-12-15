// src/features/Programs.jsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Images
import uduPot from "@/assets/images/local-fridge.jpg";
import ojiIgbo from "@/assets/images/palmwine.jpg";
import mkpoOsa from "@/assets/images/rafia.jpg";
import futureVision from "@/assets/images/sunset.jpg";

// Background video
import abigboDance from "@/assets/videos/abigbo-dance.mp4";

const Programs = () => {
  const portals = [
    {
      img: uduPot,
      title: "Live from Nkwo Udo",
      subtitle: "First ever global Udo Day Livestream",
      desc: "Join Udo sons & daughters worldwide • 26 Dec 2025",
      link: "https://youtube.com/live/udoday2025",
      gradient: "",
    },
    {
      img: ojiIgbo,
      title: "Chat with Chairman",
      subtitle: "Speak directly to the Udo Day Committee",
      desc: "Live WhatsApp • Instant voice notes • Real-time updates",
      link: "https://wa.me/2348136573235",
      gradient: "from-black/10 to-black/30",
    },
    {
      img: mkpoOsa,
      title: "Support the Vision",
      subtitle: "Every kobo builds the biggest Udo Day yet",
      desc: "Sponsor • Donate • Become a pillar of 2025",
      link: "/donate",
      gradient: "from-green-600/50 to-emerald-800/60",
    },
    {
      img: futureVision,
      title: "Udo Day 2030",
      subtitle: "Looking ahead to 2030 like the rest of the world",
      desc: "",
      link: "#",
      gradient: "from-purple-700/60 via-pink-600/50 to-cyan-600/50",
    },
  ];

  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="relative min-h-screen bg-black/80 overflow-hidden">

      {/* Background Video */}
      <video
        ref={videoRef}
        src={abigboDance}
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover brightness-110 z-0"
      />

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-30 w-10 h-10 flex items-center justify-center bg-black/40 text-white rounded-full backdrop-blur-sm hover:bg-black/60 transition"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-20"
      >
        <h1 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 drop-shadow-2xl tracking-widest">
          UDO DAY 2025
        </h1>
        <p className="mt-1 text-lg md:text-xl text-black font-bold tracking-wider">
          26 December
        </p>
      </motion.div>

      {/* Portals Grid */}
      <div className="pt-40 pb-20 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          {portals.map((portal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.25, duration: 0.9 }}
              whileHover={{ scale: 1.04, y: -12 }}
              className="group relative"
            >
              <Link
                to={portal.link}
                target={portal.link.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                <div className="relative overflow-hidden rounded-xl shadow-2xl border border-white/10">

                  {/* Image */}
                  <img
                    src={portal.img}
                    alt={portal.title}
                    className="w-full h-96 md:h-[520px] object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Dark scrim for legibility */}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition" />

                  {/* Color gradient accent */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${portal.gradient}`}
                  />

                  {/* Text */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <h2 className="text-xl md:text-2xl font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
                      {portal.title}
                    </h2>

                    <p className="mt-3 text-lg md:text-xl font-bold text-amber-200 drop-shadow">
                      {portal.subtitle}
                    </p>

                    <p className="mt-4 text-sm md:text-base text-white/90 max-w-md drop-shadow">
                      {portal.desc}
                    </p>

                    <div className="mt-6 inline-block px-8 py-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white font-bold tracking-wider hover:bg-white/30 transition">
                      ENTER
                    </div>
                  </div>

                  {/* Hover ring */}
                  <div className="absolute inset-0 rounded-3xl ring-4 ring-transparent group-hover:ring-amber-400/40 transition-all duration-700 pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}

        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/60 rounded-full animate-float"
            style={{
              top: `${10 + i * 7}%`,
              left: `${5 + i * 8}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Programs;
