// src/components/sections/Banner.jsx
import React, { useEffect, useState } from "react";
import oasisFlyer from "@/assets/images/ugwu.jpg";
import upaLogo from "@/assets/images/upa.png"; // ← Added: Upa Logo
import { Maximize2, Minimize2 } from "lucide-react";

export default function Banner() {
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [showFlyer, setShowFlyer] = useState(false);
  const [viewMode, setViewMode] = useState('fit'); // 'fit' or 'full'

  useEffect(() => {
    const target = new Date("December 26, 2025 00:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      setDaysLeft(Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24))));
      setHoursLeft(Math.max(0, Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))));
      setMinutesLeft(Math.max(0, Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))));
      setSecondsLeft(Math.max(0, Math.floor((difference % (1000 * 60)) / 1000)));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleFlyer = () => setShowFlyer(!showFlyer);
  const toggleViewMode = () => setViewMode(viewMode === 'fit' ? 'full' : 'fit');

  return (
    <div className="relative group overflow-hidden w-screen -ml-4 md:w-[700px] md:ml-0 rounded-none border-t-2 border-b-2 border-white shadow-[0_0_5px_rgba(0,255,0,0.4)] cursor-pointer transition-all duration-500 select-none min-h-[80px] md:min-h-[120px] flex items-center">

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 opacity-60 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content — Full-span gradient */}
      <div className="relative w-full h-full bg-gradient-to-r from-[hsl(160,100%,10%)] via-black to-[hsl(160,100%,18%)] py-1 md:py-2 text-center transition-all duration-500 group-hover:scale-[1.02] flex flex-col justify-center items-center px-4 space-y-0.5 md:space-y-1">

        {/* Line 1: Rationale */}
        <p className="text-xs md:text-sm uppercase text-gray-300 font-light tracking-wide italic">
          Friends' Ad • Amplify Your Brand
        </p>

        {/* Line 2: Event name */}
        <h2 className="text-xl md:text-2xl font-bold tracking-widest w-full font-montserrat text-green-400 drop-shadow-lg animate-softPulse">
          UDO DAY 2025
        </h2>

        {/* Line 3: Auto-typing subtitle */}
        <p className="font-montserrat text-gray-200 text-xs md:text-sm typing-effect max-w-[90%]">
          A Celebration of Peace • Culture • Unity
        </p>

        {/* Line 4: Location */}
        <p className="text-[10px] md:text-base text-gray-300 font-montserrat tracking-wide">
          Mbaise, Imo State
        </p>

        {/* Line 5: Date + Days Left */}
        <p className="text-[10px] md:text-base text-gray-300 font-montserrat tracking-wide">
          26th December, 2025 • {daysLeft} Days Left
        </p>

        {/* Countdown Clock */}
        <p className="text-[10px] md:text-base text-gray-300 font-mono font-light tracking-wide">
          {hoursLeft.toString().padStart(2, '0')}h : {minutesLeft.toString().padStart(2, '0')}m : {secondsLeft.toString().padStart(2, '0')}s
        </p>

        {/* Line 6: Hover CTA */}
        <span className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 text-green-400 font-semibold text-[10px] cursor-pointer tracking-widest">
          CLICK TO VIEW DETAILS
        </span>

        {/* Line 7: Flyer Button */}
        <button
          onClick={toggleFlyer}
          className="opacity-70 hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300 text-green-400 font-medium text-xs tracking-wider border border-green-400/30 rounded-full px-3 md:px-4 py-1 md:py-2 bg-black/20 backdrop-blur-sm"
        >
          View Official Flyer
        </button>
      </div>

      {/* UPA LOGO — Left Side, Fully Visible, Perfect Balance */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1 md:left-2 pointer-events-none z-10">
        <div className="relative">
          <div className="absolute inset-0 w-20 h-20 md:w-28 md:h-28 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
          <img
            src={upaLogo}
            alt="UPA Mbaise"
            className="relative w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-2xl border-4 border-green-300/50 rounded-full bg-black/30 p-2"
          />
          <div className="absolute inset-0 w-16 h-16 md:w-24 md:h-24 bg-green-400/30 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Flyer Modal Overlay */}
      {showFlyer && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={toggleFlyer}
        >
          <div className="relative w-full h-full p-4 flex items-center justify-center">
            <button
              onClick={toggleFlyer}
              className="absolute top-4 right-4 text-white hover:text-green-400 text-3xl transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              ×
            </button>
            <button
              onClick={toggleViewMode}
              className="absolute top-4 left-4 text-white hover:text-green-400 text-xl transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              {viewMode === 'fit' ? <Maximize2 /> : <Minimize2 />}
            </button>
            <img
              src={oasisFlyer}
              alt="UDO Day 2025 Official Flyer"
              className={`w-full h-full object-${viewMode === 'fit' ? 'contain' : 'cover'} rounded-lg shadow-2xl z-0`}
            />
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        .typing-effect {
          width: fit-content;
          margin: auto;
          overflow: hidden;
          white-space: nowrap;
          animation: typing 4s steps(40, end) infinite;
        }

        @keyframes typing {
          0% { width: 0 }
          50% { width: 100% }
          100% { width: 0 }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-softPulse {
          animation: softPulse 4s infinite;
        }

        @keyframes softPulse {
          0%, 100% { text-shadow: 0 0 8px rgba(0,255,0,0.4); }
          50% { text-shadow: 0 0 14px rgba(0,255,0,0.8); }
        }
      `}</style>
    </div>
  );
}