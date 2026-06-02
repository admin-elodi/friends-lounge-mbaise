import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Waves, 
  Wine, 
  Music, 
  Crown, 
  ShieldCheck, 
  MapPin, 
  Sparkles 
} from "lucide-react";

import poolVideo from "@/assets/videos/pool.mp4";
import barImage from "@/assets/images/bar.webp";
import musicVideo from "@/assets/videos/music.webm";
import friendsBarVideo from "@/assets/videos/friends-bar.webm";
import securityImage from "@/assets/images/security.jpeg";
import yamImage from "@/assets/images/yam.jpg";

export default function Facilities() {
  const facilities = [
    {
      title: "Swimming Pool",
      media: poolVideo,
      type: "video",
      icon: <Waves className="text-blue-400" />,
      desc: "An azure oasis designed for ultimate relaxation. Whether you're doing laps or lounging poolside, our crystal-clear waters offer the perfect escape.",
      span: "md:col-span-2",
    },
    {
      title: "Premium Bar",
      media: barImage,
      type: "image",
      icon: <Wine className="text-amber-500" />,
      desc: "Expertly crafted cocktails and a curated selection of world-class spirits in a sophisticated atmosphere.",
      span: "md:col-span-1",
    },
    {
      title: "VIP Lounge",
      media: friendsBarVideo,
      type: "video",
      icon: <Crown className="text-yellow-500" />,
      desc: "Exclusivity defined. Experience personalized service in an intimate setting designed for our most distinguished guests.",
      span: "md:col-span-1",
    },
    {
      title: "Live Music & Nightlife",
      media: musicVideo,
      type: "video",
      icon: <Music className="text-purple-400" />,
      desc: "From soul-stirring live bands to high-energy DJ sets, we provide the soundtrack to your most memorable nights.",
      span: "md:col-span-2",
    },
    {
      title: "24/7 Elite Security",
      media: securityImage,
      type: "image",
      icon: <ShieldCheck className="text-emerald-400" />,
      desc: "Your peace of mind is our priority. Discreet, professional security ensures a safe environment around the clock.",
      span: "md:col-span-1",
    },
    {
      title: "Mbaise Cultural Tours",
      media: yamImage,
      type: "image",
      link: "https://www.tripadvisor.com/Tourism-g304057-Nigeria-Vacations.html",
      icon: <MapPin className="text-red-400" />,
      desc: "Journey through the heart of Igboland. Explore ancient heritage sites and the rich traditions of Mbaise.",
      span: "md:col-span-2",
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

      {/* Grid container: Full width mobile, centered desktop */}
      <div className="max-w-7xl mx-auto px-0 sm:px-8 pt-20 space-y-16 relative z-10">
        
        {/* Page Header */}
        <motion.section
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 px-6"
        >
          <div className="flex justify-center items-center gap-2 mb-2">
            <Sparkles className="text-amber-400 size-4" />
            <span className="uppercase tracking-[0.25em] text-xs font-bold text-gray-400">The Ultimate Experience</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Facilities & Services
          </h1>
          <p className="text-gray-400 text-[12px] md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Enjoy Premium Mbaise Hospitality
          </p>
        </motion.section>

        {/* Balanced Bento Grid */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6"
        >
          {facilities.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              // Mobile: Square/Full width | Desktop: Slightly rounded (md)
              className={`${item.span} group relative bg-[#25282c] border-y md:border border-white/5 md:rounded-lg overflow-hidden shadow-2xl transition-all duration-300`}
            >
              {/* Media Section */}
              <div className="relative h-72 md:h-80 w-full overflow-hidden">
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
                    className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition duration-500"
                    alt={item.title}
                  />
                )}

                {item.type === "placeholder" && (
                  <div className="w-full h-full bg-[#2a2d32] flex items-center justify-center">
                    <ShieldCheck size={48} className="text-white/10" />
                  </div>
                )}
                
                {/* Balanced Overlay: Dark enough for text, light enough for media visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#25282c] via-transparent to-transparent opacity-80" />
              </div>

              {/* Content Section */}
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 rounded-md border border-white/10">
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-semibold text-white tracking-tight">{item.title}</h4>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>

                {item.link ? (
                  <button
                    onClick={() => window.open(item.link, "_blank")}
                    className="mt-2 flex items-center gap-2 text-red-400 font-semibold text-sm hover:text-red-300 transition-colors"
                  >
                    Explore Mbaise
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <div className="h-0.5 w-10 bg-red-500/40 rounded-full mt-4" />
                )}
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