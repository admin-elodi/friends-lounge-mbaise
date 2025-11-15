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

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight * 0.01);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleManualSlide = (direction) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        direction === "next"
          ? (prev + 1) % slides.length
          : (prev - 1 + slides.length) % slides.length
      );
      setNextIndex((prev) =>
        direction === "next"
          ? (prev + 1) % slides.length
          : (prev - 1 + slides.length) % slides.length
      );
      setIsFading(false);
    }, 400);
  };

  useEffect(() => {
    let fadeTimeout;
    let interval;

    const advanceSlide = () => {
      setIsFading(true);

      fadeTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setNextIndex((prev) => ((prev + 1) % slides.length));
        setIsFading(false);
      }, 1000);
    };

    interval = setInterval(() => {
      advanceSlide();
    }, 12000);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, [slides.length]);

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[nextIndex];

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
          onEnded={() => ref?.current?.play()}
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
      className="relative w-full overflow-hidden border-b border-black"  // Removed mt-60 to eliminate gap
      style={{ height: `calc(${vh * 100}px)` }}
    >
      <div className="absolute inset-0">
        {renderMedia(
          currentSlide,
          videoRef1,
          isFading
            ? "opacity-0 transition-opacity duration-1000"
            : "opacity-100 transition-opacity duration-1000"
        )}
        {renderMedia(
          nextSlide,
          videoRef2,
          isFading
            ? "opacity-100 transition-opacity duration-1000"
            : "opacity-0 transition-opacity duration-1000"
        )}
      </div>

      {/* ⚡ Removed dark tint overlay here */}

      <div className="absolute inset-0 flex items-center justify-center text-center z-20 transition-opacity duration-1000">
        <h1
          className={`text-2xl md:text-5xl font-bold text-white drop-shadow-lg ${
            isFading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-1000`}
        >
          {currentSlide.text}
        </h1>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-30">
        <button
          onClick={() => handleManualSlide("prev")}
          className="bg-white/10 hover:bg-red-600/80 text-white rounded-full p-3 md:p-4 shadow-md transition-all duration-300 border border-white/30 hover:border-red-500"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleManualSlide("next")}
          className="bg-white/10 hover:bg-red-600/80 text-white rounded-full p-3 md:p-4 shadow-md transition-all duration-300 border border-white/30 hover:border-red-500"
        >
          <ChevronRight size={24} />
        </button>
      </div>

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