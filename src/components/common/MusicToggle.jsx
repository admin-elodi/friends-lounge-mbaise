import React from "react";
import { motion } from "framer-motion";
import { useMusic } from "@/context/MusicContext";

// A sturdy, landscape-rectangular button with an explicit ON/OFF label next
// to the equalizer bars, plus a small caption underneath identifying what
// it controls — so its purpose and current state are obvious without
// needing to hover or guess what a speaker icon means.
export default function MusicToggle({ className = "" }) {
  const { isMusicMuted, hasStartedMusic, toggleMusicMute } = useMusic();
  const isPlaying = hasStartedMusic && !isMusicMuted;

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <motion.button
        onClick={toggleMusicMute}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isPlaying ? "Mute background music" : "Unmute background music"}
        className={`relative flex items-center justify-center gap-2 w-24 h-10 rounded-lg cursor-pointer border-2 shadow-[0_3px_0_rgba(0,0,0,0.4)] hover:shadow-[0_2px_0_rgba(0,0,0,0.4)] hover:translate-y-[1px] transition-all duration-200 ${
          isPlaying
            ? "bg-amber-500/40 border-amber-300 hover:bg-amber-500/55"
            : "bg-black/70 border-white/50 hover:bg-black/85 hover:border-white/70"
        }`}
      >
        {isPlaying && (
          <motion.span
            className="absolute inset-0 rounded-lg border border-amber-300/60"
            animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <span className="flex items-end gap-[3px] h-4">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className={`w-[3px] rounded-full ${isPlaying ? "bg-amber-100" : "bg-white/80"}`}
              animate={
                isPlaying
                  ? { height: ["30%", "100%", "45%", "80%", "30%"] }
                  : { height: "25%" }
              }
              transition={
                isPlaying
                  ? { duration: 1 + i * 0.15, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.3 }
              }
            />
          ))}
        </span>

        <span
          className={`text-[11px] font-bold tracking-wide ${
            isPlaying ? "text-amber-50" : "text-white/80"
          }`}
        >
          {isPlaying ? "ON" : "OFF"}
        </span>
      </motion.button>

      <span className="text-[9px] uppercase tracking-widest text-white whitespace-nowrap">
        Site Soundtrack
      </span>
    </div>
  );
}
