// src/pages/Friends.jsx
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";

import islandVideo from "@/assets/videos/island.mp4";
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
      name: "IKENGA 1 OF UDO",
      title: "Conferred on Chief Sir Barrister Santome Ibeneche (Zereuwa)",
      description:
        "In a recent historic event, Chief Sir Barrister Santome Ibeneche was conferred with the prestigious traditional title of Ikenga 1 of Udo. This title recognizes his outstanding contributions to the development of Udo community, his unwavering commitment to peace, unity, and progress, and his role as a beacon of leadership and philanthropy in Mbaise land. The conferment ceremony was a celebration of excellence, culture, and community pride — a fitting honour for a man whose life continues to inspire generations.",
      // Add real image/video of Ikenga ceremony here when available
      // video: ikengaVideo,
      // image: ikengaImage,
      placeholder: "Ceremony media coming soon",
    },
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

  return (
    <main className="relative min-h-screen font-montserrat text-gray-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 py-16 space-y-20">

        {/* ================= PAGE CAPTION ================= */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h1 className="text-xl md:text-xl font-bold tracking-tight">
            Honouring Legacy, Friendship & Community Impact
          </h1>

          <p className="text-red-600 text-sm md:text-base italic">
            “Mmadu ka aku” — People are the true wealth.
          </p>

          <div className="mt-4 inline-block px-5 py-2 rounded-full 
                          bg-red-50 text-red-600 text-xs md:text-sm font-medium">
            Legacy. Friendship. Community impact. ✨
          </div>
        </motion.section>

        {/* INTRO */}
        <section className="relative rounded-xl overflow-hidden p-8 
                            bg-gradient-to-r from-red-600/10 to-transparent 
                            border border-red-50/10">
          <h2 className="text-xl md:text-3xl font-bold tracking-tight">
            Friendly Recognitions
          </h2>
          <p className="mt-3 text-gray-600 text-lg max-w-3xl text-justify">
            This space celebrates friends of Chief Sir Santome Ibeneche —
            individuals he personally respects and honors for major
            achievements and recognitions.
          </p>
        </section>

        {/* RECOGNITIONS – all together, including Ikenga */}
        {recognitions.map((item, index) => (
          <section
            key={index}
            className="bg-white/95 rounded-2xl border shadow-sm overflow-hidden"
          >
            {item.video && (
              <div className="relative h-[420px]">
                <video
                  ref={index === 0 ? videoRef : null} // Only ref on first video if needed
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

            {/* INDUCTION IMAGE – kept for the induction entry */}
            {item.image && (
              <div className="p-6">
                <img
                  src={item.image}
                  alt="Chief Santome induction ceremony"
                  className="w-full h-[300px] md:h-[700px] rounded-xl shadow-lg object-cover"
                />
                <p className="mt-3 text-sm text-gray-500 text-center text-justify">
                  Chief Sir Santome Ibeneche during his induction ceremony
                </p>
              </div>
            )}

            {/* Placeholder for Ikenga media if no video/image yet */}
            {item.placeholder && (
              <div className="relative h-64 md:h-96 flex items-center justify-center bg-gradient-to-br from-red-900/20 to-black/30">
                <p className="text-white text-center px-6 text-lg font-medium">
                  {item.placeholder}
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
        <section className="py-24 px-6 bg-gradient-to-b 
                            from-white to-gray-50 
                            rounded-2xl border shadow-sm">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl md:text-3xl font-semibold text-center mb-12">
              The Friends Lounge Spark
            </h2>

            <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
              <p className="text-justify">
                The story did not begin with a lounge. It began with a road.
                What was once quiet, undeveloped land was opened through the
                construction of <span className="font-semibold text-red-600">
                Donamenche Crescent</span>.
              </p>

              <p className="text-justify">
                This effort was single-handedly initiated by{" "}
                <span className="font-semibold">
                  Chief Sir Barrister Santome Ibeneche (Zereuwa)
                </span>.
              </p>

              <p className="text-justify">
                Friends’ Lounge emerged later as a signature civic landmark —
                a place of gathering, culture, and shared presence.
              </p>

              {/* SILICON VILLAGE */}
              <div className="mt-12 p-8 bg-white rounded-xl border shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">
                  Silicon Village, Udo
                </h3>

                <p className="text-gray-700 leading-relaxed text-justify">
                  A respectful continuation of Silicon Valley —
                  rebuilt with local purpose and long memory.
                </p>

                <p className="mt-4 text-gray-700 leading-relaxed text-justify">
                  One of its earliest expressions is{" "}
                  <span className="font-semibold text-red-600">JungleX</span>.
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

      </div>
    </main>
  );
}