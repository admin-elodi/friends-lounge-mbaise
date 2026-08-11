import React from "react";
import {
  getSoupKitchenStatus,
  PARTNER_NAME,
  VENUE,
} from "@/data/soupKitchen";

// Live counters for the Soup Kitchen program detail view — same
// getSoupKitchenStatus() source Banner.jsx's teaser reads from, so the
// numbers here can never drift out of sync with the homepage.
function StatCard({ label, value }) {
  return (
    <div className="rounded-xl bg-stone-800/50 border border-stone-500/30 px-3 py-4 text-center">
      <p className="text-lg md:text-xl font-bold text-stone-50 leading-none whitespace-nowrap">
        {value}
      </p>
      <p className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 mt-2">
        {label}
      </p>
    </div>
  );
}

export default function SoupKitchenStats() {
  const { completedEditions, nextEditionNumber, nextSaturday } =
    getSoupKitchenStatus();

  // No weekday prefix ("Sat,") — that's what was pushing this past one line.
  const nextDate = nextSaturday.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Editions Served" value={completedEditions} />
        <StatCard label="Next Edition" value={`#${nextEditionNumber}`} />
        <StatCard label="Next Saturday" value={nextDate} />
        <StatCard label="Weekly Reach" value="~300" />
      </div>
      <p className="text-center text-xs md:text-sm text-stone-400 uppercase tracking-widest">
        {VENUE} &middot; Every Saturday 2PM–6PM
      </p>
      <p className="text-center text-xs md:text-sm text-stone-400">
        Initiated by <span className="font-semibold text-stone-100">{PARTNER_NAME}</span> &{" "}
        <span className="font-semibold text-stone-100">Friends' Lounge Mbaise</span>
      </p>
    </div>
  );
}
