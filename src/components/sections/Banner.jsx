import React, { useState, useMemo, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import boatImage from "@/assets/images/boat.jpg";

export default function Banner({
  sponsor = "Friends' Ads – Amplify Your Brand",
  headline = "Showcase Your Brand To Mbaise & The World",
  subline = "Community • Culture • Real Engagement",
  logoText = "Your Logo",
  link = "/advertise",
  flyerImage = ""
}) {
  const [flyerOpen, setFlyerOpen] = useState(false);

  const particles = useMemo(
    () =>
      [...Array(8)].map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 6,
      })),
    []
  );

  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape") {
        setFlyerOpen(false);
      }
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      {/* TRUE FULL SCREEN MOBILE BANNER */}
      <div
        className="
          w-[400px] h-fit py-2 relative z-10 mx-0 px-0
          md:w-[700px] md:mx-auto md:px-0
          min-h-[96px] md:min-h-[170px]
          bg-gradient-to-r from-black/80 via-neutral-900/70 to-black/80
          backdrop-blur-md border border-white/5
          flex items-center overflow-hidden
          border-t-4 border-b-4 border-red-600/50
          shadow-xl shadow-black/50
          animate-heavy-bob
          !m-0
        "
      >
        {/* FULL WIDTH BOAT TEXTURE */}
        <div className="absolute inset-0 w-screen left-0 -ml-4 md:ml-0 md:w-[700px] md:-ml-0">
          <img
            src={boatImage}
            className="w-full h-full object-cover opacity-20"
            alt="Imo River canoe texture"
          />
        </div>

        {/* MINIMAL OVERLAY */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm w-screen left-0 -ml-4 md:ml-0 md:w-[700px] md:-ml-0" />

        {/* SUBTLE PARTICLES */}
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 bg-red-400/40 rounded-full animate-float backdrop-blur-sm"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* CONTENT */}
        <div className="relative w-full text-center px-3 md:px-10 space-y-1.5 z-20 flex-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-red-300 bg-white/3 px-2 py-0.5 rounded-sm backdrop-blur-sm inline-block">
            {sponsor}
          </p>

          <h2 className="text-[13px] md:text-xl text-white font-light drop-shadow-sm">
            Your Brand Name Here
          </h2>

          <p className="text-[9px] uppercase tracking-widest text-gray-200">
            {headline}
          </p>
          
          <p className="text-[9px] uppercase tracking-widest text-gray-300">
            Banner • Footer • Feature Page
          </p>

          <p className="text-[11px] md:text-sm text-gray-200">
            {subline}
          </p>

          

          {/* MINIMAL GLASS BUTTON */}
          <button
            onClick={() => {
              console.log("View Flyer clicked");
              setFlyerOpen(true);
            }}
            className="
              mt-2 text-[10px] md:text-sm font-medium
              bg-white/5 backdrop-blur-sm border border-red-500/40
              px-6 py-[5px] md:px-8 md:py-1.5 rounded-xl
              text-red-200 hover:text-white hover:bg-white/10 hover:border-red-400/60
              transition-all duration-300 shadow-lg hover:shadow-red-500/20
              hover:scale-[1.02]
            "
          >
            View Event Flyer
          </button>
        </div>

        {/* MINIMALIST LOGO */}
        <Link to={link}>
          <div className="absolute left-1 md:left-6 top-1/2 -translate-y-1/2 z-20">
            <div className="relative w-14 h-14 md:w-24 md:h-24">
              <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-sm" />
              <div className="absolute inset-0 bg-black/90 backdrop-blur-sm border-2 border-red-600/60 rounded-full" />
              <div
                className="
                  absolute inset-0 flex items-center justify-center
                  text-[8.5px] md:text-xs text-gray-100 font-medium
                  tracking-[0.2em] md:tracking-widest leading-[0.9]
                "
              >
                {logoText}
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* CLEAN FLYER MODAL */}
      {flyerOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[110] flex flex-col items-center justify-center p-4"
          onClick={() => setFlyerOpen(false)}
        >
          <button
            onClick={() => setFlyerOpen(false)}
            className="
              absolute top-6 left-6 z-40
              flex items-center gap-2 px-5 py-2.5
              bg-black/70 backdrop-blur-md text-white text-sm font-medium
              rounded-xl border border-white/20 shadow-xl
              hover:bg-white/10 hover:border-red-400/40 transition-all duration-200
              hover:scale-[1.05]
            "
          >
            <ArrowLeft size={18} /> Back to Banner
          </button>

          {flyerImage ? (
            <img
              src={flyerImage}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-sm"
              alt="Event Flyer"
            />
          ) : (
            <div className="text-center text-white max-w-lg px-6 space-y-4 backdrop-blur-sm bg-black/50 rounded-2xl border border-white/10 py-10">
              <h2 className="text-2xl md:text-4xl font-bold text-emerald-300 drop-shadow-lg">
                Flyer Preview Area
              </h2>
              <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
                This full-screen area displays your complete event flyer for maximum impact and visibility across Friends Lounge.
              </p>
              <p className="text-base md:text-lg text-gray-200">
                Seen by thousands throughout Mbaise and beyond.
              </p>
            </div>
          )}
        </div>
      )}

      {/* CLEAN ANIMATIONS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes heavyBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        .animate-heavy-bob {
          animation: heavyBob 4.2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
