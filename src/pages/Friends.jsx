// src/pages/Friends.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Soup,
  Camera,
} from "lucide-react";
import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";

import soupKitchenFlyer from "@/assets/images/soup-kitchen.webp";
import kolanutsImg from "@/assets/images/kolanuts.webp";
import crowdVideo from "@/assets/videos/soup.mp4";

import {
  getEditions,
  getSoupKitchenStatus,
  PARTNER_NAME,
  VENUE,
  SCHEDULE_LABEL,
  WEEKLY_REACH,
  ENQUIRY_WHATSAPP,
} from "@/data/soupKitchen";

const waLink = (text) =>
  `https://wa.me/${ENQUIRY_WHATSAPP}?text=${encodeURIComponent(text)}`;

export default function Friends() {
  const { nextEditionNumber } = getSoupKitchenStatus();
  const editions = getEditions();

  const nextDateLabel = editions[editions.length - 1].date.toLocaleDateString(
    "en-US",
    { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <main className="relative min-h-screen bg-black text-white font-montserrat overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <video
          src={crowdVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.45] saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-16 md:pb-20 text-center w-full">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-amber-300 text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold mb-4"
          >
            Making Friends &amp; Building Communities
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light font-serif tracking-tight"
          >
            This Is What <span className="italic text-amber-200">Friends</span> Looks Like
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-6 text-gray-300 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Every Saturday, our name stops being a name and becomes a
            promise — free food, open doors, and a seat at the table for
            anyone who needs one.
          </motion.p>
        </div>
      </section>

      {/* ================= SOUP KITCHEN SPOTLIGHT ================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Flyer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
              <img
                src={soupKitchenFlyer}
                alt="Soup Kitchen — free food for all, every Saturday, 2pm to 6pm, at Friends Lounge"
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-3 space-y-8"
          >
            <div className="flex items-center gap-3">
              <Soup className="text-amber-400" size={22} />
              <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-semibold">
                The Friends Lounge Soup Kitchen
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-light leading-snug">
              Free food for all, every single Saturday — no exceptions,
              no conditions.
            </h2>

            <p className="text-gray-400 leading-relaxed font-light">
              Run in partnership with{" "}
              <span className="text-white font-medium">{PARTNER_NAME}</span>,
              this is the one afternoon a week Friends Lounge opens its
              doors purely to feed the neighbourhood — {WEEKLY_REACH.toLowerCase()}.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                <Clock className="text-amber-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-semibold text-white">Every Saturday</p>
                  <p className="text-xs text-gray-400">{SCHEDULE_LABEL.replace("Every Saturday, ", "")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                <MapPin className="text-amber-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-semibold text-white">Venue</p>
                  <p className="text-xs text-gray-400">{VENUE}</p>
                </div>
              </div>
            </div>

            {/* Next edition callout */}
            <div className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-900/30 to-black/40 p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300 font-semibold mb-2">
                Coming Up Next
              </p>
              <div className="flex items-center gap-3">
                <Calendar className="text-amber-300" size={24} />
                <div>
                  <p className="text-lg md:text-xl font-semibold text-white">
                    Edition #{nextEditionNumber} &middot; {nextDateLabel}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {editions.length - 1} Saturdays served so far — this is the next one.
                  </p>
                </div>
              </div>
            </div>

            <a
              href={waLink("Hello, I would like to support the Soup Kitchen Initiative...")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm uppercase tracking-widest rounded-full transition-all"
            >
              <FaWhatsapp size={18} />
              Support or Volunteer
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= THE ARCHIVE TIMELINE ================= */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-amber-400 text-[10px] uppercase tracking-[0.3em] font-semibold mb-3">
            The Archive
          </p>
          <h2 className="text-2xl md:text-3xl font-light">
            {editions.length} Saturdays. One Table.
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto font-light text-sm md:text-base">
            Every edition, numbered and dated, from the very first Saturday
            to the one still ahead.
          </p>
        </motion.div>

        {/* Horizontal-scroll timeline on mobile, wrapped grid on desktop */}
        <div className="flex md:flex-wrap gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 md:justify-center snap-x snap-mandatory md:snap-none">
          {editions.map((ed) => (
            <motion.div
              key={ed.number}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (ed.number % 10) * 0.03 }}
              className={`shrink-0 snap-start w-[132px] md:w-[140px] rounded-xl border p-4 text-center transition-colors ${
                ed.isUpcoming
                  ? "border-amber-400/70 bg-amber-500/10 shadow-lg shadow-amber-500/10"
                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
              }`}
            >
              <p
                className={`text-2xl font-black ${
                  ed.isUpcoming ? "text-amber-300" : "text-white/80"
                }`}
              >
                #{ed.number}
              </p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">
                {ed.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
              {ed.isUpcoming && (
                <p className="text-[9px] text-amber-300 font-semibold uppercase tracking-widest mt-2">
                  This Saturday
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Photo wall invite */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 border border-white/10 rounded-2xl p-8"
        >
          <div className="flex items-center gap-4">
            <Camera className="text-amber-400 shrink-0" size={28} />
            <div>
              <p className="text-white font-semibold">Were you at one of the Saturdays?</p>
              <p className="text-gray-400 text-sm mt-1">
                Tag us and your photo could be added to this archive.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/friends_lounge_udo/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 transition-all"
              aria-label="Friends Lounge on Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://www.tiktok.com/@friends.lounge6"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 hover:bg-black transition-all"
              aria-label="Friends Lounge on TikTok"
            >
              <FaTiktok size={18} />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ================= THE NAME ITSELF ================= */}
      <section className="relative z-10 bg-white text-black overflow-hidden border-t-8 border-amber-500">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-2xl md:text-3xl font-semibold uppercase tracking-tighter italic leading-tight">
                It's Not Just A Name On The Signboard.
              </h2>

              <div className="space-y-5 text-gray-700 font-light leading-relaxed">
                <p>
                  Long before it was a lounge, Igbo hospitality had already
                  settled this: <span className="italic">"Onye wetara ọji wetara ndụ"</span> —
                  he who brings kola brings life. A kola nut broken and shared
                  is the oldest way this culture says <em>welcome</em>, and
                  <em> stranger</em> and <em>friend</em> were never meant to
                  stay separate for long.
                </p>
                <p>
                  That's the same instinct that opens our gate every Saturday
                  afternoon — not a marketing idea, just the name catching up
                  with what this place has always tried to be.
                </p>
              </div>

              <ul className="space-y-3 pt-2">
                {[
                  "A soup kitchen that asks nothing in return, every Saturday.",
                  "A bar where every seat starts as a stranger's and ends as a friend's.",
                  "A community that grows one Saturday at a time.",
                ].map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
                    <span className="text-gray-800 font-medium">{line}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={kolanutsImg}
                  alt="Kola nuts in a bowl — the traditional Igbo symbol of welcome and friendship"
                  className="w-full h-[420px] md:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 right-5 text-white text-xs uppercase tracking-[0.25em] font-semibold">
                  Kola Nut &middot; The First Word For "Welcome"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}