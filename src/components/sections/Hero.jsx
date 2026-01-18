import React, { useRef, useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";

import fullHouse from "@/assets/videos/full-house.webm";
import chief from "@/assets/images/chiefs.webp";
import occassion from "@/assets/videos/occassion.webm";
import staff from "@/assets/images/friends-bar.webp";

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [vh, setVh] = useState(window.innerHeight * 0.01);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const videoRef = useRef(null);

  const slides = [
    {
      type: "video",
      src: fullHouse,
      text: "Friends' Lounge in Session",
      poster: staff, // fallback image while loading
    },
    {
      type: "image",
      src: chief,
      text: "Chief Santome & Guests",
    },
    {
      type: "video",
      src: occassion,
      text: "Good Times at the Lounge",
      poster: staff,
    },
    {
      type: "image",
      src: staff,
      text: "Brand new Friends Bar",
    },
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

  const changeSlide = (direction) => {
    setIsFading(true);

    setTimeout(() => {
      setCurrentIndex((prev) =>
        direction === "next"
          ? (prev + 1) % slides.length
          : (prev - 1 + slides.length) % slides.length
      );
      setIsFading(false);
    }, 600);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      changeSlide("next");
    }, 8000); // Balanced timing

    return () => clearInterval(interval);
  }, [isPaused]);

  // Preload next video if applicable
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    const nextSlide = slides[nextIndex];

    if (nextSlide.type === "video") {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = nextSlide.src;
      link.type = "video/webm";
      document.head.appendChild(link);

      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [currentIndex]);

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: `calc(${vh * 100}px)` }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
    >
      {/* MEDIA CONTAINER */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ willChange: "opacity, transform" }}
      >
        {currentSlide.type === "video" ? (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
            src={currentSlide.src}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            poster={currentSlide.poster}
          />
        ) : (
          <img
            src={currentSlide.src}
            alt={currentSlide.text}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            loading="eager"
          />
        )}

        {/* Cinematic scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </div>

      {/* CAPTION - Moved to TOP */}
      <div className="absolute inset-x-0 top-8 md:top-12 z-10 flex justify-center pointer-events-none">
        <p
          className={`text-base md:text-2xl lg:text-3xl font-semibold text-white tracking-wider text-center px-6
            transition-all duration-700 ease-out ${
              isFading ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
            }`}
          style={{
            textShadow: "0 4px 20px rgba(0,0,0,0.9)",
            maxWidth: "90%",
          }}
        >
          {currentSlide.text}
        </p>
      </div>

      {/* CONTROLS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-12 md:gap-16 z-20">
        <button
          onClick={() => changeSlide("prev")}
          className="p-4 bg-black/50 backdrop-blur-md rounded-full hover:bg-red-600/70 transition"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        <button
          onClick={() => changeSlide("next")}
          className="p-4 bg-black/50 backdrop-blur-md rounded-full hover:bg-red-600/70 transition"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>

      {/* MUTE BUTTON */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 p-4 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition z-20"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </section>
  );
};

export default Hero;