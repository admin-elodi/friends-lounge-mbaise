import React, { useRef, useState } from "react"; 
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
      subtitle: "Broadcast your event live",
      desc: "Brands can livestream ceremonies, festivals & conferences through Friends Lounge.",
      cta: "STREAM EVENT",
      link: "/advertise",
    },
    {
      img: whatsappImg,
      title: "Community Contact Hub",
      subtitle: "Direct WhatsApp access",
      desc: "Connect audiences directly to event organisers or committee leadership.",
      cta: "OPEN CHAT",
      link: "/advertise",
    },
    {
      img: supportImg,
      title: "Support & Sponsorship",
      subtitle: "Fund the vision",
      desc: "Donations, sponsorships & material support for community events.",
      cta: "SUPPORT EVENT",
      link: "/advertise",
    },
    {
      img: futureImg,
      title: "Future Vision Portal",
      subtitle: "Thinking beyond today",
      desc: "Reverse-engineer future editions and long-term event impact.",
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
        muted
        className="absolute inset-0 w-full h-full object-cover brightness-110 grayscale z-0"
      />

      {/* Dark unify overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-30 w-10 h-10 bg-black/50 text-white rounded-full border border-white/20"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-5 left-1/2 -translate-x-1/2 text-center z-20 space-y-2"
      >
        <h1 className="text-lg md:text-2xl font-semibold tracking-widest text-white whitespace-nowrap">
          Brand Experience Hub
        </h1>

       

        {/* 🔥 3rd Point – Strategic Slogan */}
        <p className="text-[10px] md:text-sm text-white max-w-xl mx-auto leading-relaxed"> 
          <span className="text-yellow-200 font-semibold">Point 3</span> of Friends' Ad 3 point ad system 
          where your brand's visibility lives inside Mbaise
        </p>
      </motion.div>

      {/* Grid - Portals with Igbo-inspired border */}
      <div
        className="relative z-10 pt-44 pb-20 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10"
        style={{ perspective: "1200px" }}
      >
        {portals.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{
              scale: 1.05,
              rotateX: -2,
              rotateY: 2,
            }}
            className="transform-gpu"
          >
            <Link to={p.link}>
              <div
                className="
                  relative overflow-hidden rounded-2xl 
                  bg-white/5 backdrop-blur-xl 
                  border border-white/10
                  shadow-[inset_0_2px_8px_rgba(255,255,255,0.05),inset_0_-4px_12px_rgba(0,0,0,0.6)]
                "
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Igbotic Pattern Border */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        45deg,
                        rgba(220,38,38,0.5) 0px,
                        rgba(220,38,38,0.5) 3px,
                        transparent 3px,
                        transparent 12px
                      ),
                      repeating-linear-gradient(
                        -45deg,
                        rgba(255,255,255,0.25) 0px,
                        rgba(255,255,255,0.25) 2px,
                        transparent 2px,
                        transparent 10px
                      ),
                      repeating-linear-gradient(
                        0deg,
                        rgba(200,20,20,0.2) 0px,
                        rgba(200,20,20,0.2) 1px,
                        transparent 1px,
                        transparent 8px
                      )
                    `,
                    backgroundSize: "100% 100%",
                    maskImage: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "source-out",
                    maskComposite: "exclude",
                    padding: "4px",
                  }}
                />

                {/* Image */}
                <img
                  src={p.img}
                  className="w-full h-96 object-cover grayscale opacity-60"
                  alt="brand portal"
                />

                {/* Emboss overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40 border-b-2 border-yellow-200"
                />

                {/* Content */}
                <div className="absolute bottom-0 p-8 translate-z-[30px]">
                  <h2 className="text-2xl font-black text-white tracking-wide">
                    {p.title}
                  </h2>

                  <p className="mt-2 text-red-400 font-bold">
                    {p.subtitle}
                  </p>

                  <p className="mt-3 text-gray-300">
                    {p.desc}
                  </p>

                  <div
                    className="
                      mt-5 inline-block px-8 py-3 
                      bg-gradient-to-r from-red-600 to-red-500 
                      text-white font-bold rounded-full shadow-lg"
                  >
                    {p.cta}
                  </div>
                </div>

                {/* Top light edge */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BrandHub;
