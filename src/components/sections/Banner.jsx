// Banner.jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

import soupKitchenFlyer from "@/assets/images/soup-kitchen.jpg";

export default function Banner() {
  const [showImpact, setShowImpact] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const navigate = useNavigate();

  const handlePrograms = () => {
    navigate("/programs");
  };

 
// Week 1 ended on Saturday, April 4, 2026 at 6:00 PM
  const firstSoupKitchenEnd = new Date("2026-04-04T18:00:00");

  // Current date/time
  const now = new Date();

  const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;

  // Number of COMPLETED soup kitchens
  const completedWeeks =
    Math.floor((now - firstSoupKitchenEnd) / millisecondsPerWeek) + 1;

  // Impact section
  const currentWeek = Math.max(completedWeeks, 0);

  // Banner section
  const nextWeek = currentWeek + 1;

  // Find next Saturday after the current event cycle
  const nextSaturday = new Date(now);

  const daysUntilSaturday =
    ((6 - now.getDay() + 7) % 7) ||
    (now.getHours() >= 18 ? 7 : 0);

  nextSaturday.setDate(now.getDate() + daysUntilSaturday);
  nextSaturday.setHours(0, 0, 0, 0);

  const nextDate = nextSaturday.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const supportMessage = encodeURIComponent(
    `Hello, Please find evidence of my support for Friends Lounge Soup Kitchen as paid to the account details below:\n\nAccount Name: JUST FRIENDS INVESTMENT LTD\nAccount Number: 3001586851\nBank: GUARANTY TRUST BANK`
  );

  // Portal-based modal — renders directly into document.body,
  // guaranteeing fixed positioning is relative to the true viewport
  // on both mobile and desktop regardless of ancestor transforms.
  const supportModal =
    showSupport &&
    ReactDOM.createPortal(
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
        onClick={() => setShowSupport(false)}
      >
        <div
          className="bg-black/95 border border-white/30 p-6 md:p-8 max-w-md w-full rounded-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowSupport(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl leading-none"
          >
            x
          </button>

          <img
            src={soupKitchenFlyer}
            alt="Support Soup Kitchen"
            className="w-full rounded-md border border-white/10 mb-6"
          />
          <h1 className="text-white text-center">To Support This Project...</h1>

          <div className="text-center space-y-4">
            <div className="text-sm text-white space-y-1">
              <p className="uppercase tracking-widest text-white/50">Bank Details</p>
              <p>JUST FRIENDS INVESTMENT LTD</p>
              <p>3001586851</p>
              <p>GUARANTY TRUST BANK</p>
            </div>

            <a
              href={`https://wa.me/447848149416?text=${supportMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-3.5 bg-emerald-200 text-black text-sm font-semibold uppercase tracking-widest hover:bg-emerald-400 transition-all rounded-lg"
            >
              Send Evidence
            </a>

            <button
              onClick={() => setShowSupport(false)}
              className="text-white/60 hover:text-white text-lg font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <div className="w-full">
      {/* TOP LABEL */}
      <div className="w-screen -ml-4 md:ml-0 md:w-[700px] text-center py-2 bg-black/80 backdrop-blur-xl border-t border-white/60">
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.30em] text-white/50">
          Community Impact Spotlight
        </p>
      </div>

      {/* MAIN BANNER */}
      <div
        className="relative overflow-hidden w-screen -ml-4 md:ml-0 md:w-[700px] h-[180px] md:h-[220px] border-1 border-white/70 rounded-[6px]"
        style={{
          backgroundImage: `url(${soupKitchenFlyer})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/90 to-black/80" />

        <div className="relative z-10 h-full flex items-center justify-center px-3 md:px-6 py-6 text-center">
          {!showImpact ? (
            <div className="space-y-1.5 md:space-y-2 w-full max-w-lg">
              <p className="text-[11px] md:text-base uppercase tracking-[0.25em] text-white font-semibold">
                ANODALIFE CHILDREN HOME INITIATIVE
              </p>

              <p className="text-[9.7px] md:text-xs uppercase tracking-widest text-white/70">
                in conjunction with{" "}
                <span className="text-white font-bold">Friends' Lounge</span> presents...
              </p>

              <div className="pt-1">
                <p className="text-sm md:text-xl font-bold text-green-300 tracking-wider leading-none animate-pulse drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]">
                  SOUP KITCHEN WEEK {nextWeek}
                </p>
              </div>

              <p className="text-[11px] md:text-sm text-white/80 font-bold">
                {nextDate} • 2PM–6PM @ Friends Lounge Rooftop Bar
              </p>

              <div className="pt-2 flex gap-2 justify-center">
                <button
                  onClick={() => setShowImpact(true)}
                  className="px-6 py-2.5 bg-black/70 border border-white/20 rounded-md text-white text-xs uppercase tracking-[0.18em] hover:bg-white hover:text-black transition-all duration-300"
                >
                  View Impact
                </button>

                <button
                  onClick={() => setShowSupport(true)}
                  className="px-6 py-2.5 bg-emerald-200/30 border border-emerald-400 rounded-md text-white font-bold text-xs uppercase tracking-[0.18em] hover:bg-emerald-400 transition-all duration-300"
                >
                  Support
                </button>
              </div>
            </div>
          ) : (
            /* IMPACT VIEW */
            <div className="w-full max-w-md text-center space-y-[2px]">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                COMMUNITY IMPACT
              </p>
              <p className="text-[14px] font-semibold text-green-200">
                {currentWeek} SOUP KITCHENS SERVED SO FAR
              </p>
              <p className="text-xs text-yellow-100 capitalize">
                Feeding about 300 Persons Weekly
              </p>
              <p className="text-xs text-white/60">
                IN UMUOFOR COMMUNITY - EVERY SATURDAY 2PM-6PM
              </p>
              <p className="text-xs text-white/60">
                Initiated by{" "}
                <span className="font-bold text-white">
                  ANODALIFE CHILDREN HOME INITIATIVE
                </span>{" "}
                &{" "}
                <span className="font-bold text-white">
                  Friends' Lounge Mbaise
                </span>
              </p>

              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={() => setShowImpact(false)}
                  className="text-white px-5 py-2 bg-black/60 border border-white/20 rounded-md text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handlePrograms}
                  className="px-5 py-2 bg-emerald-200/50 border border-emerald-200 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-emerald-400 transition-all"
                >
                  Programs
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Portal modal renders here — outside the component tree */}
      {supportModal}

      {/* CONTACT STRIP */}
      <div className="w-screen -ml-4 md:ml-0 md:w-[700px] bg-black/80 border-t border-white/10 py-2 text-center">
        <a
          href="https://wa.me/2347066064379?text=Hello%2C%20I%20would%20like%20to%20support%20the%20Soup%20Kitchen%20Initiative..."
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] md:text-xs uppercase tracking-[0.22em] text-white/50 hover:text-white transition-colors"
        >
          Support - Volunteer - Partner - 0706 606 4379
        </a>
      </div>
    </div>
  );
}