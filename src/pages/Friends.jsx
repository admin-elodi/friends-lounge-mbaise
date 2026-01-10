// src/pages/Friends.jsx
import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Zap, Globe, Building2, Volume2, VolumeX } from "lucide-react";

// Local video
import islandVideo from "@/assets/videos/island.mp4";

export default function Friends() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.85]);

  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Typewriter variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.4 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 140 },
    },
    hidden: { opacity: 0, y: 20 },
  };

  const recognitionText =
    "Induction of Chief Sir Barrister Santome Ibeneche (Zereuwa) into Island All Stars Sports Club";

  return (
    <div className="bg-black text-white font-montserrat">
      {/* Top Branded Banner */}
      <div className="relative z-30 bg-gradient-to-r from-red-950/60 to-black py-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-lg"
          >
            Friendly Recognitions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-4 text-xl md:text-2xl text-gray-300 font-light"
          >
            Celebrating leaders, milestones, and community pillars
          </motion.p>
        </div>
      </div>

      {/* Hero Video Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={islandVideo}
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
        <div className="absolute inset-0 bg-black/65" />

        {/* Mute Toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-10 right-6 md:right-10 z-20 flex items-center gap-3 
                     bg-black/40 backdrop-blur-md px-5 py-3 rounded-full text-white 
                     hover:bg-black/60 transition-all duration-300 border border-white/20"
        >
          {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
          <span className="text-sm font-medium hidden sm:inline">
            {isMuted ? "Unmute" : "Mute"}
          </span>
        </button>

        {/* Recognition Text */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-6xl text-center px-6"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="mt-20 md:mt-0 p-8 md:p-12 bg-black/40 backdrop-blur-xl rounded-3xl 
                       border border-white/10 shadow-2xl"
          >
            {recognitionText.split(" ").map((word, index) => (
              <motion.span
                key={index}
                variants={child}
                className="text-2xl md:text-4xl font-semibold text-white drop-shadow-xl inline-block mx-1"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <ChevronDown
            className="mx-auto mt-16 md:mt-24 text-white/70 animate-bounce"
            size={48}
          />
        </motion.div>
      </section>

      {/* The Spark Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-black to-neutral-950">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            The Friends Lounge Spark
          </motion.h2>

          <div className="space-y-10 text-lg md:text-xl text-gray-300 leading-relaxed">
            <p>
              The story did not begin with a lounge. It began with a road.
              What was once quiet, undeveloped land was opened through the
              construction of{" "}
              <span className="text-red-400 font-medium">Donamenche Crescent</span>,
              creating access into new territory in Udo.
            </p>

            <p>
              This effort was single‑handedly initiated by{" "}
              <span className="text-white font-medium">
                Chief Sir Barrister Santome Ibeneche (Zereuwa)
              </span>
              . With the road came possibility. Families built homes. Life followed.
              A new corridor of settlement took shape.
            </p>

            <p>
              Friends’ Lounge emerged later as a signature civic landmark at the
              end of this growing road — a place of gathering, culture, and shared
              presence within an already forming community.
            </p>

            {/* Silicon Village Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.9 }}
              className="mt-12 p-8 md:p-12 bg-white/5 backdrop-blur-xl rounded-3xl 
                         border border-white/10 shadow-2xl"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Silicon Village, Udo
              </h3>
              <p className="text-gray-300 leading-relaxed">
                A respectful continuation of the tools Silicon Valley gave the world —
                rebuilt with local purpose, clean energy, and long memory.
              </p>

              <p className="mt-6 text-gray-300 leading-relaxed">
                One of its earliest expressions is{" "}
                <span className="text-red-400 font-medium">JungleX</span> — an
                Africanfuturist social platform conceived in Udo. JungleX is not the
                destination, but a signal: global‑grade technology can be imagined,
                built, and stewarded from this soil.
              </p>

              <div className="mt-10">
                <button
                  onClick={() => window.open("https://jungle-x-social-media.netlify.app/", "_blank")}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-red-600/80 hover:bg-red-600 
                             rounded-full text-white font-medium transition-all shadow-lg shadow-red-900/30"
                >
                  Explore JungleX
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Hard / Play Hard */}
      <section className="py-32 px-6 bg-gradient-to-b from-neutral-950 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 text-white"
          >
            Work Hard. Play Hard
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Swimming Pool",
              "VIP Lounge",
              "Live Music",
              "Premium Bar",
              "24/7 Security",
              "Mbaise Tours",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 
                           hover:border-red-500/40 transition-all duration-300 shadow-lg"
              >
                <div className="text-sm uppercase tracking-widest text-gray-400 mb-4">
                  Feature {i + 1}
                </div>
                <h4 className="text-2xl font-semibold text-white">{item}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-32 px-6 bg-black border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-16"
          >
            What is taking shape in Udo is incremental, communal, and generational —
            rooted in lived reality, open to the world, and respectful of the foundations
            laid by those before us.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, text: "Build With Us" },
              { icon: Globe, text: "Corporate Sponsor" },
              { icon: Zap, text: "Live JungleX", action: () => window.open("https://jungle-x-social-media.netlify.app/", "_blank") },
              { icon: ArrowRight, text: "WhatsApp Us" },
            ].map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={item.action}
                className="flex flex-col items-center gap-4 p-8 bg-white/5 backdrop-blur-xl 
                           rounded-2xl border border-white/10 hover:border-red-500/40 
                           transition-all duration-300 shadow-lg"
              >
                <item.icon size={32} className="text-red-400" />
                <span className="text-lg font-medium text-white">{item.text}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}