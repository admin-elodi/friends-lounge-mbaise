import React, { useState, useEffect } from 'react';
import { Tv, Volume2, Maximize2, Calendar, Clock, Timer } from 'lucide-react';

export default function LiveStreamViewer({ activeMatch }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMatchPast, setIsMatchPast] = useState(false);

  useEffect(() => {
    if (!activeMatch?.date) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const calculateTimeLeft = () => {
      // Clean time string (e.g., "20:00 WAT" -> "20:00")
      const cleanTime = activeMatch.time ? activeMatch.time.replace(/WAT|UTC|EST/gi, '').trim() : '00:00';
      const targetDateStr = `${activeMatch.date} ${cleanTime}`;
      const targetTime = new Date(targetDateStr).getTime();

      // Fallback for invalid date string
      if (isNaN(targetTime)) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setIsMatchPast(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsMatchPast(false);
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [activeMatch]);

  return (
    <div className="relative rounded-3xl bg-neutral-950 border border-neutral-800 p-3 sm:p-4 shadow-2xl overflow-hidden mb-12">
      <div className="relative aspect-video w-full rounded-2xl bg-black overflow-hidden flex flex-col justify-between p-4 sm:p-6 border border-neutral-900">
        {/* Top Bar */}
        <div className="flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
            {activeMatch ? (isMatchPast ? "Match Day Live" : "Upcoming Match") : "Coming Up Next"}
          </span>
          <div className="flex items-center gap-2 text-neutral-400">
            <Volume2 className="w-4 h-4 cursor-pointer hover:text-white" />
            <Maximize2 className="w-4 h-4 cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Center Screen Display */}
        <div className="flex flex-col items-center justify-center text-center my-auto z-10">
          <Tv className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-700 mb-2 sm:mb-3" />
          
          <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
            {activeMatch ? `${activeMatch.homeTeam} vs ${activeMatch.awayTeam}` : "No Match Scheduled Yet"}
          </h2>

          <p className="text-xs text-neutral-500 mb-3 max-w-md">
            {activeMatch ? activeMatch.announcement : "Check back soon for Live Match Screenings"}
          </p>

          {/* Teams Placeholder (Visible when no match is active) */}
          {!activeMatch && (
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600 tracking-wider uppercase mb-2">
              <span className="px-2.5 py-1 bg-neutral-900/60 rounded-md border border-neutral-800/50 text-neutral-500">HOME TEAM</span>
              <span className="text-neutral-700 font-bold">VS</span>
              <span className="px-2.5 py-1 bg-neutral-900/60 rounded-md border border-neutral-800/50 text-neutral-500">AWAY TEAM</span>
            </div>
          )}

          {/* Date & Time Badge / Placeholder */}
          <div className="flex items-center gap-3 px-3 py-1 bg-neutral-900/90 border border-neutral-800 rounded-full text-xs font-medium mb-3">
            <span className="flex items-center gap-1.5 text-amber-500/80">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              {activeMatch?.date || "-- --, ----"}
            </span>
            <span className="text-neutral-700">•</span>
            <span className="flex items-center gap-1.5 text-amber-500/80">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {activeMatch?.time || "--:-- WAT"}
            </span>
          </div>

          {/* Countdown Timer / Zeroed Placeholder */}
          <div className="flex items-center gap-2 bg-neutral-950/80 px-4 py-2 rounded-2xl border border-neutral-800/80">
            <Timer className={`w-4 h-4 ${activeMatch && !isMatchPast ? 'text-red-500 animate-pulse' : 'text-neutral-600'}`} />
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-200">
              <div className="flex items-center gap-1 bg-neutral-900 px-2 py-1 rounded">
                <span className={activeMatch ? "text-white" : "text-neutral-500"}>
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-neutral-500 font-sans uppercase">DAYS</span>
              </div>
              <span className="text-neutral-600">:</span>
              <div className="flex items-center gap-1 bg-neutral-900 px-2 py-1 rounded">
                <span className={activeMatch ? "text-white" : "text-neutral-500"}>
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-neutral-500 font-sans uppercase">HRS</span>
              </div>
              <span className="text-neutral-600">:</span>
              <div className="flex items-center gap-1 bg-neutral-900 px-2 py-1 rounded">
                <span className={activeMatch ? "text-white" : "text-neutral-500"}>
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-neutral-500 font-sans uppercase">MIN</span>
              </div>
              <span className="text-neutral-600">:</span>
              <div className="flex items-center gap-1 bg-neutral-900 px-2 py-1 rounded">
                <span className={activeMatch ? "text-red-400" : "text-neutral-500"}>
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-neutral-500 font-sans uppercase">SEC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between z-10 pt-4 border-t border-neutral-900/60">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> FRIENDS LOUNGE
          </span>
          <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider">LIVE SCREENINGS</span>
        </div>
      </div>
    </div>
  );
}