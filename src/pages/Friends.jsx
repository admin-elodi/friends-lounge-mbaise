// src/pages/Friends.jsx
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Volume2, VolumeX, ShieldCheck, Award, Star, Rocket, Users, TrendingUp, Mail } from "lucide-react";

import islandVideo from "@/assets/videos/island.mp4";
import inductionImage from "@/assets/images/induction.jpeg";
import ikengaBg from "@/assets/images/material.jpg"; 

export default function Friends() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const recognitions = [
    {
      name: "IKENGA 1 OF UDO",
      title: "Chief Sir Barrister Santome Ibeneche (Zereuwa)",
      description:
        "In a recent historic event, Chief Sir Barrister Santome Ibeneche was conferred with the prestigious traditional title of Ikenga 1 of Udo. This recognizes his outstanding contributions to Udo community, his commitment to peace, and his role as a beacon of leadership in Mbaise land.",
      placeholder: "Ceremony media coming soon",
      icon: <Award className="text-amber-500" size={24} />,
    },
    {
      name: "ISLAND ALL STARS SPORTS CLUB INDUCTEE",
      title: "Chief Sir Barrister Santome Ibeneche",
      description:
        "This first edition of Friendly Recognitions celebrates the induction of Chief Sir Santome Ibeneche into the prestigious Island All Star Sports Club, marking a new chapter of fellowship and athletic excellence.",
      video: islandVideo,
      image: inductionImage,
      icon: <ShieldCheck className="text-red-500" size={24} />,
    },
    {
      name: "FUTURE HONOREES",
      title: "Excellence in View",
      description:
        "This section is proposed for featuring distinguished friends of Udo Autonomous Community and beyond who have achieved one important recognition/award or the other. For details on how to get recognized, please contact Chief Santome himself",
      icon: <Star className="text-gray-400" size={24} />,
    },
  ];

  return (
    <main 
      className="relative min-h-screen font-montserrat text-white overflow-x-hidden bg-black"
      style={{
        backgroundImage: `url(${ikengaBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Precision Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/60 to-black/95 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto py-20 md:py-32 space-y-24 md:space-y-40">

        {/* ================= MINIMALIST INTRO SECTION ================= */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center px-6 space-y-8"
        >
        
          
          <h1 className="text-lg md:text-3xl font-light tracking-tight leading-none">
            Honouring Friends of Udo
          </h1>

          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-amber-200 text-[9px] md:text-xl font-medium italic opacity-90">
              “Mmadu ka aku” — People are the true wealth.
            </p>
         
          </div>
        </motion.section>

        {/* ================= RECOGNITIONS GRID ================= */}
        <div className="space-y-12 md:space-y-32">
          {recognitions.map((item, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-neutral-950/80 backdrop-blur-xl border-y md:border border-white/10 overflow-hidden md:rounded-sm shadow-2xl"
            >
              {item.video ? (
                <div className="relative h-[400px] md:h-[550px] overflow-hidden">
                  <video
                    ref={index === 1 ? videoRef : null}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-1000"
                    src={item.video}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40" />
                  
                  <button
                    onClick={toggleMute}
                    className="absolute bottom-6 right-6 z-30 p-4 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-red-600 transition-all"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                       <div className="mb-4">{item.icon}</div>
                       <h3 className="text-[14px] md:text-2xl font-semibold uppercase tracking-tighter truncate w-full max-w-[95vw]">
                        {item.name}
                       </h3>
                       <p className="text-amber-200 font-bold tracking-[0.3em] text-[10px] uppercase mt-2">{item.title}</p>
                  </div>
                </div>
              ) : item.placeholder ? (
                <div className="relative h-48 md:h-64 flex flex-col items-center justify-center bg-red-950/10 border-b border-white/5">
                   <div className="opacity-50">{item.icon}</div>
                   <p className="mt-4 text-white/30 uppercase tracking-[0.4em] text-[10px] font-bold">{item.placeholder}</p>
                </div>
              ) : null}

              {item.image && (
                <div className="md:p-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[450px] md:h-[700px] object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              )}

              <div className="p-8 md:p-16 max-w-4xl mx-auto space-y-6">
                 <div className="flex items-center gap-6">
                   <h3 className="text-[10px] md:text-xl text-amber-200 uppercase tracking-widest whitespace-nowrap">
                    {item.name}
                  </h3>
                   <div className="h-px flex-1 bg-white/10" />
                 </div>
                <p className="text-gray-300 leading-relaxed text-justify text-base md:text-lg font-light">
                  {item.description}
                </p>
              </div>
            </motion.section>
          ))}
        </div>

        {/* ================= THE AFRICANFUTURIST SPARK / SILICON VILLAGE ================= */}
        <section className="relative bg-white text-black md:rounded-none overflow-hidden border-t-8 border-red-600">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 space-y-20">
            
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-tighter leading-none italic">
                The Friends' <span className="text-red-600">Lounge Genesis.</span>
              </h2>
              <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-xs">
                From Social Infrastructure to Tech Revolution
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-stretch">
              
              {/* Left Column: The Spark & Roadmap */}
              <div className="flex-1 flex flex-col justify-between space-y-12">
                <div className="space-y-6">
                  <h3 className="text-xl font-black uppercase tracking-widest text-red-600">The Spark</h3>
                  <p className="text-lg md:text-xl text-justify font-light leading-relaxed">
                    The story did not begin with a lounge; it began with a road. 
                    <strong> Chief Sir Barrister Santome Ibeneche (Zereuwa)</strong> single-handedly began construction of a landmark road project leading to 
                    previously unexplored parts of Udo Autonomous Community. The transformative impact of this road that became 
                    <span className="text-red-600 font-bold"> Donameche Crescent</span> is only getting started. Several residential 
                    buildings have already sprung up along Donameche Crescent with Friends’ Lounge Mbaise becoming the "Social Soil"— 
                    that sparked the whole process. Having already inspired these projects, a shift is now happening towards 
                    business operations including JungleX which seeks to be one of the first tech establishments to have its headquarters
                    in Udo. As the world's first Africanfuturist social media platform, JungleX proposes a deliberate architectural layout 
                    for the entire area around and after Friends' Lounge that will place Friends Lounge Mbaise as a conceptual & cultural lighthouse 
                    for all subsequent businesses to be set up in the area (see Silicon Village concept below).
                  </p>
                </div>

                {/* ROADMAP SECTION FOR INVESTORS */}
                <div className="p-8 border border-neutral-200 bg-neutral-50 space-y-6">
                   <h4 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2">
                     <TrendingUp size={16} className="text-red-600" /> 6-Month Alpha Roadmap
                   </h4>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white border border-neutral-100">
                        <span className="block text-2xl font-black text-red-600">100</span>
                        <span className="text-[10px] font-bold uppercase text-gray-400">Initial Core Users</span>
                      </div>
                      <div className="p-4 bg-white border border-neutral-100">
                        <span className="block text-2xl font-black text-red-600">1000</span>
                        <span className="text-[10px] font-bold uppercase text-gray-400">Scale Milestone</span>
                      </div>
                   </div>
                   <p className="text-sm text-gray-600 italic text-justify">JungleX dreams of being the first tech company with headquarters in Udo that will lead to the rise of other
                    tech companies also with their headquarters in Udo. Thereby giving rise to Silicon Village.</p>
                </div>
              </div>

              {/* Right Column: Silicon Village Pioneer */}
              <div className="flex-1 relative p-8 md:p-12 bg-neutral-950 text-white flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-16 h-16 bg-red-600 flex items-center justify-center">
                  <Rocket className="-rotate-45" color="white" />
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Silicon Village, Udo</h3>
                    <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em]">Global HQ Pioneer</p>
                  </div>

                  <div className="space-y-6">
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light italic text-justify">
                      "JungleX is positioning to be one of the pioneer tech firms of Silicon Village, Udo, Ezinihitte Mbaise. 
                      About 40 years from now, an entire ecosystem of tech firms will call Udo home. And they will all remember 
                      that Friends' Lounge sparked the fire." This Africanfuturist blueprint envisions Silicon Village not just 
                      as a location, but as an integrated tech-tourism ecosystem. By utilizing Friends' Lounge as the cultural 
                      lighthouse, the layout ensures that innovation remains anchored in community. JungleX is currently 
                      scaling toward its first 1000 users to validate this pioneering model of decentralized, 
                      rural-based global tech headquarters.
                    
                    </p>
                  </div>
                </div>

                {/* INVESTOR INTEREST TRIGGER - Filled the vertical gap */}
                <div className="flex-grow flex flex-col justify-center py-10">
                  <a 
                    href="mailto:invest@junglex.com?subject=Investor Interest: Silicon Village Udo / JungleX"
                    className="group border border-white/10 p-6 hover:bg-white/5 transition-all flex items-center gap-6"
                  >
                    <div className="bg-red-600/20 p-4 rounded-full group-hover:bg-red-600 transition-colors">
                      <Mail size={24} className="text-red-600 group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="text-[7px] font-black uppercase tracking-[0.3em] text-red-600">Angel Investment</h4>
                      <p className="text-[10px] text-gray-400 mt-1">Request the JungleX Pitch Deck & Alpha Roadmap.</p>
                    </div>
                  </a>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => window.open("https://jungle-x-social-media.netlify.app/", "_blank")}
                    className="group w-full flex items-center justify-between px-6 py-5 border border-white/20 hover:bg-red-600 hover:border-red-600 transition-all"
                  >
                    <span className="text-amber-200 tracking-widest text-xs">Explore JungleX Concept</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
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