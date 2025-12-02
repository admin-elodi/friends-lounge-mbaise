// src/pages/Friends.jsx
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Heart, Lightbulb, Sparkles, ChevronDown, ArrowRight, Zap, ArrowUp, Globe, Building2 } from "lucide-react";
import palmsVideo from '@/assets/videos/palms.mp4';  // Path alias for video
import scrollImage from '@/assets/images/scroll.png';  // Path alias for scroll image
import roadImage from '@/assets/images/road.avif';  // Path alias for road image

export default function Friends() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 200]);
  const y2 = useTransform(scrollY, [0, 800], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300, 600], [1, 0.7, 0.3]);

  const [activeValue, setActiveValue] = useState(0);
  const [showJungleX, setShowJungleX] = useState(false);

  const values = [
    { icon: Heart, title: "Friendship First", desc: "Every seat is taken by a friend — known or yet to be made." },
    { icon: Sparkles, title: "Luxury with Roots", desc: "Palm wine meets champagne. Tradition meets tomorrow." },
    { icon: Lightbulb, title: "Innovation & Safety", desc: "Here, bold ideas are born — and protected." },
    { icon: Users, title: "Community Forever", desc: "We don't just host events. We grow legacies." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO — PALMS.MP4 VIDEO BACKGROUND */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-75 contrast-125"
          src={palmsVideo}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/90" />

        <motion.div style={{ y: y2, opacity }} className="relative z-20 text-center px-6 backdrop-blur-sm bg-black/30 border border-white/20 rounded-3xl p-12 md:p-16 shadow-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="text-2xl md:text-4xl lg:text-6xl font-black text-white tracking-tight leading-none bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent drop-shadow-2xl"
          >
            Friends' Lounge Mbaise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.6 }}
            className="mt-8 text-xl md:text-2xl lg:text-3xl font-light text-yellow-100 tracking-widest drop-shadow-xl"
          >
            Its not just a Lounge but a movement
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-16"
          >
            <ChevronDown className="mx-auto animate-bounce text-red-500 drop-shadow-lg" size={48} />
          </motion.div>
        </motion.div>
      </section>

     {/* FRIENDS' LOUNGE SPARK — FULL SCROLL.PNG OVERLAY - MOBILE RESPONSIVE HEIGHT */}
    <section className="relative py-30 md:py-32 px-6 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
        style={{ backgroundImage: `url(${scrollImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      
      <div className="relative z-20 max-w-5xl mx-auto text-center px-6 w-full max-h-[80vh] overflow-y-auto md:overflow-visible md:max-h-none scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-transparent">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl md:text-5xl lg:text-7xl font-black text-white mb-4 tracking-tight bg-gradient-to-r from-yellow-400 via-red-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-2xl">
            The Friends' Lounge Spark
          </h3>
        </motion.div>

        <div className="space-y-10 max-w-4xl mx-auto text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-6 backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20"
          >
            <div className="flex-shrink-0 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full mt-4 md:mt-5 animate-pulse" />
            <div className="flex-1">
              <p className="text-lg md:text-xl text-white/95 font-light leading-relaxed drop-shadow-lg">
                Friends Lounge Mbaise broke ground first. A quiet village road transformed into <span className="text-red-400 font-semibold">Donamenche Crescent</span>. Homes rose alongside—families followed
              </p>
            </div>
          </motion.div>

          

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-6 backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20"
          >
            <div className="flex-shrink-0 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full mt-4 md:mt-5" />
            <div className="flex-1">
              <p className="text-lg md:text-xl text-white/95 font-light leading-relaxed drop-shadow-lg">
                Our bold step opened the territory. Modern ventures with deep roots now thrive beyond our gates
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-start gap-6 backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20"
          >
            <div className="flex-shrink-0 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full mt-4 md:mt-5 animate-pulse" />
            <div className="flex-1">
              <p className="text-lg md:text-xl text-white/95 font-light leading-relaxed drop-shadow-lg">
                Now, <span className="text-red-400 font-bold text-xl md:text-2xl">Silicon Village</span> emerges—a homegrown Silicon Valley. 
                Traditional roots. Futurist vision. Friends Lounge made it possible.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

      {/* JUNGLEX — ROAD.AVIF BACKGROUND */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden" style={{ backgroundImage: `url(${roadImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <motion.h4
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl text-white mb-12 tracking-tight font-black drop-shadow-2xl"
          >
            Silicon Village Launch
          </motion.h4>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-black/80 backdrop-blur-xl border-2 border-yellow-100 rounded-3xl p-12 md:p-16 shadow-2xl shadow-green-900/50 hover:shadow-green-400/30 hover:border-green-400/70 cursor-pointer"
            onClick={() => setShowJungleX(true)}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <img
                src="https://cdn.pixabay.com/photo/2016/01/23/15/23/lion-1158904_1280.png"
                alt="Lion silhouette"
                className="w-full h-full object-cover object-center mix-blend-overlay"
                style={{ filter: "brightness(0.18) contrast(1.6)" }}
              />
            </div>

            <div className="relative z-10">
              <div className="text-4xl md:text-5xl font-semibold text-yellow-100 group-hover:text-green-400 transition-all duration-700 mb-8 select-none drop-shadow-lg">JungleX</div>
              <p className="text-xl md:text-2xl text-white/95 mb-12 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-xl">
                Friends' Lounge Mbaise introduces the world's first <span className="text-yellow-100 font-semibold drop-shadow-sm">Africanfuturist</span> social media platform called JungleX as a work in progress.
                This gesture is also a call on Mbaise tech innovators, brothers & sisters, to build Silicon Village right here in Udo. We shall focus on clean energy and ecosystem-enriching industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <div className="group-hover:-rotate-2 transition-transform duration-300">
                  <ArrowRight className="text-yellow-100 w-10 h-10 md:w-12 md:h-12 drop-shadow-lg" />
                </div>
                <span className="text-yellow-100 text-lg md:text-xl font-mono tracking-wider uppercase border border-yellow-100 px-6 py-3 rounded-full bg-green-300/20 backdrop-blur-sm shadow-lg select-none">
                  Work In Progress
                </span>
              </div>
            </div>
          </motion.div>

          {showJungleX && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setShowJungleX(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-6xl max-h-[90vh] overflow-auto bg-black/95 border-2 border-green-500 rounded-3xl shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <iframe
                  src="https://jungle-x-social-media.netlify.app/"
                  className="w-full h-[70vh] md:h-[80vh] border-0 rounded-2xl"
                  title="JungleX Live Demo"
                />
                <div className="p-8 border-t border-green-500/30 text-center">
                  <button
                    onClick={() => setShowJungleX(false)}
                    className="px-8 py-4 bg-red-600/80 hover:bg-red-500 text-white font-bold rounded-2xl border border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Close Demo
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      
      {/* FINAL CALL — MINIMALIST CRYSTALLINE CTAs */}
      <section className="py-10 bg-gradient-to-b from-black via-red-950/40 to-black/90 relative overflow-hidden border-t-8 border-yellow-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.12),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(239,68,68,0.08),transparent_70%)]" />
        <div className="relative z-10 text-center px-6">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-6xl lg:text-5xl text-white leading-tight mb-6 bg-gradient-to-r from-white via-red-400/90 to-yellow-100 bg-clip-text text-transparent drop-shadow-2xl"
          >
            Friends Lounge Mbaise is doing this...
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl lg:text-2xl text-white/95 font-light tracking-widest max-w-3xl mx-auto leading-relaxed mb-16 drop-shadow-lg"
          >
            Pioneering <span className="text-red-400 font-bold">Silicon Village</span>...Mbaise's next tech frontier. 
            Friends Lounge Mbaise leads, adopting JungleX as her child, striving to put it forward as Silicon Village's first emerging product.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <motion.a
              href="#support-silicon-village"
              whileHover={{ y: -4, scale: 1.02 }}
              className="group bg-white/10 backdrop-blur-xl border border-green-500/40 hover:border-green-400/70 hover:bg-white/20 text-white font-bold py-8 px-6 md:px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center gap-3 text-sm md:text-base"
            >
              <Building2 size={28} className="group-hover:scale-110 transition-transform duration-300" />
              <span>Build With Us</span>
              <ArrowUp className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
            </motion.a>
            
            <motion.a
              href="mailto:partner@siliconvillageudo.com"
              whileHover={{ y: -4, scale: 1.02 }}
              className="group bg-white/10 backdrop-blur-xl border border-red-500/40 hover:border-red-400/70 hover:bg-white/20 text-white font-bold py-8 px-6 md:px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center gap-3 text-sm md:text-base"
            >
              <Globe size={28} className="group-hover:scale-110 transition-transform duration-300" />
              <span>Corporate Sponsor</span>
            </motion.a>
            
            <motion.button
              onClick={() => setShowJungleX(true)}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group bg-white/10 backdrop-blur-xl border border-yellow-400/50 hover:border-yellow-300/70 hover:bg-white/20 text-white font-bold py-8 px-6 md:px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center gap-3 text-sm md:text-base"
            >
              <Zap size={28} className="group-hover:scale-110 transition-transform duration-300" />
              <span>Live JungleX</span>
            </motion.button>
            
            <motion.a
              href="https://wa.me/+2348012345678?text=Silicon%20Village%20Partnership"
              whileHover={{ y: -4, scale: 1.02 }}
              className="group bg-white/10 backdrop-blur-xl border border-purple-500/40 hover:border-purple-400/70 hover:bg-white/20 text-white font-bold py-8 px-6 md:px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center gap-3 text-sm md:text-base"
            >
              <ArrowRight size={28} className="group-hover:scale-110 transition-transform duration-300" />
              <span>WhatsApp Now</span>
            </motion.a>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 text-lg md:text-xl lg:text-2xl text-yellow-100 font-semibold tracking-wide drop-shadow-xl"
          >
            What are Friends' for?
          </motion.p>
        </div>
      </section>
      {/* PLAY HARD — MOBILE SWIPE INDICATOR */}
      <section className="py-32 bg-gradient-to-r from-black via-red-950/10 to-black/70 overflow-hidden border-t border-red-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-6xl font-black text-center text-white mb-10 tracking-tight bg-gradient-to-r from-white via-red-300 to-green-400 bg-clip-text text-transparent"
          >
            Work Hard & Play Hard
          </motion.h2>

          <div className="flex space-x-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 md:pb-0">
            {[
              { title: "Swimming Pool", desc: "Cool off. Celebrate. Repeat." },
              { title: "VIP Mini-Lounge", desc: "Private. Intimate. Legendary." },
              { title: "Live Music Stage", desc: "1,000 guests. One heartbeat." },
              { title: "Premium Bar", desc: "Palm wine or Hennessy — your call." },
              { title: "24/7 Security", desc: "Celebrate freely. We've got you." },
            ].map((amenity, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -10 }}
                className="snap-center shrink-0 w-80 h-96 bg-gradient-to-b from-red-900/20 to-red-950/10 border-2 border-red-800/60 backdrop-blur-none shadow-2xl shadow-red-900/50 hover:border-green-500/70 hover:shadow-green-900/40 rounded-3xl p-10 flex flex-col justify-end text-left transition-all duration-500"
              >
                <div className="text-7xl font-black bg-gradient-to-r from-red-600 via-white to-green-500 bg-clip-text text-transparent mb-6 opacity-40">0{i + 1}</div>
                <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">{amenity.title}</h3>
                <p className="text-xl text-gray-100 font-light drop-shadow-md">{amenity.desc}</p>
                <div className="mt-6 w-full h-px bg-gradient-to-r from-transparent via-green-500/70 to-transparent shadow-inner" />
              </motion.div>
            ))}
          </div>

          {/* MOBILE SWIPE INDICATOR */}
          <div className="md:hidden flex justify-center items-center gap-2 mt-8 text-center">
            <motion.div
              animate={{ x: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-10 h-1 bg-gradient-to-r from-yellow-100 to-green-500 rounded-full"
            />
            <span className="text-lg text-white/80 font-medium tracking-wide">Swipe left to explore</span>
            <motion.div
              animate={{ x: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-10 h-1 bg-gradient-to-r from-red-500 to-green-500 rounded-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
