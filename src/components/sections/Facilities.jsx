import React from "react";
import { motion } from "framer-motion";
import {
  Waves,
  Wine,
  ShieldCheck,
  Sparkles,
  Car,
  Clock,
  ArrowRight,
} from "lucide-react";

import poolVideo from "@/assets/videos/pool.webm";
import barImage from "@/assets/images/bar.webp";
import carRentalImage from "@/assets/images/car-rental.jpeg";
import securityImage from "@/assets/images/security-cctv.webp";

export default function Facilities() {
  const facilities = [
    {
      title: "Swimming Pool",
      media: poolVideo,
      type: "video",
      icon: <Waves className="text-blue-400" />,
      badge: "Signature",
      desc: "Our outdoor pool sits at the heart of the lounge. Order drinks poolside, or book a shaded cabana for the afternoon.",
      hours: "Open daily · 8am – Sunset",
      cta: "Reserve Poolside",
    },
    {
      title: "Premium Bar",
      media: barImage,
      type: "image",
      icon: <Wine className="text-amber-500" />,
      desc: "Expertly crafted cocktails and a curated selection of world-class spirits served in an intimate setting.",
      hours: "Open daily · 12pm – Late",
      cta: "View Menu",
    },
    {
      title: "Car Rental",
      media: carRentalImage,
      type: "flyer",
      icon: <Car className="text-rose-400" />,
      badge: "New",
      desc: "Premium vehicles available for airport transfers, weekend escapes, and city errands. Book directly with our concierge.",
      hours: "Available 24/7 · By reservation",
      cta: "Book Vehicle",
    },
    {
      title: "Elite Security",
      media: securityImage,
      type: "image",
      icon: <ShieldCheck className="text-emerald-400" />,
      desc: "Discreet, professional security ensures a safe environment for you and your vehicle around the clock.",
      hours: "Active 24 Hours",
      cta: "Safety Protocols",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <main className="relative min-h-screen bg-[#0f1113] font-montserrat text-gray-100 overflow-x-hidden pb-20">
      {/* Subtle decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-slate-800/30 to-transparent pointer-events-none" />

      {/* Main container: stripped of max-width to allow near full-bleed cards, only tiny padding */}
      <div className="w-full px-2 sm:px-6 pt-24 space-y-16 relative z-10">

        {/* Page Header - Centered and spaced out */}
        <motion.section
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8 pb-4 w-full max-w-5xl mx-auto"
        >
          <div className="flex justify-center items-center gap-3 mb-2">
            <Sparkles className="text-amber-400 size-3.5" />
            <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-gray-500 ml-2">
              The Ultimate Experience
            </span>
          </div>
          
          <h1 className="text-xl md:text-5xl lg:text-4xl font-light tracking-[0.15em] text-white uppercase">
            Facilities & Services
          </h1>
          
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 md:w-24 bg-white/20"></div>
            <p className="text-gray-400 text-[9px] md:text-sm max-w-xl mx-auto font-light leading-relaxed tracking-[0.25em] uppercase">
              Enjoy Premium Mbaise Hospitality
            </p>
            <div className="h-[1px] w-12 md:w-24 bg-white/20"></div>
          </div>
        </motion.section>

        {/* Quick Facts Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-x-4 text-[8px] uppercase font-medium text-gray-500 pb-6 w-full max-w-5xl mx-auto"
        >
          <span className="flex items-center gap-2"><Waves className="w-4 h-4 text-blue-400/60" /> Pool</span>
          <span className="flex items-center gap-2"><Wine className="w-4 h-4 text-amber-500/60" /> Bar</span>
          <span className="flex items-center gap-2"><Car className="w-4 h-4 text-rose-400/60" /> Car Rental</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400/60" /> 24/7 Security</span>
        </motion.div>

        {/* Strictly Stacked Near Full-Width Facility Cards */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-10 w-full"
        >
          {facilities.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group relative bg-[#1a1d20] border border-white/[0.04] rounded-lg sm:rounded-xl overflow-hidden shadow-2xl transition-all duration-300 w-full"
            >
              {/* Media Section */}
              <div className="relative w-full overflow-hidden h-72 sm:h-96 md:h-[450px]">
                {item.type === "video" && (
                  <video
                    src={item.media}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition duration-700"
                  />
                )}

                {item.type === "image" && (
                  <img
                    src={item.media}
                    className="w-full h-full object-cover object-center brightness-90 group-hover:brightness-100 transition duration-700"
                    alt={item.title}
                  />
                )}

                {item.type === "flyer" && (
                  <div className="relative w-full h-full flex items-center justify-center bg-[#0f1113]">
                    <img
                      src={item.media}
                      className="absolute inset-0 w-full h-full object-cover blur-lg opacity-25 scale-110"
                      aria-hidden="true"
                      alt=""
                    />
                    <img
                      src={item.media}
                      className="relative z-10 h-[90%] w-auto object-contain shadow-2xl rounded-sm"
                      alt={item.title}
                    />
                  </div>
                )}

                {item.badge && (
                  <div className="absolute top-6 left-6 z-30">
                    <span className="px-4 py-2 bg-[#1a1d20]/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                      {item.badge}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d20] via-transparent to-transparent opacity-80 z-20 pointer-events-none" />
              </div>

              {/* Content Section */}
              <div className="p-8 sm:p-12 md:p-16 space-y-6 relative z-30">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                    {item.icon}
                  </div>
                  <h4 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                    {item.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-500/90 uppercase tracking-widest">
                  <Clock className="w-3.5 h-3.5" />
                  {item.hours}
                </div>

                <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light max-w-5xl">
                  {item.desc}
                </p>

                <div className="pt-8 border-t border-white/[0.06] mt-4">
                  <button className="flex items-center gap-3 text-[11px] font-bold text-white/70 hover:text-white uppercase tracking-[0.2em] transition-colors group/btn">
                    {item.cta}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Footer Detail */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em] font-medium">
            Exclusively Friends' Lounge
          </p>
        </motion.div>
      </div>
    </main>
  );
}