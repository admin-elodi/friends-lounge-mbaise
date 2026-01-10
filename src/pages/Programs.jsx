import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import dataImg from "@/assets/images/local-fridge.jpg";
import whatsappImg from "@/assets/images/palmwine.jpg";
import momoImg from "@/assets/images/rafia.jpg";
import futureImg from "@/assets/images/sunset.jpg";

import mtnVideo from "@/assets/videos/abigbo-dance.mp4";

const Programs = () => {

  const portals = [
    {
      img: dataImg,
      title: "MTN Livestream Zone",
      subtitle: "Watch events powered by MTN data",
      desc: "Zero buffering • HD streaming • Everywhere you go",
      link: "https://youtube.com",
      gradient: "from-yellow-400/40 to-black/60",
    },
    {
      img: whatsappImg,
      title: "MTN WhatsApp Connect",
      subtitle: "Instant community chat",
      desc: "Fast network • Voice notes • Real-time updates",
      link: "https://wa.me/2348136573235",
      gradient: "from-green-600/40 to-black/60",
    },
    {
      img: momoImg,
      title: "MTN MoMo Payments",
      subtitle: "Support community digitally",
      desc: "Donate • Pay • Sponsor instantly",
      link: "/donate",
      gradient: "from-yellow-500/40 to-black/60",
    },
    {
      img: futureImg,
      title: "MTN 5G Future",
      subtitle: "Smart communities by 2030",
      desc: "Innovation • Connectivity • Growth",
      link: "#",
      gradient: "from-purple-700/40 to-black/60",
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
        src={mtnVideo}
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover brightness-110 z-0"
      />

      {/* Mute */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-30 w-10 h-10 bg-black/40 text-white rounded-full"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-20"
      >
        <h1 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-600 tracking-widest">
          MTN EXPERIENCE HUB
        </h1>

        <p className="mt-2 text-lg text-black font-bold tracking-wider">
          Powered by Friends Lounge
        </p>
      </motion.div>

      {/* Grid */}
      <div className="pt-40 pb-20 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {portals.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <Link to={p.link} target="_blank">
              <div className="relative overflow-hidden rounded-xl shadow-2xl border border-white/10">

                <img
                  src={p.img}
                  className="w-full h-96 object-cover"
                />

                <div className="absolute inset-0 bg-black/60" />
                <div className={`absolute inset-0 bg-gradient-to-t ${p.gradient}`} />

                <div className="absolute bottom-0 p-8">
                  <h2 className="text-2xl font-black text-white">
                    {p.title}
                  </h2>

                  <p className="mt-2 text-yellow-300 font-bold">
                    {p.subtitle}
                  </p>

                  <p className="mt-3 text-white/90">
                    {p.desc}
                  </p>

                  <div className="mt-5 inline-block px-8 py-3 bg-yellow-400 text-black font-bold rounded-full">
                    ENTER
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

export default Programs;
