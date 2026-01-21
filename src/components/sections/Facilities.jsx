import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import poolVideo from "@/assets/videos/pool.mp4";
import barImage from "@/assets/images/bar.webp";
import musicVideo from "@/assets/videos/music.webm";
import friendsBarVideo from "@/assets/videos/friends-bar.webm";

export default function Facilities() {
  const facilities = [
    {
      title: "Swimming Pool",
      media: poolVideo,
      type: "video",
      desc: "Relax, cool off, and unwind in our clean outdoor pool.",
    },
    {
      title: "Premium Bar",
      media: barImage,
      type: "image",
      desc: "Enjoy premium drinks, cocktails, and a classy bar experience.",
    },
    {
      title: "Live Music",
      media: musicVideo,
      type: "video",
      desc: "Weekly live performances and DJ nights.",
    },
    {
      title: "VIP Lounge",
      media: friendsBarVideo,
      type: "video",
      desc: "Private hangout space for premium guests.",
    },
    {
      title: "24/7 Security",
      type: "placeholder",
      desc: "Professional security personnel on ground at all times.",
    },
    {
      title: "Mbaise Tours",
      link: "https://www.tripadvisor.com/Tourism-g304057-Nigeria-Vacations.html",
      desc: "Explore culture, markets, and heritage sites in Mbaise.",
    },
  ];

  return (
    <main className="relative min-h-screen font-montserrat text-gray-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 py-16 space-y-20">

        {/* Page Header */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Facilities & Services
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            At Friends' Lounge Mbaise, we believe in balance — hard work meets great leisure.
          </p>
        </motion.section>

        {/* Facilities Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="group bg-white/95 rounded-2xl border shadow-sm overflow-hidden"
            >
              <div className="relative h-52">
                {item.type === "video" && (
                  <video
                    src={item.media}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}

                {item.type === "image" && (
                  <img
                    src={item.media}
                    className="w-full h-full object-cover"
                    alt={item.title}
                  />
                )}

                {item.type === "placeholder" && (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black 
                                  flex items-center justify-center">
                    <span className="text-white font-medium tracking-wide">
                      SECURITY ZONE
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />
              </div>

              <div className="p-6 space-y-2">
                <h4 className="text-xl font-semibold">{item.title}</h4>
                <p className="text-gray-600 text-sm text-justify">
                  {item.desc}
                </p>

                {item.link && (
                  <button
                    onClick={() => window.open(item.link, "_blank")}
                    className="mt-3 inline-flex items-center gap-2 
                               text-red-600 font-medium hover:underline"
                  >
                    Explore Mbaise
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </section>

      </div>
    </main>
  );
}