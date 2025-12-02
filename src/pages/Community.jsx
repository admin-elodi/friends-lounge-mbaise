// src/pages/Community.jsx
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeartHandshake, Baby, GraduationCap, Church, Trees, CalendarDays } from "lucide-react";

export default function Community() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const [active, setActive] = useState(0);

  const communityImpact = [
    { icon: Baby, title: "Every Child Welcomed", desc: "Igo Mma Nwa, baptisms, naming ceremonies — all celebrated here." },
    { icon: GraduationCap, title: "Youth Empowered", desc: "Scholarships, skill workshops, and spaces to dream beyond the village." },
    { icon: Church, title: "Faith Strengthened", desc: "Harvest thanksgivings, crusades, weddings — sacred moments hosted with pride." },
    { icon: HeartHandshake, title: "Elders Honoured", desc: "Town union meetings, title ceremonies, August meetings — tradition lives here." },
    { icon: Trees, title: "Land Transformed", desc: "From quiet bush to the heartbeat that sparked Udo’s real estate revolution." },
  ];

  const mbaiseMarkets = [
    { day: "EKE", location: "Eke Nguru", lga: "Aboh Mbaise", note: "Largest in Mbaise" },
    { day: "ORIE", location: "Orie Uvuru", lga: "Aboh Mbaise" },
    { day: "AFO", location: "Afor Ogbe", lga: "Ahiazu Mbaise" },
    { day: "NKWO", location: "Nkwo Udo", lga: "Ezinihitte", highlight: true, note: "Home of Friends Lounge" },
    { day: "EKE", location: "Eke Isi-Mbaise", lga: "Ehime Mbano border" },
    { day: "ORIE", location: "Orie Amaimo", lga: "Ikedi Ohakim’s hometown" },
    { day: "AFO", location: "Afor Enyiogugu", lga: "Aboh Mbaise" },
    { day: "NKWO", location: "Nkwo Imo (Owerri)", lga: "Boundary market" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % communityImpact.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* HERO — SILENT POWER */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        <motion.div style={{ y: yBg, opacity: opacityBg }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
          <div className="absolute inset-0 bg-[url('@/assets/images/mbaise-market-day.jpg')] bg-cover bg-center opacity-15" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8 }}
            className="text-7xl md:text-9xl font-black text-white leading-none"
          >
            COMMUNITY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 text-2xl md:text-4xl font-light text-red-400 tracking-widest"
          >
            We do not live in Udo.<br />
            <span className="font-bold text-white">Udo lives in us.</span>
          </motion.p>
        </div>
      </section>

      {/* MBAISE MARKET DAYS — HONOURING THE CYCLE */}
      <section className="py-32 bg-black border-t border-b border-red-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white">The Four Market Days of Mbaise</h2>
            <p className="mt-6 text-xl text-gray-400">Our weeks. Our rhythm. Our blood.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["EKE", "ORIE", "AFO", "NKWO"].map((day, i) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className={`text-center p-10 rounded-3xl border ${
                  day === "NKWO" ? "bg-red-950/40 border-red-600" : "border-white/10"
                }`}
              >
                <div className="text-6xl md:text-8xl font-black text-red-600/20">{i + 1}</div>
                <h3 className="text-3xl md:text-4xl font-black text-white mt-4">{day}</h3>
                {day === "NKWO" && (
                  <p className="mt-4 text-sm text-red-400 font-bold">Udo’s Day</p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mbaiseMarkets.map((market, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl border ${
                  market.highlight
                    ? "bg-gradient-to-br from-red-900/30 to-black border-red-600 shadow-2xl shadow-red-900/20"
                    : "border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-white">{market.day}</span>
                  {market.highlight && <CalendarDays className="text-red-500" size={28} />}
                </div>
                <p className="mt-3 text-lg text-gray-300 font-medium">{market.location}</p>
                <p className="text-sm text-gray-500">{market.lga}</p>
                {market.note && <p className="mt-2 text-xs text-red-400 font-bold">{market.note}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY IMPACT CYCLE */}
      <section className="py-40 bg-gradient-to-b from-black to-red-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-black text-center text-white mb-20">
            This Is How We Serve Udo
          </h2>

          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              {communityImpact.map((item, i) => (
                <motion.div
                  key={i}
                  onClick={() => setActive(i)}
                  whileHover={{ x: 12 }}
                  className={`p-8 rounded-3xl cursor-pointer transition-all border ${
                    active === i
                      ? "bg-red-900/40 border-red-600 shadow-2xl"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <item.icon className={active === i ? "text-red-400" : "text-gray-600"} size={44} />
                  <h3 className="text-2xl font-bold text-white mt-5">{item.title}</h3>
                  <p className="mt-3 text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              key={active}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-left"
            >
              <div className="text-9xl font-black text-red-600/10 select-none">0{active + 1}</div>
              <h3 className="text-5xl md:text-6xl font-black text-white mt-10 leading-tight">
                {communityImpact[active].title}
              </h3>
              <p className="mt-8 text-2xl text-gray-300 max-w-xl">
                {communityImpact[active].desc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL DECLARATION */}
      <section className="py-44 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 via-transparent to-transparent" />
        <div className="relative z-10 text-center px-6">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-9xl font-black text-white leading-none"
          >
            Friends Lounge<br />
            <span className="text-red-500">Was Built By Udo</span><br />
            For Udo<br />
            Forever.
          </motion.h2>
          <p className="mt-16 text-2xl text-gray-500 tracking-widest">
            And one day, the world will come to learn from us.
          </p>
        </div>
      </section>
    </>
  );
}