import React, { useState, useMemo, useEffect } from "react";
import mtnLogo from "@/assets/images/mtn-n.png";
import campaignVisual from "@/assets/images/mtn.jpg";
import { Maximize2, Minimize2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Banner({
  sponsor = "MTN Nigeria",
  slogan = "EVERYWHERE YOU GO",
  subline = "Data • Voice • Digital Lifestyle",
  tagline = "Proudly connecting communities across Mbaise",
  cta = "DISCOVER MTN DIGITAL EXPERIENCES",
  logo = mtnLogo,
  image = campaignVisual,
  link = "/programs",
}) {
  const [showVisual, setShowVisual] = useState(false);
  const [viewMode, setViewMode] = useState("fit");

  const toggleVisual = () => setShowVisual(v => !v);
  const toggleViewMode = () =>
    setViewMode(v => (v === "fit" ? "full" : "fit"));

  /* Stable particles */
  const particles = useMemo(() => {
    return [...Array(14)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 6,
    }));
  }, []);

  /* ESC close */
  useEffect(() => {
    const handleKey = e => {
      if (e.key === "Escape") setShowVisual(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="w-full">

      {/* FRIENDS ADS LABEL (STATIC BRAND) */}
      <div className="w-screen -ml-4 md:ml-0 md:w-[700px] text-center py-1 bg-black border-t border-yellow-400/40">
        <p className="text-[10px] md:text-xs uppercase tracking-widest text-yellow-400 font-semibold">
          Friends’ Ads • Amplify Your Brand
        </p>
      </div>

      {/* MAIN BANNER */}
      <div className="relative group overflow-hidden w-screen -ml-4 md:w-[700px] md:ml-0 rounded-none border-b-2 border-yellow-400 shadow-[0_0_6px_rgba(255,204,0,0.5)] cursor-pointer transition-all duration-500 select-none min-h-[90px] md:min-h-[130px] flex items-center">

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-yellow-400/70 rounded-full animate-float"
              style={{
                top: `${p.top}%`,
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative w-full h-full bg-gradient-to-r from-black via-yellow-900/20 to-black py-2 md:py-3 text-center transition-all duration-500 group-hover:scale-[1.02] flex flex-col justify-center items-center px-4 space-y-1">

          <p className="text-xs md:text-sm uppercase text-gray-300 tracking-widest font-light">
            Sponsored • {sponsor}
          </p>

          <h2 className="text-xl md:text-3xl font-black tracking-widest w-full text-yellow-400 drop-shadow-lg animate-softPulse">
            {slogan}
          </h2>

          <p className="text-xs md:text-sm text-gray-200 font-medium tracking-wide">
            {subline}
          </p>

          <p className="text-[10px] md:text-base text-gray-300 tracking-wide">
            {tagline}
          </p>

          <span className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 text-yellow-400 font-semibold text-[10px] tracking-widest">
            {cta}
          </span>

          <button
            onClick={toggleVisual}
            aria-label="View campaign visual"
            className="opacity-80 hover:opacity-100 transition-opacity duration-300 text-yellow-400 font-semibold text-xs tracking-wider border border-yellow-400/40 rounded-full px-4 py-1.5 bg-black/30 backdrop-blur-sm"
          >
            View Campaign
          </button>
        </div>

        {/* Logo */}
        <Link to={link}>
          <div className="absolute top-1/2 -translate-y-1/2 left-1 md:left-2 z-10">
            <div className="relative">
              <div className="absolute inset-0 w-20 h-20 md:w-28 md:h-28 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>

              <img
                src={logo}
                alt={sponsor}
                className="relative w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-2xl border-4 border-yellow-300/60 rounded-full bg-black/30 p-2"
              />

              <div className="absolute inset-0 w-16 h-16 md:w-24 md:h-24 bg-yellow-400/30 rounded-full animate-ping"></div>
            </div>
          </div>
        </Link>

        {/* Modal */}
        {showVisual && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={toggleVisual}
          >
            <div
              className="relative w-full h-full p-4 flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={toggleVisual}
                aria-label="Close"
                className="absolute top-4 right-4 text-white hover:text-yellow-400 text-3xl transition-colors z-10 bg-black/50 rounded-full p-2"
              >
                ×
              </button>

              <button
                onClick={toggleViewMode}
                aria-label="Toggle view mode"
                className="absolute top-4 left-4 text-white hover:text-yellow-400 text-xl transition-colors z-10 bg-black/50 rounded-full p-2"
              >
                {viewMode === "fit" ? <Maximize2 /> : <Minimize2 />}
              </button>

              <img
                src={image}
                alt={`${sponsor} Campaign`}
                className={`w-full h-full ${
                  viewMode === "fit" ? "object-contain" : "object-cover"
                } rounded-lg shadow-2xl`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
