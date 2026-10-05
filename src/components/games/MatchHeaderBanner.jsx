import React from 'react';
import { Radio, Clock, MapPin, Settings } from 'lucide-react';

export default function MatchHeaderBanner({ activeMatch, onOpenAdmin }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
      <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Featured Game</p>
            <p className="text-sm font-bold text-white truncate">
              {activeMatch ? `${activeMatch.homeTeam} vs ${activeMatch.awayTeam}` : "No match scheduled"}
            </p>
          </div>
        </div>
        <button
          onClick={onOpenAdmin}
          className="p-2 rounded-xl bg-neutral-800/60 hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
          title="Match Manager"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Kickoff</p>
          <p className="text-sm font-bold text-white">
            {activeMatch ? `${activeMatch.date} · ${activeMatch.time}` : "Check back soon"}
          </p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Location</p>
          <p className="text-sm font-bold text-white">Friends Lounge</p>
        </div>
      </div>
    </div>
  );
}