// src/pages/BrandHub.jsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import livestreamImg from "@/assets/images/local-fridge.jpg";
import whatsappImg from "@/assets/images/palmwine.jpg";
import supportImg from "@/assets/images/rafia.jpg";
import futureImg from "@/assets/images/sunset.jpg";

import bgVideo from "@/assets/videos/abigbo-dance.mp4";

const BrandHub = () => {
  const portals = [
    {
      img: livestreamImg,
      title: "Event Livestream Portal",
      subtitle: "Broadcast your campaign live",
      desc:
        "Brands can livestream ceremonies, festivals & conferences through Friends Lounge.",
      cta: "STREAM EVENT",
      link: "/advertise",
    },
    {
      img: whatsappImg,
      title: "Community Contact Hub",
      subtitle: "Direct WhatsApp access",
      desc:
        "Connect audiences directly to event organisers or committee leadership.",
      cta: "OPEN CHAT",
      link: "/advertise",
    },
    {
      img: supportImg,
      title: "Support & Sponsorship",
      subtitle: "Fund the vision",
      desc:
        "Donations, sponsorships & material support for community events.",
      cta: "SUPPORT EVENT",
      link: "/advertise",
    },
    {
      img: futureImg,
      title: "Future Vision Portal",
      subtitle: "Thinking beyond today",
      desc:
        "Reverse-engineer future editions and long-term event impact.",
      cta: "EXPLORE FUTURE",
      link: "/advertise",
    },
  ];

  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">

      {/* Background Video */}
      <video
        ref={videoRef}
        src={bgVideo}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-75 contrast-125 grayscale-[0.4] z-0"
      />

      {/* Enhanced vignette + dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-[1]" />

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="
          absolute top-6 right-6 z-30 
          w-11 h-11 rounded-full bg-black/70 backdrop-blur-md
          border border-white/20 text-white flex items-center justify-center
          hover:scale-110 hover:bg-red-900/40 transition-all duration-300
          shadow-lg shadow-black/50 group
        "
        title={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? "🔇" : "🔊"}
        <span className="absolute -bottom-8 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
          {isMuted ? "Sound On" : "Sound Off"}
        </span>
      </button>

      {/* HEADER – minimalist, balanced intro */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 pt-24 pb-20 text-center space-y-6 px-6"
      >
        <h1 className="text-xl md:text-4xl font-semibold tracking-tight text-white drop-shadow-xl">
          Brand Experience Hub
        </h1>

        <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
          Point 3 of Friends’ Ads 3-Point Ad System
        </p>

        <p className="text-sm md:text-lg text-yellow-100 font-medium tracking-wide uppercase">
          Where your brand lives inside Mbaise
        </p>
      </motion.div>

      {/* CARDS GRID – original layout, stretched wide */}
      <div
        className="
          relative z-10 
          px-4 md:px-2 lg:px-4 pb-24 
          max-w-full md:max-w-[98vw] mx-auto 
          grid grid-cols-1 md:grid-cols-2 
          gap-6 md:gap-8
        "
        style={{ perspective: "1400px" }}
      >
        {portals.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: i * 0.15, duration: 0.9, ease: "easeOut" }}
            whileHover={{
              scale: 1.06,
              rotateX: 0,
              rotateY: 3,
              transition: { duration: 0.4 },
            }}
            className="group relative transform-gpu"
          >
            <Link to={p.link} className="block h-full">
              <div
                className="
                  relative h-full rounded-2xl overflow-hidden
                  bg-gradient-to-br from-black/40 to-black/60  // ← Lighter tones: reduced opacity for brighter feel
                  backdrop-blur-xl border border-white/20  // ← Lighter border
                  shadow-[0_8px_32px_rgba(0,0,0,0.3)]  // ← Softer shadow
                  group-hover:shadow-[0_16px_48px_rgba(255,215,0,0.15)]  // ← Lighter hover shadow
                  transition-all duration-500
                "
              >
                {/* Animated glowing border on hover – lighter version */}
                <div
                  className="
                    absolute inset-0 rounded-2xl pointer-events-none opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500
                    bg-gradient-to-r from-transparent via-amber-300/20 to-transparent  // ← Lighter glow
                    shadow-[inset_0_0_30px_rgba(255,215,0,0.3)]  // ← Softer inset shadow
                  "
                />

                {/* Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="
                      w-full h-full object-cover 
                      grayscale-[0.3] group-hover:grayscale-0  // ← Lighter grayscale for brighter base
                      transition-all duration-700 ease-out
                    "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />  // ← Lighter gradient
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-3">
                  <h2 className="
                    text-xl md:text-2xl font-extrabold 
                    text-white tracking-tight 
                    whitespace-nowrap overflow-hidden text-ellipsis
                  ">
                    {p.title}
                  </h2>

                  <p className="
                    text-amber-200 font-semibold text-sm md:text-base  // ← Lighter amber for subtitle
                    whitespace-nowrap overflow-hidden text-ellipsis
                  ">
                    {p.subtitle}
                  </p>

                  <p className="
                    text-gray-200 text-sm leading-relaxed  // ← Lighter gray for desc
                    line-clamp-3 md:line-clamp-none
                  ">
                    {p.desc}
                  </p>

                  {/* CTA Button – minimalist redesign */}
                  <div className="
                    mt-6 inline-flex items-center gap-2 
                    px-6 py-3 bg-transparent border border-amber-300/50 text-amber-100 font-medium rounded-full 
                    hover:border-amber-300 hover:text-amber-300 hover:bg-amber-900/10
                    transition-all duration-300
                  ">
                    {p.cta}
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BrandHub;