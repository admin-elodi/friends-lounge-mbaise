import React, { useState } from "react";

export default function MessageBanner() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-5 text-amber-950">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
            Call For Reflection & Action
          </span>
          <h2 className="text-sm font-bold text-gray-900">
            Donameche Crescent Road Completion
          </h2>
        </div>
        <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">
          29-09-2026
        </span>
      </div>

      <p className="text-xs text-gray-700 leading-relaxed mt-2">
        "Community development should never become a contest of personalities or resentment. When someone takes the initiative to improve an area that benefits everyone, the proper response should be encouragement, cooperation, and a willingness to contribute."
      </p>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-amber-200/60 text-xs text-gray-700 space-y-2 leading-relaxed">
          <p>
            In 2024, the major portion of Donameche Crescent was completed after remaining inaccessible for decades. Approximately 150 yards remain incomplete—an area belonging to brothers and families living in the US, UK, Canada, and working in international organizations like the United Nations.
          </p>
          <p className="font-medium text-gray-900">
            "If the people whose properties and interests are situated in this area genuinely value the road, there is still an opportunity to come together and complete it. Let us choose to sow cooperation, unselfishness, unity, and development."
          </p>
          <p className="text-[11px] text-gray-500 italic">
            — Sir (Chief) Santoma Zereuwa Onyemerekwe Joel-Ibeneche Esq (Madu-Ka-Aku)
          </p>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-xs font-semibold text-amber-900 hover:text-black mt-2 underline"
      >
        {expanded ? "Collapse statement" : "Read message summary"}
      </button>
    </div>
  );
}