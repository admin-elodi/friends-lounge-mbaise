import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import flmSounds from "@/assets/audio/flm-sounds.mp3";

// Lifted out of Hero.jsx so the background music track - and the button
// controlling it - can live in Header.jsx (rendered on every page) without
// the audio being torn down every time the route changes. The <audio>
// element is mounted once here, at the top of the app, and persists for
// the whole session regardless of navigation.

const FADE_DURATION = 800; // ms, for fading volume in/out on toggle

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [isMusicMuted, setIsMusicMuted] = useState(true);
  const [hasStartedMusic, setHasStartedMusic] = useState(false);

  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  const fadeAudioTo = useCallback((target, onComplete) => {
    const audio = audioRef.current;
    if (!audio) return;

    clearInterval(fadeIntervalRef.current);

    const steps = 20;
    const stepTime = FADE_DURATION / steps;
    const startVolume = audio.volume;
    const delta = target - startVolume;
    let stepCount = 0;

    fadeIntervalRef.current = setInterval(() => {
      stepCount += 1;
      const progress = stepCount / steps;
      audio.volume = Math.min(1, Math.max(0, startVolume + delta * progress));

      if (stepCount >= steps) {
        clearInterval(fadeIntervalRef.current);
        audio.volume = target;
        onComplete?.();
      }
    }, stepTime);
  }, []);

  // Cleanup fade interval on unmount
  useEffect(() => {
    return () => {
      clearInterval(fadeIntervalRef.current);
    };
  }, []);

  // Music only starts when the user explicitly triggers toggleMusicMute()
  const toggleMusicMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasStartedMusic) {
      // First explicit click to turn on music
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          setHasStartedMusic(true);
          setIsMusicMuted(false);
          fadeAudioTo(1);
        })
        .catch((err) => {
          console.error("Playback failed on toggle:", err);
        });
    } else if (isMusicMuted || audio.paused) {
      // Unmute / Resume
      setIsMusicMuted(false);
      if (audio.paused) {
        audio.play().catch(() => {});
      }
      fadeAudioTo(1);
    } else {
      // Mute
      setIsMusicMuted(true);
      fadeAudioTo(0, () => {
        audio.pause();
      });
    }
  }, [hasStartedMusic, isMusicMuted, fadeAudioTo]);

  return (
    <MusicContext.Provider value={{ isMusicMuted, hasStartedMusic, toggleMusicMute }}>
      <audio ref={audioRef} src={flmSounds} loop preload="auto" />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return ctx;
}