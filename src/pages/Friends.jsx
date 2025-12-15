// src/pages/Friends.jsx
// Hero section redesigned as "Friendly Recognitions"
// Dedicated space for celebrating inductions, honors, and community milestones with video + description
// Core slogan "Making Friends and Building Communities" still prominent

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Zap, Globe, Building2, Volume2, VolumeX } from "lucide-react";

// Import the local video file
import islandVideo from "@/assets/videos/island.mp4";

export default function Friends() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.9]);

  const [showJungleX, setShowJungleX] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* FRIENDLY RECOGNITIONS — DEDICATED CELEBRATION SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={islandVideo}
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Unmute / Mute Toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-8 right-8 z-20 flex items-center gap-3 rounded-full bg-white/20 backdrop-blur-sm px-5 py-3 text-white hover:bg-white/30 transition"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          <span className="text-sm font-medium">
            {isMuted ? "Unmute" : "Mute"}
          </span>
        </button>

        {/* Recognition Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-5xl text-center px-6"
        >
          {/* Section Branding */}
          <h1 className="text-2xl md:text-4xl py-10 font-bold tracking-widest text-white drop-shadow-2xl">
            Friendly Recognitions
          </h1>
          <small className="text-white font-semibold">For background video sounds, click unmute button at lower right of this
            section</small>

        

          <div className="mt-12 p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 md:w-full">
            <h2 className="text-xl md:text-3xl font-semibold text-white drop-shadow-lg">
              Induction of <span className="font-bold">Chief Sir Barrister Santome Ibeneche (Zereuwa)</span>into Island All Stars Sports Club
            </h2>
          </div>

          <ChevronDown
            className="mx-auto mt-20 text-white/80 animate-bounce drop-shadow"
            size={42}
          />
        </motion.div>
      </section>

      {/* THE SPARK — ORIGIN & CONTINUITY */}
      <section className="py-32 px-6 bg-neutral-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium text-neutral-900 mb-16 text-center">
            The Friends Lounge Spark
          </h2>

          <div className="space-y-12">
            <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
              The story did not begin with a lounge. It began with a road.
              What was once quiet, undeveloped land was opened through the
              construction of <span className="text-red-600 font-medium">Donamenche Crescent</span>,
              creating access into new territory in Udo.
            </p>

            <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
              This effort was single‑handedly initiated by Chief Sir Barrister
              Santome Ibeneche (a.k.a. Zereuwa). With the road came possibility.
              Families built homes. Life followed. A new corridor of settlement
              took shape.
            </p>

            <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
              Friends’ Lounge emerged later as a signature civic landmark at the
              end of this growing road — not as the origin of development, but as
              a place of gathering, culture, and shared presence within an
              already forming community.
            </p>

            <p className="text-lg md:text-xl text-neutral-800 leading-relaxed">
              As homes now line Don Amenche Crescent, the open land beyond continues
              to invite imagination. Drawing inspiration from this steady growth,
              Udo sons and daughters have begun to speak — carefully and
              respectfully — of a larger possibility.
            </p>

            {/* SILICON VILLAGE — CORE IDEA */}
            <div className="mt-8 p-8 md:p-12 border border-neutral-300 rounded-2xl bg-white shadow-sm">
              <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-6">
                Silicon Village, Udo.
              </h3>
              <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
                A respectful continuation of the tools Silicon Valley gave the
                world — rebuilt with local purpose, clean energy, and long memory.
              </p>

              <p className="mt-8 text-lg text-neutral-600 leading-relaxed">
                This idea does not seek to rival history, but to learn from it.
                One of its earliest expressions is
                <span className="font-medium text-neutral-900"> JungleX</span> — an
                Africanfuturist social platform conceived in Udo. JungleX is not
                the destination, but a signal: that global‑grade technology can be
                imagined, built, and stewarded from this soil.
              </p>

              <div className="mt-10 inline-flex items-center gap-3 text-neutral-700">
                <button
                  onClick={() => setShowJungleX(true)}
                  className="inline-flex items-center gap-2 uppercase tracking-widest text-sm border-b border-neutral-400 pb-1 hover:text-neutral-900 transition"
                >
                  View JungleX
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* JUNGLEX MODAL */}
        {showJungleX && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
            onClick={() => setShowJungleX(false)}
          >
            <div
              className="w-full max-w-6xl bg-white border border-neutral-300 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://jungle-x-social-media.netlify.app/"
                className="w-full h-[75vh]"
                title="JungleX Demo"
              />
              <div className="p-6 text-center">
                <button
                  onClick={() => setShowJungleX(false)}
                  className="px-6 py-3 border border-neutral-400 text-neutral-800 rounded-full"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* WORK HARD / PLAY HARD — STRUCTURED & LEGIBLE */}
      <section className="py-32 px-6 bg-neutral-200">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-4xl text-neutral-900 text-center mb-20">
            Work Hard. Play Hard
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {["Swimming Pool", "VIP Lounge", "Live Music", "Premium Bar", "24/7 Security", "Mbaise Tours"].map(
              (item, i) => (
                <div
                  key={i}
                  className="p-10 border border-neutral-300 rounded-2xl bg-white shadow-sm"
                >
                  <div className="text-sm uppercase tracking-widest text-neutral-400 mb-4">
                    0{i + 1}
                  </div>
                  <h4 className="text-xl text-neutral-900 font-medium">{item}</h4>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* FINAL CALL — QUIET CONFIDENCE */}
      <section className="py-24 px-6 bg-neutral-100 border-t border-neutral-300">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-16">
            What is taking shape in Udo is incremental, communal, and generational —
            rooted in lived reality, open to the world, and respectful of the
            foundations laid by those before us.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a className="flex flex-col items-center gap-3 p-6 border border-neutral-300 rounded-2xl text-neutral-800 bg-white hover:shadow-md transition">
              <Building2 />
              <span>Build With Us</span>
            </a>
            <a className="flex flex-col items-center gap-3 p-6 border border-neutral-300 rounded-2xl text-neutral-800 bg-white hover:shadow-md transition">
              <Globe />
              <span>Corporate Sponsor</span>
            </a>
            <button
              onClick={() => setShowJungleX(true)}
              className="flex flex-col items-center gap-3 p-6 border border-neutral-300 rounded-2xl text-neutral-800 bg-white hover:shadow-md transition"
            >
              <Zap />
              <span>Live JungleX</span>
            </button>
            <a className="flex flex-col items-center gap-3 p-6 border border-neutral-300 rounded-2xl text-neutral-800 bg-white hover:shadow-md transition">
              <ArrowRight />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}