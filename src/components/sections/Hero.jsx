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
    { type: "video", src: grill, text: "Fresh off the Fire" },
    { type: "video", src: visitor, text: "A First Time Visitor" },
    { type: "image", src: abiIgbo, text: "Abi Igbo Family" },
    { type: "image", src: chips, text: "Fish & Chips Done Right" },
    { type: "video", src: occassion, text: "Good Times at The Lounge" },
    { type: "video", src: music, text: "Live Beats, Real Energy" },
    { type: "image", src: sunset, text: "Sunset in Mbaise" },
  ];

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight * 0.01);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const changeSlide = (direction) => {
    setIsFading(true);

    setTimeout(() => {
      setCurrentIndex(prev =>
        direction === "next"
          ? (prev + 1) % slides.length
          : (prev - 1 + slides.length) % slides.length
      );

      setNextIndex(prev =>
        direction === "next"
          ? (prev + 1) % slides.length
          : (prev - 1 + slides.length) % slides.length
      );

      setIsFading(false);
    }, 600);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide("next");
    }, 7500); // shorter, sweeter timing

    return () => clearInterval(interval);
  }, []);

  const renderMedia = (slide, ref, extra = "") => {
    if (slide.type === "video") {
      return (
        <video
          ref={ref}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${extra}`}
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
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${extra}`}
        loading="eager"
      />
    );
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: `calc(${vh * 100}px)` }}
    >
      {/* MEDIA */}
      <div className="absolute inset-0">
        {renderMedia(
          slides[currentIndex],
          videoRef1,
          isFading ? "opacity-0" : "opacity-100"
        )}

        {renderMedia(
          slides[nextIndex],
          videoRef2,
          isFading ? "opacity-100" : "opacity-0"
        )}

        {/* cinematic scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* CAPTION */}
      <div className="absolute inset-0 flex items-end justify-center pb-20 pointer-events-none">
        <p
          className={`text-sm md:text-xl font-medium text-white tracking-wide transition-all duration-700 ease-out
          ${
            isFading
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
          style={{
            textShadow: "0 3px 15px rgba(0,0,0,0.8)",
            letterSpacing: "0.08em",
          }}
        >
          {slides[currentIndex].text}
        </p>
      </div>

      {/* CONTROLS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-14">
        <button
          onClick={() => changeSlide("prev")}
          className="p-4 bg-black/40 backdrop-blur-md rounded-full hover:bg-red-600/70 transition"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        <button
          onClick={() => changeSlide("next")}
          className="p-4 bg-black/40 backdrop-blur-md rounded-full hover:bg-red-600/70 transition"
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>

      {/* MUTE */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 p-4 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </section>
  );
};

export default Hero;
