// Banner.jsx

import React, { useState, useEffect } from "react";
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

  const navigate = useNavigate();

  const toggleVisual = () => setShowVisual((v) => !v);

  useEffect(() => {
    const handleKey = (e) => {
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
      
      {/* TOP LABEL */}
      <div className="w-screen -ml-4 md:ml-0 md:w-[700px] text-center py-2 bg-black/80 backdrop-blur-xl border-t border-white/10">
        
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-white/60">
          Friends' Ads • Amplify Your Brand
        </p>
      </div>

      {/* MAIN BANNER */}
      <div
        className="
          relative
          overflow-hidden
          w-screen
          -ml-4
          md:ml-0
          md:w-[700px]
          min-h-[120px]
          md:min-h-[160px]
          flex items-center
          border border-white/10
          backdrop-blur-xl
          transition-all duration-500
        "
        style={{
          backgroundImage: `url(${boatBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* CINEMATIC OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />

        {/* CONTENT */}
        <div
          className="
            relative
            z-10
            w-full
            px-6
            md:px-12
            py-6
            text-center
            flex
            flex-col
            justify-center
            items-center
            space-y-3
          "
        >
          <h2 className="text-xl md:text-3xl font-light uppercase tracking-[0.24em] text-white">
            {slogan}
          </h2>

          <p className="text-[11px] md:text-sm font-light tracking-[0.16em] uppercase text-white/70">
            {subline}
          </p>

          <p className="text-[10px] md:text-sm italic text-white/50">
            {tagline}
          </p>

          <button
            onClick={toggleVisual}
            className="
              border
              border-white/15
              bg-white/5
              hover:bg-white
              hover:text-black
              text-white
              uppercase
              tracking-[0.22em]
              text-[11px]
              px-6
              py-3
              rounded-full
              transition-all
              duration-300
              backdrop-blur-md
            "
          >
            {cta}
          </button>
        </div>

        {/* LOGO BLOCK */}
        <Link to={link}>
          <div className="absolute top-1/2 -translate-y-1/2 left-3 md:left-5 z-20">
            
            <div className="relative w-16 h-16 md:w-24 md:h-24">
              
              <div className="absolute inset-0 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl" />

              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  text-center
                  px-2
                  text-[7px]
                  md:text-[10px]
                  uppercase
                  tracking-[0.18em]
                  leading-relaxed
                  text-white/80
                "
              >
                {logoText}
              </div>
            </div>
          </div>
        </Link>

        {/* MODAL */}
        {showVisual && (
          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/90
              backdrop-blur-2xl
            "
            onClick={toggleVisual}
          >
            <div
              className="
                relative
                w-full
                max-w-4xl
                px-6
                md:px-10
                py-12
                text-center
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE */}
              <button
                onClick={toggleVisual}
                className="
                  absolute
                  top-4
                  left-4
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-2
                  rounded-full
                  text-[11px]
                  uppercase
                  tracking-[0.18em]
                  text-white/70
                  hover:text-white
                  hover:border-white/30
                  transition-all
                  duration-300
                "
              >
                ← Back
              </button>

              {/* CONTENT */}
              <div className="max-w-2xl mx-auto space-y-8">
                
                <div className="space-y-4">
                  <h3 className="text-lg md:text-2xl uppercase tracking-[0.22em] text-white font-light">
                    Friends Ads Ecosystem
                  </h3>

                  <div className="text-white/60 text-[11px] md:text-sm leading-relaxed space-y-2 uppercase tracking-[0.10em]">
                    <p>Point 1 — Hero Banner Visibility</p>
                    <p>Point 2 — Bottom Page Promotion Banner</p>
                    <p>Point 3 — Full Brand Experience Hub</p>
                  </div>
                </div>

                <button
                  onClick={handleGoToPrograms}
                  className="
                    px-8
                    py-4
                    rounded-full
                    bg-emerald-500
                    text-black
                    uppercase
                    tracking-[0.20em]
                    text-[11px]
                    font-semibold
                    hover:bg-emerald-400
                    transition-all
                    duration-300
                  "
                >
                  Explore Brand Experience Hub →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CONTACT STRIP */}
      <div className="w-screen -ml-4 md:ml-0 md:w-[700px] bg-black/80 border-t border-white/10 py-2 text-center">
        
        <a
          href="https://wa.me/2347066064379?text=Hello%2C%20I%27m%20interested%20in%20advertising%20with%20Friends%27%20Lounge%20Mbaise..."
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-[10px]
            md:text-xs
            uppercase
            tracking-[0.22em]
            text-white/60
            hover:text-white
            transition-colors
            inline-flex
            items-center
            gap-2
          "
        >
          <span>📞</span>
          Friends' Ads Desk: 0706 606 4379
        </a>
      </div>
    </div>
  );
}