import React, { useState, useMemo, useEffect } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { Link } from "react-router-dom";
import boatBg from "@/assets/images/boat.jpg";

export default function Banner({
  slogan = "YOUR BRAND NAME HERE",
  subline = "Community • Culture • Real Engagement",
  tagline = "Amplify Your Brand Across Mbaise",
  cta = "EXPLORE FULL PAGE FEATURE",
  logoText = "Your Logo",
  flyerImage = "",
  link = "/advertise",
}) {
  const [showVisual, setShowVisual] = useState(false);
  const [viewMode, setViewMode] = useState("fit");

  const toggleVisual = () => setShowVisual(v => !v);
  const toggleViewMode = () =>
    setViewMode(v => (v === "fit" ? "full" : "fit"));

  const particles = useMemo(() => {
    return [...Array(12)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 6,
    }));
  }, []);

  useEffect(() => {
    const handleKey = e => {
      if (e.key === "Escape") setShowVisual(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="w-full">
      {/* MINIMALIST LABEL */}
      <div className="w-screen -ml-4 md:ml-0 md:w-[700px] text-center py-1.5
                      bg-black/60 backdrop-blur-sm
                      border-t border-emerald-500/40 shadow-sm">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.25em]
                      text-emerald-300/90 font-medium bg-white/3 px-2 py-0.5 rounded inline-block">
          Friends' Ads • Amplify Your Brand
        </p>
      </div>

      {/* MINIMALIST MAIN BANNER - BOAT SHINES */}
      <div
        className="
          relative group overflow-hidden
          w-screen -ml-4 md:w-[700px] md:ml-0
          border-b border-emerald-500/50
          shadow-md shadow-emerald-500/20
          cursor-pointer transition-all duration-400 select-none
          min-h-[95px] md:min-h-[140px]
          flex items-center animate-heavy-bob
        "
        style={{
          backgroundImage: `url(${boatBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* LIGHT OVERLAY - MAX BOAT VISIBILITY */}
        <div className="absolute inset-0 bg-black/30" />

        {/* SUBTLE PARTICLES */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/70 rounded-full animate-float"
              style={{
                top: `${p.top}%`,
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* MINIMALIST CONTENT */}
        <div className="
          relative w-full h-full
          bg-black/15
          py-3 md:py-4 text-center
          transition-all duration-400 hover:scale-[1.01]
          flex flex-col justify-center items-center
          px-6 space-y-1
        ">
          <h2 className="text-lg md:text-2xl font-bold tracking-wide
                         text-emerald-200/95 drop-shadow-md">
            {slogan}
          </h2>

          <p className="text-[11px] md:text-sm
                        text-white/90 font-medium tracking-wide">
            {subline}
          </p>

          <p className="text-[10px] md:text-base
                        text-emerald-100/90 font-normal tracking-tight">
            {tagline}
          </p>

          <span className="
            opacity-100 md:opacity-0
            md:group-hover:opacity-100
            transition-all duration-500 ease-out
            text-emerald-200/95 font-medium
            text-[10px] tracking-wider uppercase
          ">
            {cta}
          </span>

          <button
            onClick={toggleVisual}
            className="
              text-emerald-200/95 hover:text-emerald-100 font-semibold text-sm md:text-base
              tracking-wide uppercase
              border border-emerald-400/50 hover:border-emerald-300/70
              rounded-lg px-5 py-1.5 md:px-7 md:py-2
              bg-black/40 hover:bg-emerald-900/20
              shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-400/30
              hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-300
            "
          >
            View Campaign
          </button>
        </div>

        {/* FIXED LOGO - PERFECT CENTER BOTH VIEWS */}
        <Link to={link}>
          <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-10">
            <div className="relative w-20 h-20 md:w-28 md:h-28">
              <div className="absolute inset-0
                              bg-black/70 backdrop-blur-md
                              border border-emerald-500/40 rounded-xl
                              shadow-md shadow-emerald-500/30" />
              
              <div className="
                absolute top-0 left-0 w-full h-full
                bg-black/90 backdrop-blur-sm rounded-xl
                flex items-center justify-center px-1 md:px-2
                text-[8px] md:text-[13px] lg:text-sm
                font-semibold text-emerald-200/95
                tracking-[0.12em] md:tracking-[0.18em] lg:tracking-[0.25em]
                leading-none md:leading-[1.1] lg:leading-tight
                pt-0.5 md:pt-1
              ">
                {logoText}
              </div>
            </div>
          </div>
        </Link>

        {/* CLEAN MINIMAL MODAL */}
        {showVisual && (
          <div
            className="fixed inset-0 z-50
                       flex items-center justify-center
                       bg-black/95 backdrop-blur-sm"
            onClick={toggleVisual}
          >
            <div
              className="relative w-full h-full p-6
                         flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={toggleVisual}
                className="
                  absolute top-6 right-6
                  text-emerald-300 hover:text-emerald-100
                  text-3xl font-light z-20
                  bg-black/70 backdrop-blur-md border border-emerald-500/40
                  rounded-xl p-2.5 shadow-xl shadow-emerald-500/30
                  hover:shadow-2xl hover:shadow-emerald-400/40
                  transition-all duration-300 hover:scale-105
                "
              >
                ×
              </button>

              <button
                onClick={toggleViewMode}
                className="
                  absolute top-6 left-6
                  text-emerald-300 hover:text-emerald-100
                  text-xl z-20
                  bg-black/70 backdrop-blur-md border border-emerald-500/40
                  rounded-xl p-2 shadow-xl shadow-emerald-500/30
                  hover:shadow-2xl hover:shadow-emerald-400/40
                  transition-all duration-300 hover:scale-105
                "
              >
                {viewMode === "fit" ? <Maximize2 /> : <Minimize2 />}
              </button>

              <img
                src={flyerImage}
                alt="Full Page Brand Feature"
                className={`w-full h-full ${
                  viewMode === "fit" ? "object-contain" : "object-cover"
                }
                rounded-2xl shadow-2xl shadow-emerald-500/30
                border border-emerald-500/30 backdrop-blur-sm
                hover:shadow-emerald-400/20 hover:shadow-xl`}
              />
            </div>
          </div>
        )}
      </div>

      {/* MINIMALIST ANIMATIONS */}
      <style>{`
        @keyframes float {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-10px)}
        }
        .animate-float{
          animation:float 6s ease-in-out infinite
        }

        @keyframes heavyBob{
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-16px)}
        }
        .animate-heavy-bob{
          animation:heavyBob 4.2s ease-in-out infinite
        }
      `}</style>
    </div>
  );
}
