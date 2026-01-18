import React, { useState, useMemo, useEffect } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import boatBg from "@/assets/images/boat.jpg";

export default function Banner({
  slogan = "YOUR BRAND NAME HERE",
  subline = "Community • Culture • Real Engagement",
  tagline = "Amplify Your Brand Across Mbaise",
  cta = "Explore Friends Ads",
  logoText = "Your Logo",
  flyerImage = "",
  link = "/advertise",
}) {
  const [showVisual, setShowVisual] = useState(false);
  const [viewMode, setViewMode] = useState("fit");

  const navigate = useNavigate();

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

  const handleGoToPrograms = () => {
    navigate("/brand-hub");
    setShowVisual(false);
  };

  return (
    <div className="w-full">

      {/* LABEL */}
      <div className="w-screen -ml-4 md:ml-14 md:ml-0 md:w-[700px] text-center py-1
                      bg-black/60 backdrop-blur-sm
                      border-t border-emerald-500/40">
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.25em]
                      text-emerald-300/90 font-medium bg-white/3 px-2 py-[2px] rounded inline-block">
          Friends' Ads • Amplify Your Brand
        </p>
      </div>

      {/* MAIN BANNER */}
      <div
        className="
          relative group overflow-hidden
          w-screen -ml-4 md:ml-14 md:w-[700px] md:ml-0
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
        <div className="absolute inset-0 bg-black/30" />

        {/* PARTICLES */}
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

        {/* CONTENT */}
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
            {cta}
          </button>
        </div>

        {/* LOGO */}
        <Link to={link}>
          <div className="absolute top-1/2 -translate-y-1/2 left-1 md:left-4 z-10">
            <div className="relative w-16 h-16 md:w-24 md:h-24">
              <div className="absolute inset-0
                              bg-black/70 backdrop-blur-md
                              border border-emerald-500/40 rounded-xl
                              shadow-md shadow-emerald-500/30" />
              
              <div className="
                absolute inset-0
                bg-black/90 backdrop-blur-sm rounded-xl
                flex items-center justify-center px-1 md:px-2
                text-[7px] md:text-[11px] lg:text-xs
                font-semibold text-emerald-200/95
                tracking-[0.10em] md:tracking-[0.16em] lg:tracking-[0.22em]
                leading-tight
                pt-0.5
              ">
                {logoText}
              </div>
            </div>
          </div>
        </Link>

        {/* MODAL */}
        {showVisual && (
          <div
            className="fixed inset-0 z-50
                       flex items-center justify-center
                       bg-black/95 backdrop-blur-sm"
            onClick={toggleVisual}
          >
            <div
              className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto p-6 md:p-10
                         flex flex-col items-center justify-center text-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={toggleVisual}
                className="
                  absolute top-12 left-2 md:left-6
                  text-emerald-300 hover:text-emerald-100
                  text-sm font-semibold z-20
                  bg-black/70 backdrop-blur-md border border-emerald-500/40
                  rounded-xl px-2 py-2 shadow-lg
                  hover:shadow-xl hover:shadow-emerald-400/40
                  transition-all duration-300
                "
              >
                ← Back
              </button>

              <div className="max-w-2xl px-4 space-y-4">
                <div className="text-emerald-100/90 text-[10px] md:text-[12px] font-medium leading-relaxed">
                  <p>This Banner is Point 1 of Friends' Ads 3-point ad system</p>
                  <p><strong>Point 2:</strong> Smaller banner at bottom of pages</p>
                  <p><strong>Point 3:</strong> Full-page with badge on navigation bar</p>
                </div>

                <button
                  onClick={handleGoToPrograms}
                  className="
                    px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500
                    hover:from-emerald-500 hover:to-emerald-400
                    text-white font-bold text-[10px] rounded-sm shadow-lg
                    transform hover:scale-105 transition-all duration-300
                  "
                >
                  Explore Point 3 - Brand Experience Hub →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🔥 SLIM CONTACT STRIP - Now WhatsApp linked */}
      <div className="w-screen -ml-4 md:ml-14 md:ml-0 md:w-[700px]
                      bg-black/90 backdrop-blur-md
                      border-t border-emerald-500/40
                      text-center py-[3px]">
        <a
          href="https://wa.me/2347066064379?text=Hello%2C%20I%27m%20interested%20in%20advertising%20with%20Friends%27%20Lounge%20Mbaise..."
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] md:text-xs text-emerald-300 font-semibold tracking-widest hover:text-emerald-200 inline-flex items-center gap-1"
        >
          <span className="text-emerald-300">📞</span>
          Friends' Ads Desk: 0706 606 4379 (WhatsApp)
        </a>
      </div>

      {/* ANIMATIONS */}
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