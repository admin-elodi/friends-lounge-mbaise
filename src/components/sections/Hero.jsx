import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import grill from "@/assets/videos/grill.webm";
import chiefs from "@/assets/images/chiefs.webp";
import fullHouse from "@/assets/videos/full-house.webm";
import goodFood from "@/assets/images/chips.webp";
import occassion from "@/assets/videos/occassion.webm";
import bar from "@/assets/images/bar.webp";

// How long (ms) each slide holds before auto-advancing. Manual arrows/dots
// still work at any time and don't fight the auto-advance — clicking one
// just changes the current slide, the interval keeps ticking from there.
const SLIDE_DURATION = 7000;

// Alternating video / picture, six slides.
const slides = [
  { type: "video", src: grill, poster: bar, caption: "Chill & Grill" },
  { type: "image", src: chiefs, caption: "Chief Santome & Guests" },
  { type: "video", src: fullHouse, poster: bar, caption: "Friends Lounge In Session" },
  { type: "image", src: goodFood, caption: "Good Food" },
  { type: "video", src: occassion, poster: bar, caption: "Good Times" },
  { type: "image", src: bar, caption: "Premium Bar" },
];

const Hero = () => {
  const [vh, setVh] = useState(window.innerHeight * 0.01);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight * 0.01);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-advance, paused for reduced-motion users — manual controls below
  // still work either way.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () =>
    setCurrentIndex((prev) => (prev + 1) % slides.length);

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative w-full overflow-hidden z-0 isolate bg-black"
      style={{ height: `calc(${vh * 100}px)` }}
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0">
        {currentSlide.type === "video" ? (
          <video
            key={currentSlide.src}
            className="absolute inset-0 w-full h-full object-cover"
            src={currentSlide.src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={currentSlide.poster}
          />
        ) : (
          <img
            key={currentSlide.src}
            src={currentSlide.src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ================= CAPTION ================= */}
      <div className="absolute inset-x-0 top-14 md:top-20 z-10 flex justify-center px-6">
        <h1 className="text-white text-2xl md:text-4xl font-bold text-center drop-shadow-lg">
          {currentSlide.caption}
        </h1>
      </div>

      {/* ================= SLIDESHOW CONTROLS — arrows flanking dots, bottom-center ================= */}
      <div className="absolute bottom-7 inset-x-0 z-10 flex items-center justify-center gap-4">
        <button
          onClick={goToPrev}
          aria-label="Previous slide"
          className="p-2 md:p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-6 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          aria-label="Next slide"
          className="p-2 md:p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default Hero;