import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import flmSounds from "@/assets/audio/flm-sounds.mp3";

// Lifted out of Hero.jsx so the background music track — and the button
// controlling it — can live in Header.jsx (rendered on every page) without
// the audio being torn down every time the route changes. The <audio>
// element is mounted once here, at the top of the app, and persists for
// the whole session regardless of navigation.

const FADE_DURATION = 800; // ms, for fading volume in/out on toggle

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [hasStartedMusic, setHasStartedMusic] = useState(false);

  const audioRef = useRef(null);
  const hasInteractedRef = useRef(false);
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

  // Starts the background track the first time the user interacts with the
  // page. Only a SUCCESSFUL play() consumes the listeners — some gestures
  // (notably `scroll`) don't count as real user-activation in most browsers
  // and get silently rejected by the autoplay policy. If we removed the
  // listeners regardless of success, one failed scroll-triggered attempt
  // would permanently block every later click/keydown from ever starting
  // the music. Only give up trying once we've actually succeeded.
  useEffect(() => {
    const startMusic = () => {
      if (hasInteractedRef.current) return;

      const audio = audioRef.current;
      if (!audio) return;

      audio.volume = 0;
      audio
        .play()
        .then(() => {
          hasInteractedRef.current = true;
          setHasStartedMusic(true);
          fadeAudioTo(1);
          removeListeners();
        })
        .catch(() => {
          // Blocked by the browser's autoplay policy for this gesture —
          // leave the listeners active so the next interaction can retry.
        });
    };

    const events = ["click", "scroll", "touchstart", "keydown"];
    events.forEach((evt) =>
      window.addEventListener(evt, startMusic, { passive: true })
    );

    function removeListeners() {
      events.forEach((evt) => window.removeEventListener(evt, startMusic));
    }

    return () => {
      removeListeners();
      clearInterval(fadeIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMusicMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMusicMuted || audio.paused) {
      setIsMusicMuted(false);
      if (audio.paused) {
        audio.volume = 0;
        audio.play().then(() => setHasStartedMusic(true)).catch(() => {});
      }
      fadeAudioTo(1);
    } else {
      setIsMusicMuted(true);
      fadeAudioTo(0);
    }
  }, [isMusicMuted, fadeAudioTo]);

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
