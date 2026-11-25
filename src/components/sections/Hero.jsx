// src/components/sections/Hero.jsx
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, MessageSquare, ArrowRight, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

import galleryService from "@/services/galleryService";

const SLIDE_DURATION = 7000;

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadHeroSlides() {
      try {
        setIsLoading(true);
        const { media } = await galleryService.getGallery();
        if (!isMounted) return;

        const featuredItems = media.filter((item) => item.featured === true);

        const dynamicSlides = featuredItems.map((item) => ({
          id: item.id,
          type: item.mediaType || "image",
          src: item.mediaUrl,
          thumbnail: item.thumbnailUrl,
          title: item.title,
          description: item.description,
          likes: item.likes,
          commentsCount: item.commentsCount,
        }));

        setSlides(dynamicSlides);
      } catch (err) {
        console.error("Failed to load hero slides from gallery:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadHeroSlides();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // MINIMALIST FALLBACK
  if (!isLoading && slides.length === 0) {
    return (
      <section className="relative w-full h-[100dvh] overflow-hidden z-0 isolate bg-[#0a0a0a] flex items-center justify-center">
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto mt-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-8"
          >
            <ImageIcon size={24} className="text-zinc-500" />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight"
          >
            Your Experience <br />
            <span className="text-amber-500 italic">Starts Here.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-base md:text-lg mb-10"
          >
            Step into the finest Lounge in Mbaise.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/experience-gallery"
              className="group flex items-center gap-2 bg-white/30 hover:bg-amber-400 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all"
            >
              Experience Gallery
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return <section className="relative w-full h-[100dvh] bg-[#0a0a0a]" />;
  }

  const currentSlide = slides[currentIndex];

  return (
    <section 
      className="relative w-full h-[100dvh] overflow-hidden z-0 isolate bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* BACKGROUND MEDIA */}
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
              alt={currentSlide.title || ""}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* MINIMALIST SLIDE INFO */}
      <div className="absolute bottom-24 md:bottom-28 inset-x-0 z-20 flex flex-col items-center px-4 text-center">
        <motion.div
          key={`info-${currentIndex}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="max-w-2xl"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
            {currentSlide.title}
          </h2>
          
          {currentSlide.description && (
            <p className="text-sm text-zinc-300 mb-5 line-clamp-1">
              {currentSlide.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            {/* Stats - Clean, no background pill */}
            <div className="flex items-center gap-3 text-xs font-medium text-zinc-300">
              <span className="flex items-center gap-1.5">
                <Heart size={14} className="fill-white/20 text-white" />
                {currentSlide.likes || 0}
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquare size={14} className="text-white/70" />
                {currentSlide.commentsCount || 0}
              </span>
            </div>

            {/* Navigate to Gallery - Minimalist Button */}
            <Link
              to={`/experience-gallery?media=${currentSlide.id}`}
              className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 px-4 py-2 rounded-lg font-medium text-xs transition-all"
            >
              Experience Gallery
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* SLIDESHOW CONTROLS - Lighter weight */}
      <div className="absolute bottom-8 inset-x-0 z-20 flex items-center justify-center gap-5">
        <button
          onClick={goToPrev}
          aria-label="Previous slide"
          className="p-1.5 text-white/50 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 bg-white"
                  : "w-1 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          aria-label="Next slide"
          className="p-1.5 text-white/50 hover:text-white transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default Hero;