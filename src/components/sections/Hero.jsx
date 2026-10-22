import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Square,
} from "lucide-react";


import foodies from "@/assets/images/foodies.jpeg";
import guiness from "@/assets/videos/guiness.mp4";
import abacha from "@/assets/images/abacha.jpeg";


// How long (ms) each slide holds before auto-advancing. Manual arrows/dots
// still work at any time and don't fight the auto-advance - clicking one
// just changes the current slide, the interval keeps ticking from there.
const SLIDE_DURATION = 7000;


// Alternating video / picture, four slides.
const slides = [
  { type: "image", src: foodies },
  { type: "video", src: guiness, poster: guiness },
  { type: "image", src: abacha },
];


const Hero = () => {
  const [vh, setVh] = useState(window.innerHeight * 0.01);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(false);

  // When true, the user has chosen to watch the full video.
  // The slideshow will not auto-advance until the video ends
  // or the user manually changes slides.
  const [isWatchingFullVideo, setIsWatchingFullVideo] = useState(false);


  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;


  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight * 0.01);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Reset full-video mode whenever the user changes slides manually.
  useEffect(() => {
    setIsWatchingFullVideo(false);
  }, [currentIndex]);


  // Auto-advance.
  // - Paused for reduced-motion users.
  // - Paused while the user is watching the full video.
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isWatchingFullVideo) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, isWatchingFullVideo]);


  const toggleSound = () => {
    setIsSoundOn((prev) => !prev);
  };


  // Watching the full video is a deliberate user action,
  // so enable sound at the same time.
  const watchFullVideo = () => {
    setIsWatchingFullVideo(true);
    setIsSoundOn(true);
  };


  // Return to the normal looping slideshow.
  const resumeSlideshow = () => {
    setIsWatchingFullVideo(false);
  };


  const handleVideoEnded = () => {
    // The full 55-second video has finished;
    // return the slideshow to its normal cycle.
    setIsWatchingFullVideo(false);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };


  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () =>
    setCurrentIndex((prev) => (prev + 1) % slides.length);


  const currentSlide = slides[currentIndex];
  const isVideoSlide = currentSlide.type === "video";


  return (
    <section
      className="relative w-full overflow-hidden z-0 isolate bg-black"
      style={{ height: `calc(${vh * 100}px)` }}
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0">
        {isVideoSlide ? (
          <video
            key={currentSlide.src}
            className="absolute inset-0 w-full h-full object-cover"
            src={currentSlide.src}
            autoPlay
            loop={!isWatchingFullVideo}
            muted={!isSoundOn}
            playsInline
            preload="metadata"
            poster={currentSlide.poster}
            onEnded={handleVideoEnded}
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


      {/* ================= VIDEO CONTROLS ================= */}
      {isVideoSlide && (
        <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
          {isWatchingFullVideo ? (
            <button
              onClick={resumeSlideshow}
              aria-label="Resume slideshow"
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white text-sm backdrop-blur-sm transition-colors"
            >
              <Square size={16} />
              <span className="hidden sm:inline">Resume slideshow</span>
            </button>
          ) : (
            <button
              onClick={watchFullVideo}
              aria-label="Watch full video with sound"
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white text-sm backdrop-blur-sm transition-colors"
            >
              <Play size={16} />
              <span className="hidden sm:inline">Watch full video</span>
            </button>
          )}


          <button
            onClick={toggleSound}
            aria-label={isSoundOn ? "Turn video sound off" : "Turn video sound on"}
            className="p-2.5 md:p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors"
          >
            {isSoundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      )}


      {/* ================= SLIDESHOW CONTROLS - arrows flanking dots, bottom-center ================= */}
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