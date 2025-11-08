import React, { useRef, useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

import friendsBar from "@/assets/videos/friends-bar.mp4";
import bar from "@/assets/images/bar.webp";
import fullHouse from "@/assets/videos/full-house.mp4";
import chief from "@/assets/images/chiefs.jpg";
import staff from "@/assets/images/friends-staff.jpg";
import grill from "@/assets/videos/grill.mp4";
import pool from "@/assets/images/pool-side.jpg";
import abiIgbo from "@/assets/images/abi-igbo.jpg";
import chips from "@/assets/images/chips.jpg";
import arrivals from "@/assets/videos/arrivals.mp4";
import friends from "@/assets/images/friends.jpg";
import occassion from "@/assets/videos/occassion.mp4";
import nkwobi from "@/assets/videos/nkwobi1.mp4";
import music from "@/assets/videos/music.mp4";

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [vh, setVh] = useState(window.innerHeight * 0.01);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFading, setIsFading] = useState(false);

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  const slides = [
    { type: "video", src: friendsBar, text: "Our Brand New Bar" },
    { type: "image", src: bar, text: "Our First Bar" },
    { type: "video", src: fullHouse, text: "Friends House in Session" },
    { type: "image", src: chief, text: "VIP Selfie" },
    { type: "image", src: staff, text: "Friends Lounge Chefs" },
    { type: "video", src: grill, text: "Grilled Delicacies" },
    { type: "image", src: pool, text: "Ambient Poolside" },
    { type: "image", src: abiIgbo, text: "Abi Igbo Support!" },
    { type: "image", src: chips, text: "Declicious Fish & Chips" },
    { type: "video", src: arrivals, text: "Titled Men Don Land" },
    { type: "image", src: friends, text: "Friends and Brothers" },
    { type: "video", src: occassion, text: "Friends and Brothers" },
    { type: "video", src: nkwobi, text: "Tasty Nkwobi" },
    { type: "video", src: music, text: "Live Music Vibes" },
  ];

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Handle viewport height for mobile
  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight * 0.01);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Crossfade logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setNextIndex((prev) => (prev + 1) % slides.length);
        setIsFading(false);
      }, 1200); // fade duration
    }, 10000); // show each slide 10s

    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[nextIndex];

  // Helper to render media (video or image)
  const renderMedia = (slide, ref, extraClasses = "") => {
    if (slide.type === "video") {
      return (
        <video
          ref={ref}
          key={slide.src}
          className={`absolute top-0 left-0 w-full h-full object-cover ${extraClasses}`}
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
        key={slide.src}
        src={slide.src}
        alt="Friends Lounge Slide"
        className={`absolute top-0 left-0 w-full h-full object-cover ${extraClasses}`}
        loading="eager"
      />
    );
  };

  return (
    <section
      className="relative w-full overflow-hidden border-b border-black"
      style={{ height: `calc(${vh * 100}px)` }}
    >
      {/* Two overlapping layers for smooth crossfade */}
      <div className="absolute inset-0">
        {renderMedia(currentSlide, videoRef1, isFading ? "opacity-0 transition-opacity duration-1000" : "opacity-100 transition-opacity duration-1000")}
        {renderMedia(nextSlide, videoRef2, isFading ? "opacity-100 transition-opacity duration-1000" : "opacity-0 transition-opacity duration-1000")}
      </div>

      {/* Overlay tint */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Centered Text (fades with same timing) */}
      <div className="absolute inset-0 flex items-center justify-center text-center z-20 transition-opacity duration-1000">
        <h1
          className={`text-4xl md:text-6xl font-bold text-white ${
            isFading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-1000`}
        >
          {currentSlide.text}
        </h1>
      </div>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-30 bg-white/20 backdrop-blur-md text-white
        rounded-full p-3 shadow-lg hover:bg-white/30 transition-all duration-300"
      >
        {isMuted ? <VolumeX size={26} /> : <Volume2 size={26} />}
      </button>
    </section>
  );
};

export default Hero;
