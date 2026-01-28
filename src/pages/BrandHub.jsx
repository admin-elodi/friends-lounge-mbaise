// src/pages/BrandHub.jsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";

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
      desc: "Brands can livestream ceremonies, festivals & conferences through Friends Lounge.",
      cta: "STREAM EVENT",
      link: "/advertise",
      accent: "from-amber-500/20",
    },
    {
      img: whatsappImg,
      title: "Community Contact Hub",
      subtitle: "Direct WhatsApp access",
      desc: "Connect audiences directly to event organisers or committee leadership.",
      cta: "OPEN CHAT",
      link: "/advertise",
      accent: "from-green-500/20",
    },
    {
      img: supportImg,
      title: "Support & Sponsorship",
      subtitle: "Fund the vision",
      desc: "Donations, sponsorships & material support for community events.",
      cta: "SUPPORT EVENT",
      link: "/advertise",
      accent: "from-red-500/20",
    },
    {
      img: futureImg,
      title: "Future Vision Portal",
      subtitle: "Thinking beyond today",
      desc: "Reverse-engineer future editions and long-term event impact.",
      cta: "EXPLORE FUTURE",
      link: "/advertise",
      accent: "from-blue-500/20",
    },
  ];

  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden selection:bg-amber-500 selection:text-black">
      {/* Background Video with enhanced filters */}
      <video
        ref={videoRef}
        src={bgVideo}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-[0.6] contrast-125 z-0"
      />

      {/* Layered Overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/60 z-[1]" />

      {/* Mute Button - Redesigned */}
      <button
        onClick={toggleMute}
        className="fixed top-8 right-8 z-50 p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-amber-500 hover:text-black transition-all duration-500 shadow-2xl group"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1 bg-black text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
          {isMuted ? "Sound On" : "Sound Off"}
        </span>
      </button>

      {/* HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "circOut" }}
        className="relative z-20 pt-32 pb-16 text-center px-6"
      >
        <motion.span 
          initial={{ letterSpacing: "0.2em", opacity: 0 }}
          animate={{ letterSpacing: "0.5em", opacity: 1 }}
          className="text-amber-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mb-4 block"
        >
          Friends' Ads - Point 3
        </motion.span>
        <h1 className="text-3xl md:text-4xl text-white font-semibold uppercase tracking-tighter italic drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
          Brand Hub<span className="text-amber-500">.</span>
        </h1>
        <div className="h-1 w-40 bg-amber-500 mx-auto mt-4 mb-6" />
        <p className="text-lg md:text-[15px] text-gray-300 max-w-3xl mx-auto font-light italic leading-relaxed">
          "Where your brand lives inside Mbaise"
        </p>
      </motion.div>

      {/* CARDS GRID - Adjusted padding for full-width mobile view */}
      <div className="relative z-10 px-0 md:px-6 lg:px-12 pb-32 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {portals.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="group relative"
          >
            <Link to={p.link} className="block relative h-full">
              {/* The "Pimped" Border - Toned down roundedness (rounded-xl) */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-amber-600 via-yellow-200 to-amber-600 rounded-xl opacity-30 group-hover:opacity-100 blur-[2px] group-hover:blur-md transition-all duration-700 animate-pulse" />
              
              {/* Main Card - Toned down roundedness (rounded-xl) and Full width on mobile (no rounded on phone if preferred, but xl is sleek) */}
              <div className="relative h-full rounded-none md:rounded-xl bg-neutral-900/80 backdrop-blur-2xl overflow-hidden border border-white/10">
                {/* Visual Accent Glow */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${p.accent} to-transparent opacity-50`} />

                {/* Image Section */}
                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover brightness-90 group-hover:brightness-110 group-hover:saturate-125 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                  
                  {/* Floating Subtitle on Image */}
                  <div className="absolute bottom-4 left-6">
                    <span className="px-3 py-1 bg-amber-500 text-black text-[10px] font-bold uppercase tracking-tighter">
                      {p.subtitle}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 space-y-4">
                  <h2 className="text-xl md:text-2xl font-semibold text-white group-hover:text-amber-400 transition-colors">
                    {p.title}
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium">
                    {p.desc}
                  </p>

                  <div className="pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-500 font-bold text-xs tracking-widest group-hover:gap-4 transition-all uppercase">
                      {p.cta} <ArrowRight size={16} />
                    </div>
                    <div className="h-px flex-1 bg-white/10 ml-6 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
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