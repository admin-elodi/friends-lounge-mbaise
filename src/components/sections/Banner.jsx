import React, { useState } from "react";
import mtnLogo from "@/assets/images/mtn-n.png";   // ✅ existing MTN image
import campaignVisual from "@/assets/images/ugwu.jpg"; // ✅ existing image
import { Maximize2, Minimize2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Banner() {
  const [showVisual, setShowVisual] = useState(false);
  const [viewMode, setViewMode] = useState("fit"); // 'fit' | 'full'

  const toggleVisual = () => setShowVisual((v) => !v);
  const toggleViewMode = () =>
    setViewMode((v) => (v === "fit" ? "full" : "fit"));

  return (
    <div className="relative group overflow-hidden w-screen -ml-4 md:w-[700px] md:ml-0 rounded-none border-t-2 border-b-2 border-yellow-400 shadow-[0_0_6px_rgba(255,204,0,0.5)] cursor-pointer transition-all duration-500 select-none min-h-[90px] md:min-h-[130px] flex items-center">

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-yellow-400/70 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative w-full h-full bg-gradient-to-r from-black via-yellow-900/20 to-black py-2 md:py-3 text-center transition-all duration-500 group-hover:scale-[1.02] flex flex-col justify-center items-center px-4 space-y-1">

        {/* Line 1 */}
        <p className="text-xs md:text-sm uppercase text-gray-300 tracking-widest font-light">
          Sponsored • MTN Nigeria
        </p>

        {/* Line 2 */}
        <h2 className="text-xl md:text-3xl font-black tracking-widest w-full text-yellow-400 drop-shadow-lg animate-softPulse">
          EVERYWHERE YOU GO
        </h2>

        {/* Line 3 */}
        <p className="text-xs md:text-sm text-gray-200 font-medium tracking-wide">
          Data • Voice • Digital Lifestyle
        </p>

        {/* Line 4 */}
        <p className="text-[10px] md:text-base text-gray-300 tracking-wide">
          Proudly connecting communities across Imo State
        </p>

        {/* Hover CTA */}
        <span className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 text-yellow-400 font-semibold text-[10px] tracking-widest">
          DISCOVER MTN DIGITAL EXPERIENCES
        </span>

        {/* Action Button */}
        <button
          onClick={toggleVisual}
          className="opacity-80 hover:opacity-100 transition-opacity duration-300 text-yellow-400 font-semibold text-xs tracking-wider border border-yellow-400/40 rounded-full px-4 py-1.5 bg-black/30 backdrop-blur-sm"
        >
          View MTN Campaign
        </button>
      </div>

      {/* MTN LOGO */}
      <Link to="/programs">
        <div className="absolute top-1/2 -translate-y-1/2 left-1 md:left-2 z-10">
          <div className="relative">
            <div className="absolute inset-0 w-20 h-20 md:w-28 md:h-28 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
            <img
              src={mtnLogo}
              alt="MTN Nigeria"
              className="relative w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-2xl border-4 border-yellow-300/60 rounded-full bg-black/30 p-2"
            />
            <div className="absolute inset-0 w-16 h-16 md:w-24 md:h-24 bg-yellow-400/30 rounded-full animate-ping"></div>
          </div>
        </div>
      </Link>

      {/* Campaign Visual Modal */}
      {showVisual && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={toggleVisual}
        >
          <div className="relative w-full h-full p-4 flex items-center justify-center">
            <button
              onClick={toggleVisual}
              className="absolute top-4 right-4 text-white hover:text-yellow-400 text-3xl transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              ×
            </button>

            <button
              onClick={toggleViewMode}
              className="absolute top-4 left-4 text-white hover:text-yellow-400 text-xl transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              {viewMode === "fit" ? <Maximize2 /> : <Minimize2 />}
            </button>

            <img
              src={campaignVisual}
              alt="MTN Nigeria Campaign"
              className={`w-full h-full ${
                viewMode === "fit" ? "object-contain" : "object-cover"
              } rounded-lg shadow-2xl`}
            />
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes softPulse {
          0%, 100% { text-shadow: 0 0 8px rgba(255,204,0,0.4); }
          50% { text-shadow: 0 0 16px rgba(255,204,0,0.9); }
        }
        .animate-softPulse {
          animation: softPulse 4s infinite;
        }
      `}</style>
    </div>
  );
}
