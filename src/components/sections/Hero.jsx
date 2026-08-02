import React, { useRef, useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";

import fullHouse from "@/assets/videos/full-house.webm";
import chief from "@/assets/images/chiefs.webp";
import occassion from "@/assets/videos/occassion.webm";
import staff from "@/assets/images/friends-bar.webp";
import flmSounds from "@/assets/audio/flm-sounds.mp3";

// How long (ms) volume fades take when muting/unmuting the background track.
const FADE_DURATION = 800;

const Hero = () => {
  const [vh, setVh] = useState(window.innerHeight * 0.01);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);

  // Background audio (flm-sounds.mp3) state — independent from the (always-muted) videos.
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [hasStartedMusic, setHasStartedMusic] = useState(false);

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const hasInteractedRef = useRef(false);
  const fadeIntervalRef = useRef(null);

  const slides = [
    {
      type: "video",
      src: fullHouse,
      text: "Friends' Lounge in Session",
      poster: staff,
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

  // Smoothly ramps the audio element's volume to `target` (0–1) over FADE_DURATION.
  const fadeAudioTo = useCallback((target, onComplete) => {
    const audio = audioRef.current;
    if (!audio) return;

    clearInterval(fadeIntervalRef.current);

    const steps = 20;
    const stepTime = FADE_DURATION / steps;
    const startVolume = audio.volume;
    const delta = target - startVolume;
    let stepCount = 0;

    fadeIntervalRef.current = setInterval(() => {
      stepCount += 1;
      const progress = stepCount / steps;
      audio.volume = Math.min(1, Math.max(0, startVolume + delta * progress));

      if (stepCount >= steps) {
        clearInterval(fadeIntervalRef.current);
        audio.volume = target;
        onComplete?.();
      }
    }, stepTime);
  }, []);

  // Starts the background track the first time the user interacts with the page.
  useEffect(() => {
    const startMusic = () => {
      if (hasInteractedRef.current) return;
      hasInteractedRef.current = true;

      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0;
        audio
          .play()
          .then(() => {
            setHasStartedMusic(true);
            fadeAudioTo(1);
          })
          .catch(() => {
            // Autoplay was blocked (rare once a gesture fired) — leave paused,
            // the mute/unmute button still lets the user start it manually.
            setHasStartedMusic(false);
          });
      }

      removeListeners();
    };

    const events = ["click", "scroll", "touchstart", "keydown"];
    events.forEach((evt) =>
      window.addEventListener(evt, startMusic, { once: true, passive: true })
    );

    function removeListeners() {
      events.forEach((evt) => window.removeEventListener(evt, startMusic));
    }

    return () => {
      removeListeners();
      clearInterval(fadeIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMusicMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMusicMuted || audio.paused) {
      setIsMusicMuted(false);
      if (audio.paused) {
        audio.volume = 0;
        audio.play().then(() => setHasStartedMusic(true)).catch(() => {});
      }
      fadeAudioTo(1);
    } else {
      setIsMusicMuted(true);
      fadeAudioTo(0);
    }
  }, [isMusicMuted, fadeAudioTo]);

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
    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused]);

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
      className="relative w-full overflow-hidden z-0 isolate"
      style={{ height: `calc(${vh * 100}px)` }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
    >
      {/* Background audio track — plays on first user interaction, controlled only via the button below. */}
      <audio ref={audioRef} src={flmSounds} loop preload="auto" />

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
            muted
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

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </div>

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

      {/* Controls only the background music track — videos stay silent with no user-facing toggle. */}
      <button
        onClick={toggleMusicMute}
        className="absolute bottom-6 right-6 text-white p-4 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition z-20"
        aria-label={isMusicMuted || !hasStartedMusic ? "Unmute background music" : "Mute background music"}
      >
        {isMusicMuted || !hasStartedMusic ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </section>
  );
};

export default Hero;