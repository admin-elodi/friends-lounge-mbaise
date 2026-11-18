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
      const cleanTime = activeMatch.time
        ? activeMatch.time.replace(/WAT|UTC|EST/gi, '').trim()
        : '00:00';
      const targetDateStr = `${activeMatch.date} ${cleanTime}`;
      const targetTime = new Date(targetDateStr).getTime();

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

  const hasMatch = Boolean(activeMatch);

  return (
    <div className="relative rounded-3xl bg-neutral-950 border border-neutral-800 p-2.5 sm:p-4 shadow-2xl overflow-hidden mb-8 sm:mb-12">
      {/* Screen container — taller on mobile, aspect-video on desktop */}
      <div className="relative w-full min-h-[440px] sm:min-h-0 sm:aspect-video rounded-2xl bg-gradient-to-b from-neutral-950 to-black overflow-hidden flex flex-col justify-between p-4 sm:p-6 border border-neutral-900">

        {/* subtle ambient glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-red-600/10 blur-3xl" />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
            {hasMatch ? (isMatchPast ? 'Match Day Live' : 'Upcoming Match') : 'Coming Up Next'}
          </span>
          <div className="flex items-center gap-2 text-neutral-400">
            <Volume2 className="w-4 h-4 cursor-pointer hover:text-white" />
            <Maximize2 className="w-4 h-4 cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Center stage */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-2 py-6 sm:py-0">
          <Tv className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-700 mb-3 sm:mb-4" />

          <h2 className="text-lg sm:text-xl font-bold text-white mb-2 leading-tight">
            {hasMatch
              ? `${activeMatch.homeTeam} vs ${activeMatch.awayTeam}`
              : 'No Match Scheduled Yet'}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 mb-4 max-w-md leading-relaxed">
            {hasMatch
              ? activeMatch.announcement
              : 'Check back soon for Live Match Screenings'}
          </p>

          {/* Teams placeholder when no match */}
          {!hasMatch && (
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-3">
              <span className="px-3 py-1.5 bg-neutral-900/70 rounded-md border border-neutral-800/60 text-neutral-500">
                Home Team
              </span>
              <span className="text-neutral-700 font-bold">VS</span>
              <span className="px-3 py-1.5 bg-neutral-900/70 rounded-md border border-neutral-800/60 text-neutral-500">
                Away Team
              </span>
            </div>
          )}

          {/* Date & time pill */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-3 py-1.5 bg-neutral-900/90 border border-neutral-800 rounded-full text-[11px] sm:text-xs font-medium mb-4">
            <span className="flex items-center gap-1.5 text-amber-500/90">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              {hasMatch?.date || '-- --, ----'}
            </span>
            <span className="text-neutral-700">•</span>
            <span className="flex items-center gap-1.5 text-amber-500/90">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {hasMatch?.time || '--:-- WAT'}
            </span>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-2 bg-neutral-950/80 px-3 sm:px-4 py-2 rounded-2xl border border-neutral-800/80">
            <Timer
              className={`w-4 h-4 ${
                hasMatch && !isMatchPast ? 'text-red-500 animate-pulse' : 'text-neutral-600'
              }`}
            />
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold text-neutral-200">
              {[
                { v: timeLeft.days, label: 'D', active: hasMatch },
                { v: timeLeft.hours, label: 'H', active: hasMatch },
                { v: timeLeft.minutes, label: 'M', active: hasMatch },
                { v: timeLeft.seconds, label: 'S', active: hasMatch, accent: true },
              ].map((seg, idx, arr) => (
                <React.Fragment key={seg.label}>
                  <div className="flex items-center gap-1 bg-neutral-900 px-1.5 sm:px-2 py-1 rounded">
                    <span
                      className={
                        seg.active
                          ? seg.accent
                            ? 'text-red-400'
                            : 'text-white'
                          : 'text-neutral-500'
                      }
                    >
                      {String(seg.v).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-neutral-500 font-sans uppercase">
                      {seg.label}
                    </span>
                  </div>
                  {idx < arr.length - 1 && <span className="text-neutral-600">:</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 flex items-center justify-between pt-4 border-t border-neutral-900/60">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> Friends Lounge
          </span>
          <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider">
            Live Screenings
          </span>
        </div>
      </div>
    </div>
  );
}