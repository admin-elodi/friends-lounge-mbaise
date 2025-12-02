// src/pages/Projects.jsx
import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, HeartHandshake, Pickaxe, School, Church, Trees, ChevronDown } from "lucide-react";

export default function Projects() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  const [selected, setSelected] = useState(null);

  const projects = [
    {
      title: "Udo–Amuzi Road Reconstruction",
      status: "Started by one man. Now 6km done.",
      desc: "He bought the grader himself. Paid the workers himself. Then the community saw it and joined.",
      target: "12 km total • ₦280M needed",
      icon: Pickaxe,
      color: "from-red-900/40 to-black",
      active: true,
    },
    {
      title: "Community Secondary School Block",
      status: "Roofing stage • Self-funded so far",
      desc: "Because no child of Udo should trek to another village for JAMB classes.",
      target: "6 classrooms + labs • ₦120M",
      icon: School,
      color: "from-yellow-900/30 to-black",
    },
    {
      title: "St. Michael’s Catholic Church Renovation",
      status: "Foundation laid • Personal seed fund",
      desc: "A house of God that matches the faith of the people who built it.",
      target: "Full rebuild • ₦180M",
      icon: Church,
      color: "from-blue-900/30 to-black",
    },
    {
      title: "Udo Palm Reforestation Project",
      status: "10,000 palms planted • 2023–2025",
      desc: "Because the palm tree is our coat of arms. And we will never let it die.",
      target: "50,000 palms • Ongoing",
      icon: Trees,
      color: "from-green-900/40 to-black",
    },
  ];

  return (
    <>
      {/* HERO — ONE MAN STARTS. UDO FINISHES. */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
          <div className="absolute inset-0 bg-[url('@/assets/images/udo-road-project.jpg')] bg-cover bg-center opacity-20" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6 }}
            className="text-7xl md:text-9xl font-black text-white leading-none"
          >
            PROJECTS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 text-2xl md:text-4xl font-light text-red-400 tracking-widest"
          >
            One man starts.<br />
            <span className="font-black text-white">Udo finishes.</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-32"
          >
            <ChevronDown className="mx-auto animate-bounce text-red-600" size={56} />
          </motion.div>
        </div>
      </section>

      {/* CORE PHILOSOPHY — MINIMAL & PROFOUND */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-light text-gray-300 leading-relaxed"
          >
            He never waits for government.<br />
            <span className="text-red-500 font-black">He just starts.</span><br />
            And somehow, the rest of us always find a way to join.
          </motion.p>
        </div>
      </section>

      {/* ACTIVE PROJECTS GRID — INTERACTIVE */}
      <section className="py-40 bg-gradient-to-b from-black to-red-950/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                onClick={() => setSelected(i)}
                className="group cursor-pointer"
              >
                <div
                  className={`relative h-full p-10 rounded-3xl border-2 transition-all duration-700 overflow-hidden
                    ${selected === i ? "border-red-600 shadow-2xl shadow-red-900/30" : "border-white/10"}
                    bg-gradient-to-br ${project.color}`}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />
                  
                  <div className="relative z-10">
                    <project.icon
                      className={`mb-6 ${selected === i ? "text-red-400" : "text-gray-500"}`}
                      size={48}
                    />
                    <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                      {project.title}
                    </h3>
                    <p className="mt-6 text-xl text-red-400 font-bold">{project.status}</p>
                    <p className="mt-4 text-lg text-gray-300 leading-relaxed">{project.desc}</p>
                    <p className="mt-8 text-sm text-gray-500 uppercase tracking-wider">{project.target}</p>

                    <motion.div
                      className="mt-10 flex items-center gap-3 text-red-500 font-bold"
                      whileHover={{ x: 10 }}
                    >
                      <span>Join This One</span>
                      <ArrowRight size={28} />
                    </motion.div>

                    {project.active && (
                      <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold animate-pulse">
                        ACTIVE NOW
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION — UNAPOLOGETIC */}
      <section className="py-44 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/70 via-transparent to-transparent" />
        <div className="relative z-10 text-center px-6">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-9xl font-black text-white leading-none"
          >
            Your Name<br />
            <span className="text-red-500">Can Be Next</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <p className="text-2xl md:text-4xl text-gray-400 font-light leading-relaxed">
              He doesn’t ask for permission.<br />
              He doesn’t wait for meetings.<br />
              <span className="text-red-500 font-black">
                He just starts — and Udo follows.
              </span>
            </p>

            <motion.a
              href="https://wa.me/2347066064379"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 mt-16 px-12 py-6 bg-red-600 hover:bg-red-500 rounded-full font-black text-xl tracking-wider shadow-2xl"
            >
              <HeartHandshake size={32} />
              Start Yours • Continue His
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}