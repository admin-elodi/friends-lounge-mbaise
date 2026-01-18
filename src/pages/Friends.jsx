// src/pages/Friends.jsx
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";

import islandVideo from "@/assets/videos/island.mp4";
import poolVideo from "@/assets/videos/pool.mp4";
import barImage from "@/assets/images/bar.webp";
import musicVideo from "@/assets/videos/music.webm";
import friendsBarVideo from "@/assets/videos/friends-bar.webm";
import inductionImage from "@/assets/images/induction.jpeg";

export default function Friends() {

  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  /* ---------------- FRIENDLY RECOGNITIONS ---------------- */
  const recognitions = [
    {
      name: "INDUCTEE: Chief Sir Barrister Santome Ibeneche (Zereuwa)",
      title: "Induction into Island All Stars Sports Club",
      description:
        "This first edition of Friendly Recognitions begins with the induction of Chief Sir Santome Ibeneche into Island All Star Sports Club",
      video: islandVideo,
      image: inductionImage,
    },
    {
      name: "Future Honoree",
      title: "Coming Soon",
      description:
        "This section will feature friends of Chief Santome who have achieved notable milestones and recognitions.",
    },
  ];

  /* ---------------- FACILITIES ---------------- */
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

      <div className="max-w-7xl mx-auto px-4 sm:px-12 py-12 space-y-20">

        {/* INTRO */}
        <section className="relative rounded-xl overflow-hidden p-8 bg-gradient-to-r from-red-600/10 to-transparent border border-red-50/10">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
            Friendly Recognitions
          </h1>
          <p className="mt-3 text-gray-600 text-lg max-w-3xl text-justify">
            This space celebrates friends of Chief Sir Santome Ibeneche — individuals he personally
            respects and honors for major achievements and recognitions.
          </p>
        </section>

        {/* RECOGNITIONS */}
        {recognitions.map((item, index) => (
          <section
            key={index}
            className="bg-white/95 rounded-2xl border shadow-sm overflow-hidden"
          >
            {item.video && (
              <div className="relative h-[420px]">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={item.video}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                />

                <div className="absolute inset-0 bg-black/60" />

                <button
                  onClick={toggleMute}
                  className="absolute bottom-6 right-6 z-20 flex items-center gap-2 
                             bg-black/50 backdrop-blur-md px-4 py-2 rounded-full 
                             text-white border border-white/20"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  <span className="text-sm hidden sm:inline">
                    {isMuted ? "Unmute" : "Mute"}
                  </span>
                </button>

                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 bg-black/40 backdrop-blur-xl rounded-xl 
                               border border-white/20 text-center shadow-xl"
                  >
                    <h3 className="text-2xl md:text-3xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-gray-200 text-sm md:text-base text-justify">
                      {item.name}
                    </p>
                  </motion.div>
                </div>
              </div>
            )}

            {/* INDUCTION IMAGE */}
            {item.image && (
              <div className="p-6">
                <img
                  src={item.image}
                  alt="Chief Santome induction ceremony"
                  className="w-full h-[300px] md:h-[1300px] rounded-xl shadow-lg object-cover"
                />
                <p className="mt-3 text-sm text-gray-500 text-center text-justify">
                  Chief Sir Santome Ibeneche during his induction ceremony
                </p>
              </div>
            )}

            <div className="p-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-semibold">
                {item.name}
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                {item.description}
              </p>
            </div>
          </section>
        ))}

        {/* FRIENDS LOUNGE SPARK */}
        <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 rounded-2xl border shadow-sm">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
              The Friends Lounge Spark
            </h2>

            <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
              <p className="text-justify">
                The story did not begin with a lounge. It began with a road.
                What was once quiet, undeveloped land was opened through the
                construction of <span className="font-semibold text-red-600">Donamenche Crescent</span>,
                creating access into new territory in Udo.
              </p>

              <p className="text-justify">
                This effort was single-handedly initiated by{" "}
                <span className="font-semibold">
                  Chief Sir Barrister Santome Ibeneche (Zereuwa)
                </span>.
                With the road came possibility. Families built homes. Life followed.
                A new corridor of settlement took shape.
              </p>

              <p className="text-justify">
                Friends’ Lounge emerged later as a signature civic landmark at the
                end of this growing road — a place of gathering, culture, and shared
                presence within an already forming community.
              </p>

              {/* SILICON VILLAGE */}
              <div className="mt-12 p-8 bg-white rounded-xl border shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">
                  Silicon Village, Udo
                </h3>

                <p className="text-gray-700 leading-relaxed text-justify">
                  A respectful continuation of the tools Silicon Valley gave the world —
                  rebuilt with local purpose, clean energy, and long memory.
                </p>

                <p className="mt-4 text-gray-700 leading-relaxed text-justify">
                  One of its earliest expressions is{" "}
                  <span className="font-semibold text-red-600">JungleX</span> —
                  an Africanfuturist social platform conceived in Udo.
                  JungleX is not the destination, but a signal:
                  global-grade technology can be imagined, built, and stewarded
                  from this soil.
                </p>

                <div className="mt-8">
                  <button
                    onClick={() =>
                      window.open(
                        "https://jungle-x-social-media.netlify.app/",
                        "_blank"
                      )
                    }
                    className="inline-flex items-center gap-3 px-6 py-3 
                               bg-red-600 hover:bg-red-700 text-white 
                               rounded-lg font-medium transition shadow"
                  >
                    Explore JungleX
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORK HARD PLAY HARD */}
        <section className="space-y-10">
          <h3 className="text-2xl font-semibold text-center">
            Work Hard, Play Hard
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

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

                  {!item.media && !item.type && (
                    <div className="w-full h-full bg-black/5 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Explore Mbaise</span>
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
                      className="mt-3 inline-flex items-center gap-2 text-red-600 font-medium hover:underline"
                    >
                      Explore Mbaise
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}

          </div>
        </section>

      </div>
    </main>
  );
}
