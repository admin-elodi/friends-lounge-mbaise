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
      span: "md:col-span-2",
    },
    {
      title: "Premium Bar",
      media: barImage,
      type: "image",
      icon: <Wine className="text-amber-500" />,
      desc: "Expertly crafted cocktails and a curated selection of world-class spirits served in an intimate setting.",
      hours: "Open daily · 12pm – Late",
      cta: "View Menu",
      span: "md:col-span-1",
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
      span: "md:col-span-1",
      // Portrait aspect ratio creates the tall row height
      mediaHeight: "h-[450px] md:h-auto md:aspect-[3/4]",
    },
    {
      title: "24/7 Elite Security",
      media: securityImage,
      type: "image",
      icon: <ShieldCheck className="text-emerald-400" />,
      desc: "Discreet, professional security ensures a safe environment for you and your vehicle around the clock.",
      hours: "Active 24 Hours",
      cta: "Safety Protocols",
      span: "md:col-span-2",
      // Add a flag to let this specific card fill its grid area on desktop
      stretchMedia: true,
      mediaHeight: "h-72 md:h-full md:flex-1",
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
    <main className="relative min-h-screen bg-[#1a1c1e] font-montserrat text-gray-100 overflow-x-hidden pb-20">
      {/* Mid-tone decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-slate-800/50 to-transparent pointer-events-none" />

      {/* Grid container: full width mobile, centered desktop */}
      <div className="max-w-7xl mx-auto px-0 sm:px-8 pt-20 space-y-12 relative z-10">

        {/* Page Header */}
        <motion.section
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 px-6"
        >
          <div className="flex justify-center items-center gap-2 mb-2">
            <Sparkles className="text-amber-400 size-4" />
            <span className="uppercase tracking-[0.25em] text-xs font-bold text-gray-400">
              The Ultimate Experience
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Facilities & Services
          </h1>
          <p className="text-gray-400 text-[12px] md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Enjoy Premium Mbaise Hospitality
          </p>
        </motion.section>

        {/* Quick Facts Strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-xs font-medium text-gray-400"
        >
          <span className="flex items-center gap-2"><Waves className="w-4 h-4 text-blue-400/70" /> Pool</span>
          <span className="flex items-center gap-2"><Wine className="w-4 h-4 text-amber-500/70" /> Bar</span>
          <span className="flex items-center gap-2"><Car className="w-4 h-4 text-rose-400/70" /> Car Rental</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400/70" /> 24/7 Security</span>
        </motion.div>

        {/* Balanced Bento Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 pt-4"
        >
          {facilities.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className={`${item.span} group relative bg-[#25282c] border-y md:border border-white/5 md:rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ${
                item.stretchMedia ? "md:flex md:flex-col" : "flex flex-col"
              }`}
            >
              {/* Media Section */}
              <div className={`relative w-full overflow-hidden ${item.mediaHeight || "h-72 md:h-80"}`}>
                {item.type === "video" && (
                  <video
                    src={item.media}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition duration-500"
                  />
                )}

                {item.type === "image" && (
                  <img
                    src={item.media}
                    className="w-full h-full object-cover object-center brightness-90 group-hover:brightness-100 transition duration-500"
                    alt={item.title}
                  />
                )}

                {/* Special render for the Portrait Flyer */}
                {item.type === "flyer" && (
                  <div className="relative w-full h-full flex items-center justify-center bg-[#1a1c1e]">
                    <img
                      src={item.media}
                      className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-110"
                      aria-hidden="true"
                      alt=""
                    />
                    <img
                      src={item.media}
                      className="relative z-10 w-[95%] h-auto max-h-[95%] object-contain brightness-100 transition duration-500 shadow-2xl rounded-sm"
                      alt={item.title}
                    />
                  </div>
                )}

                {/* NEW: Optional Badge */}
                {item.badge && (
                  <div className="absolute top-4 left-4 z-30">
                    <span className="px-3 py-1 bg-[#25282c]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                      {item.badge}
                    </span>
                  </div>
                )}

                {/* Balanced overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#25282c] via-transparent to-transparent opacity-80 z-20 pointer-events-none" />
              </div>

              {/* Content Section */}
              <div className={`p-8 space-y-4 relative z-30 ${item.stretchMedia ? "md:mt-auto bg-[#25282c]" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 rounded-md border border-white/10">
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-semibold text-white tracking-tight">
                    {item.title}
                  </h4>
                </div>

                {/* NEW: Hours */}
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-500/90">
                  <Clock className="w-3.5 h-3.5" />
                  {item.hours}
                </div>

                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>

                {/* NEW: CTA */}
                <div className="pt-4 border-t border-white/5">
                  <button className="flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white uppercase tracking-wider transition-colors group/btn mt-2">
                    {item.cta}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                {/* Kept your original red line design as well */}
                <div className="h-0.5 w-10 bg-red-500/40 rounded-full mt-4" />
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Footer Detail */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center py-10"
        >
          <p className="text-gray-500 text-sm uppercase tracking-widest font-medium">
            Exclusively Friends' Lounge
          </p>
        </motion.div>
      </div>
    </main>
  );
}