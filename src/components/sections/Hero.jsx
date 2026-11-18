import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import foodies from "@/assets/images/foodies.jpeg";
import guiness from "@/assets/videos/guiness.mp4";
import abacha from "@/assets/images/abacha.jpeg";

const SLIDE_DURATION = 7000;

const slides = [
  { type: "image", src: foodies },
  { type: "video", src: guiness },
  { type: "image", src: abacha },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance logic using a simple timeout that resets on slide change
  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [currentIndex, isPaused]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section 
      className="relative w-full h-[100dvh] overflow-hidden z-0 isolate bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* BACKGROUND MEDIA (Crossfade Transitions) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {currentSlide.type === "video" ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={currentSlide.src}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={currentSlide.src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* SLIDESHOW CONTROLS */}
      <div className="absolute bottom-7 inset-x-0 z-20 flex items-center justify-center gap-4">
        <button
          onClick={goToPrev}
          aria-label="Previous slide"
          className="p-2 md:p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? "w-8 bg-amber-400"
                  : "w-1.5 bg-white/40 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          aria-label="Next slide"
          className="p-2 md:p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default Hero;