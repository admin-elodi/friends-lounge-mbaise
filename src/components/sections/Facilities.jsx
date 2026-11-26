import React from "react";
import { motion } from "framer-motion";
import {
  Waves,
  Wine,
  ShieldCheck,
  Car,
  CalendarCheck,
  BookOpen,
  Key,
  ShieldAlert,
} from "lucide-react";

import poolVideo from "@/assets/videos/pool.webm";
import barImage from "@/assets/images/bar.webp";
import carRentalImage from "@/assets/images/car-rental.jpeg";
import securityImage from "@/assets/images/security-cctv.webp";

const facilities = [
  {
    id: "pool",
    title: "The Poolside",
    media: poolVideo,
    isVideo: true,
    icon: <Waves size={20} />,
    tag: "Signature",
    publicDesc: "Relax your nerves & order drinks poolside.",
    publicAction: "Reserve Cabana",
    publicIcon: <CalendarCheck size={16} />,
  },
  {
    id: "bar",
    title: "Premium Bar",
    media: barImage,
    isVideo: false,
    icon: <Wine size={20} />,
    publicDesc: "Enjoy curated world-class spirits",
    publicAction: "Explore Drinks",
    publicIcon: <BookOpen size={16} />,
  },
  {
    id: "car",
    title: "Car Rental",
    media: carRentalImage,
    isVideo: false,
    icon: <Car size={20} />,
    tag: "New",
    publicDesc: "Rent premium vehicles anytime",
    publicAction: "Book a Ride",
    publicIcon: <Key size={16} />,
  },
  {
    id: "security",
    title: "Elite Security",
    media: securityImage,
    isVideo: false,
    icon: <ShieldCheck size={20} />,
    publicDesc: "Discreet & professional 24/7 protection",
    publicAction: "Safety Protocols",
    publicIcon: <ShieldAlert size={16} />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Facilities() {
  return (
    <main className="relative min-h-screen bg-[#1a1a1a] font-sans text-zinc-300 overflow-x-hidden pb-24 selection:bg-amber-500/30">
      
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-16">
        
        {/* EDITORIAL HEADER */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center justify-center text-center mb-16 md:mb-24"
        >
          <h1 className="text-2xl md:text-5xl lg:text-4xl font-serif text-white leading-tight mb-4">
            Friends Lounge Facilities
          </h1>
          <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-2xl">
            Discover our Facilities and Operations
          </p>
        </motion.section>

        {/* FULL-WIDTH EDITORIAL ROWS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col space-y-6 md:space-y-8"
        >
          {facilities.map((item) => (
            <motion.article
              key={item.id}
              variants={itemVariants}
              className="group relative w-full bg-[#2a2a2a] border border-white/10 rounded-2xl overflow-hidden flex flex-col lg:flex-row transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40"
            >
              {/* 1. MEDIA SECTION */}
              <div className="relative w-full lg:w-[45%] h-[250px] lg:h-auto overflow-hidden shrink-0">
                {item.isVideo ? (
                  <video
                    src={item.media}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                ) : (
                  <img
                    src={item.media}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                )}
                
                {/* Gradient Blend */}
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#2a2a2a] via-[#2a2a2a]/40 to-transparent z-10" />
                
                {item.tag && (
                  <div className="absolute top-5 left-5 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-md">
                      {item.tag}
                    </span>
                  </div>
                )}
              </div>

              {/* 2. CONTENT SECTION */}
              <div className="relative z-20 flex-1 p-6 md:p-10 flex flex-col justify-center text-left">
                
                {/* Header Area */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-amber-500">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
                
                {/* Public-facing Description */}
                <p className="text-sm md:text-base text-zinc-200 leading-relaxed max-w-2xl mt-2 text-left">
                  {item.publicDesc}
                </p>

                {/* Bottom Actions Row */}
                <div className="mt-8 flex justify-start">
                  <button className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-lg hover:shadow-amber-500/20 w-full sm:w-auto">
                    {item.publicIcon}
                    {item.publicAction}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.section>

        {/* BOTTOM NOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-zinc-400 text-xs tracking-widest uppercase">
            Exclusively Friends' Lounge
          </p>
          <p className="text-zinc-500 text-xs font-light">
            Mbaise, Imo State.
          </p>
        </motion.div>

      </div>
    </main>
  );
}