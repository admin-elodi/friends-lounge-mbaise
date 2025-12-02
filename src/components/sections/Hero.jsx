// src/components/sections/Hero.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";

import friendsBar from "@/assets/videos/friends-bar.webm";
import bar from "@/assets/images/bar.webp";
import fullHouse from "@/assets/videos/full-house.webm";
import chief from "@/assets/images/chiefs.webp";
import staff from "@/assets/images/friends-staff.webp";
import grill from "@/assets/videos/grill.webm";
import visitor from "@/assets/videos/smiles.mp4";
import abiIgbo from "@/assets/images/abi-igbo.webp";
import chips from "@/assets/images/chips.webp";
import occassion from "@/assets/videos/occassion.webm";
import music from "@/assets/videos/music.webm";
import sunset from "@/assets/images/boat.jpg";

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [vh, setVh] = useState(window.innerHeight * 0.01);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFading, setIsFading] = useState(false);

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  const slides = [
    { type: "video", src: friendsBar, text: "The Brand New Friends' Bar" },
    { type: "image", src: bar, text: "The Original Friends' Bar" },
    { type: "video", src: fullHouse, text: "Friends' Lounge in Session" },
    { type: "image", src: chief, text: "Chief Santome & Guest" },
    { type: "image", src: staff, text: "Friends' Kitchen Crew" },
    { type: "video", src: grill, text: "Fresh off the Fire!" },
    { type: "video", src: visitor, text: "A First time visitor" },
    { type: "image", src: abiIgbo, text: "Abi Igbo Family in the House" },
    { type: "image", src: chips, text: "Fish & Chips Done Right" },
    { type: "video", src: occassion, text: "Good Times at The Lounge" },
    { type: "video", src: music, text: "Live Beats, Real Energy" },
    { type: "image", src: sunset, text: "Sunset in Mbaise" },
  ];

  const toggleMute = useCallback(() => setIsMuted(prev => !prev), []);

  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight * 0.01);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleManualSlide = (direction) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(prev => direction === "next"
        ? (prev + 1) % slides.length
        : (prev - 1 + slides.length) % slides.length
      );
      setNextIndex(prev => direction === "next"
        ? (prev + 1) % slides.length
        : (prev - 1 + slides.length) % slides.length
      );
      setIsFading(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleManualSlide("next");
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[nextIndex];

  const renderMedia = (slide, ref, extra = "") => {
    if (slide.type === "video") {
      return (
        <video
          ref={ref}
          className={`absolute inset-0 w-full h-full object-cover ${extra}`}
          src={slide.src}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
        />
      );
    }
    return (
      <img
        src={slide.src}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover ${extra}`}
        loading="eager"
      />
    );
  };

  return (
    <section
      className="relative w-full overflow-hidden border-4 border-white rounded-xl"
      style={{ height: `calc(${vh * 100}px)` }}
    >
      {/* Media layers – no dark overlay, pure cinema */}
      <div className="absolute inset-0">
        {renderMedia(currentSlide, videoRef1, isFading ? "opacity-0" : "opacity-100")}
        {renderMedia(nextSlide, videoRef2, isFading ? "opacity-100" : "opacity-0")}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isFading ? "opacity-100" : "opacity-0"}`} />
      </div>

      {/* Caption – now floating with generous breathing room */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-8">
        <h1
          className={`text-2xl md:text-6xl lg:text-5xl font-black text-white tracking-wider text-center drop-shadow-2xl transition-all duration-1000 ${
            isFading ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
          }`}
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.7)" }}
        >
          {currentSlide.text}
        </h1>
      </div>

      {/* Navigation arrows – elegantly spaced from edges */}
      <div className="absolute bottom-2 md:bottom-2 left-1/2 -translate-x-1/2 flex gap-8 md:gap-32">
        <button
          onClick={() => handleManualSlide("prev")}
          className="group p-4 bg-white/10 backdrop-blur-md rounded-full border-2 border-black hover:bg-red-600/70 transition-all duration-300"
        >
          <ChevronLeft size={20} className="text-white group-hover:scale-110 transition" />
        </button>
        <button
          onClick={() => handleManualSlide("next")}
          className="group p-4 bg-white/10 backdrop-blur-md rounded-full border-2 border-black hover:bg-red-600/70 transition-all duration-300"
        >
          <ChevronRight size={20} className="text-white group-hover:scale-110 transition" />
        </button>
      </div>

      {/* Mute toggle – discreet luxury */}
      <button
        onClick={toggleMute}
        className="absolute bottom-2 md:bottom-2 right-4 md:right-12 p-5 bg-white/10 backdrop-blur-md rounded-full border border-red-600 hover:bg-white/20 transition-all duration-300"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </section>
  );
};

export default Hero;