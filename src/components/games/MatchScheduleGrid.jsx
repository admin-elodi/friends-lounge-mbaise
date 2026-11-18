import React from 'react';
import { Calendar, Utensils, Sparkles, Tv, ShieldAlert } from 'lucide-react';

export default function MatchScheduleGrid({
  scheduledList = [],
  onOpenTable,
  onOpenFood,
  onOpenBookEvent,
}) {
  const matches = Array.isArray(scheduledList) ? scheduledList : [];

  return (
    <section className="my-8 sm:my-10 space-y-5 sm:space-y-6">
      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <button
          onClick={onOpenTable}
          type="button"
          className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-600 transition-all flex items-center justify-center gap-3 font-semibold text-sm text-white shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          <Calendar className="w-5 h-5 text-red-500" /> Reserve a Table
        </button>
        <button
          onClick={onOpenFood}
          type="button"
          className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-600 transition-all flex items-center justify-center gap-3 font-semibold text-sm text-white shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          <Utensils className="w-5 h-5 text-red-500" /> Order Food & Drinks
        </button>
        <button
          onClick={onOpenBookEvent}
          type="button"
          className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-600 transition-all flex items-center justify-center gap-3 font-semibold text-sm text-white shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-5 h-5 text-red-500" /> Book an Event
        </button>
      </div>

      {/* Broadcast schedule */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-neutral-800 mb-4">
          <div className="flex items-center gap-2">
            <Tv className="w-5 h-5 text-red-500" />
            <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
              Televised Match Broadcasts
            </h3>
          </div>
          <span className="self-start sm:self-auto text-[11px] sm:text-xs text-neutral-400 bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">
            Live at Friends Lounge
          </span>
        </div>

        {matches.length === 0 ? (
          <div className="py-8 text-center border border-dashed border-neutral-800 rounded-xl bg-black/30">
            <ShieldAlert className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
            <p className="text-xs text-neutral-400 font-medium">
              No upcoming match fixtures currently scheduled.
            </p>
            <p className="text-[11px] text-neutral-500 mt-1 px-4">
              Check back soon or use the Admin panel to post upcoming games.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {matches.map((match) => (
              <div
                key={match.$id || match.id}
                className="p-4 rounded-xl bg-black/50 border border-neutral-800 hover:border-neutral-700 transition flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-red-400 font-bold bg-red-500/10 px-2.5 py-0.5 rounded border border-red-500/20 truncate">
                    {match.competition || 'Matchday'}
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-400 font-semibold whitespace-nowrap">
                    {match.date} • {match.time}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 py-1">
                  <div className="text-sm font-bold text-white flex items-center gap-2 min-w-0">
                    <span className="truncate">{match.homeTeam}</span>
                    <span className="text-xs text-red-500 font-extrabold shrink-0">VS</span>
                    <span className="truncate">{match.awayTeam}</span>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 shrink-0">
                    {match.status || 'Scheduled'}
                  </span>
                </div>

                {match.announcement && (
                  <p className="text-xs text-neutral-400 italic border-t border-neutral-800/60 pt-2 leading-relaxed">
                    "{match.announcement}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export { MatchScheduleGrid };