// src/pages/Mbaise.jsx
import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import marketImage from "@/assets/images/market.jpg"; // existing asset in your project
import mbaiseMap from "@/assets/images/mbaise-map.jpg"; // <- imported with alias


export default function Mbaise() {
  const markets = [
    {
      day: "EKE",
      mystical: "Energy renewal • Fresh beginnings",
      weekdays: ["Sunday", "Thursday"],
      location: "Aboh Mbaise",
    },
    {
      day: "ORIE",
      mystical: "Clarity • Conversation",
      weekdays: ["Monday", "Friday"],
      location: "Nguru Mbaise",
    },
    {
      day: "AFO",
      mystical: "Harvest • Abundance",
      weekdays: ["Tuesday", "Saturday"],
      location: "Owerri Mbaise",
    },
    {
      day: "NKWO",
      mystical: "Boldness • Breakthrough",
      weekdays: ["Wednesday"],
      location: "Ahiazu Mbaise",
    },
  ];


  const englishDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const igboMapping = {
    Sunday: "EKE",
    Monday: "ORIE",
    Tuesday: "AFO",
    Wednesday: "NKWO",
    Thursday: "EKE",
    Friday: "ORIE",
    Saturday: "AFO",
  };


  const now = new Date();
  const englishToday = englishDays[now.getDay()];
  const igboToday = igboMapping[englishToday] || "EKE";


  return (
    <main className="mbaise-page w-full min-h-screen relative bg-black/95 text-white font-montserrat overflow-x-hidden">
      {/* BACKDROP — image + subtle cosmic gradient */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.55), rgba(0,0,0,0.6)), url(${mbaiseMap})`,
        }}
        aria-hidden="true"
      />


      {/* Soft radial glow (cosmic) */}
      <div
        className="pointer-events-none absolute -top-20 right-1/4 w-[480px] h-[480px] rounded-full blur-3xl opacity-30 bg-gradient-to-r from-purple-500 via-pink-400 to-amber-300 -z-0"
        aria-hidden="true"
      />


      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20 space-y-14">
        {/* TODAY’S IGBO + ENGLISH DAY — minimalist display */}
        <div className="text-center mb-10">
          <div className="inline-block px-6 py-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-md">
            <p className="text-sm tracking-widest text-gray-300">TODAY</p>
            <div className="mt-1 inline-flex items-center gap-3">
              <span className="text-lg font-bold text-green-300">{igboToday}</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-sm text-gray-200">{englishToday}</span>
            </div>
          </div>
        </div>


        {/* HERO */}
        <header className="relative text-center max-w-3xl mx-auto">
          <h1 className="text-sm md:text-3xl">Explore Mbaise From The Lounge</h1>


          <div className="mt-7 flex items-center justify-center gap-3">
            <a
              href="#experience"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-transparent to-transparent border border-green-400/40 px-4 py-2 rounded-full text-sm font-semibold hover:scale-[1.02] transition"
            >
              Explore Experiences
            </a>


            <a
              href="/book"
              className="inline-flex items-center gap-2 bg-green-400 text-black px-4 py-2 rounded-full text-sm font-semibold hover:brightness-95 transition"
            >
              Book a Visit
            </a>
          </div>
        </header>


        {/* TRAVEL TEASER — quick visuals + punch lines */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <motion.h2
              initial={{ x: -10, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-semibold text-white"
            >
              A Lounge that awakened a movement
            </motion.h2>
            <p className="text-gray-300">
              From quiet access roads to glowing nightscapes — Friends Lounge Mbaise is powering a local renaissance.
              Expect warm hospitality and big energy
            </p>


            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="bg-white/5 p-3 rounded-lg flex items-start gap-3">
                <span className="text-2xl">🏊</span>
                <div>
                  <div className="font-semibold">Poolside Evenings</div>
                  <div className="text-xs text-gray-300">Light shows, live music, premium drinks.</div>
                </div>
              </li>
              <li className="bg-white/5 p-3 rounded-lg flex items-start gap-3">
                <span className="text-2xl">📸</span>
                <div>
                  <div className="font-semibold">Instagrammable Corners</div>
                  <div className="text-xs text-gray-300">Design-forward scenes for creators & tourists.</div>
                </div>
              </li>
            </ul>
          </div>


          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-xl border border-white/10"
          >
            <div className="aspect-[16/10] bg-black/30 flex items-center justify-center">
              <img src={marketImage} alt="Mbaise market preview" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </section>


        {/* MARKETS — reimagined as quick, snackable cards */}
        <section id="experience" className="space-y-8">
          <div className="flex flex-col items-start gap-3">
            <h3 className="text-2xl md:text-3xl font-semibold">Mbaise Market Days</h3>
            <span className="text-sm text-gray-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Mbaise, Imo State
            </span>
            <p className="text-sm text-gray-300 italic mt-2">
              Tip for tourists: show up curious, bring cash for small purchases, and ask for the warmest porridge spot.
            </p>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {markets.map((m) => (
              <motion.article
                key={m.day}
                whileHover={{ translateY: -8 }}
                className="bg-gradient-to-br from-black/60 to-black/40 border border-white/6 p-5 rounded-2xl shadow-lg flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold tracking-tight text-gray-300">{m.day}</div>
                    <div className="text-xs text-gray-400 mt-1">{m.mystical}</div>
                    <div className="text-xs text-gray-500 mt-1">Weekdays: {m.weekdays.join(", ")}</div>
                    <div className="text-xs text-gray-400 mt-1">Location: {m.location}</div>
                  </div>
                  <div className="text-sm text-gray-400 font-semibold">Local Vibe</div>
                </div>


                <div className="mt-auto flex items-center justify-between">
                  <a
                    className="text-xs font-medium text-green-400 hover:underline"
                    href={`https://www.google.com/maps/search/?api=1&query=Mbaise+${m.day}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on map
                  </a>
                  <span className="text-xs text-gray-500">Local hosts available</span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>


        {/* WHY FRIENDS LOUNGE — brand storytelling */}
        <section className="bg-white/5 border border-white/6 rounded-lg p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="mt-3 text-gray-300">
              Friends Lounge is Mbaise's pioneering luxury lounge — a gathering place rooted in Igbo warmth,
              where luxury and heritage are blended, creating a safe, vibrant hub where ideas, music, and friendships thrive.
            </p>


            <ul className="mt-4 grid gap-3 text-sm">
              <li className="flex gap-3 items-start">
                <span className="text-green-300">•</span>
                <div className="text-gray-300">Cultural showcases that feel modern.</div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-green-300">•</span>
                <div className="text-gray-300">Events that bring people back, again and again.</div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-green-300">•</span>
                <div className="text-gray-300">A safe, luxury-first experience with local roots.</div>
              </li>
            </ul>
          </div>


          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-black/30 to-black/10 p-4">
            <div className="aspect-[16/10] bg-black/40 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-2xl mb-2">🏛️</div>
                <div className="text-sm">Friends Lounge — Poolside nights & warm gatherings</div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA FOOTER */}
        <footer className="py-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h4 className="text-xl md:text-2xl font-semibold">Experience Mbaise — Start at Friends Lounge</h4>
            <p className="text-gray-300 mt-2">
              Book a curated visit, join a cultural night, or simply drop by for a sunset by the pool.
            </p>


            <div className="mt-6 flex items-center justify-center gap-3">
              <a href="/book" className="bg-emerald-400 text-black px-5 py-2 rounded-full font-semibold">
                Reserve Now
              </a>
              <a href="/contact" className="border border-white/10 px-5 py-2 rounded-full text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </footer>
      </div>


      {/* Scoped styles */}
      <style>{`
        @media (max-width: 768px) {
          
          main.mbaise-page h2,
          main.mbaise-page h3 {
            font-size: 1.15rem !important;
          }
        }
        .mbaise-page .glow {
          text-shadow: 0 8px 30px rgba(99, 102, 241, 0.12);
        }
      `}</style>
    </main>
  );
}
