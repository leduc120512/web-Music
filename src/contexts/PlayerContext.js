import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  const playSong = useCallback((song) => {
    if (!song?.audioSrc) return;

    setCurrentSong((prev) => {
      const sameSong = prev?.id && song?.id && String(prev.id) === String(song.id);
      const sameSource = prev?.audioSrc === song.audioSrc;

      if (sameSong || sameSource) {
        setShouldAutoPlay(true);
        return { ...prev, ...song };
      }

      setCurrentTime(0);
      setDuration(0);
      setShouldAutoPlay(true);
      return song;
    });
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.audioSrc) return;

    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [currentSong?.audioSrc]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Number(time) || 0;
    setCurrentTime(audio.currentTime);
  }, []);

  const changeVolume = useCallback((nextVolume) => {
    const normalizedVolume = Math.min(1, Math.max(0, Number(nextVolume) || 0));
    setVolume(normalizedVolume);
    if (audioRef.current) {
      audioRef.current.volume = normalizedVolume;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.audioSrc || !shouldAutoPlay) return;

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
    setShouldAutoPlay(false);
  }, [currentSong?.audioSrc, shouldAutoPlay]);

  const value = useMemo(
    () => ({
      audioRef,
      currentSong,
      isPlaying,
      duration,
      currentTime,
      volume,
      playSong,
      togglePlay,
      pause,
      seek,
      changeVolume,
      setIsPlaying,
      setDuration,
      setCurrentTime,
    }),
    [changeVolume, currentSong, currentTime, duration, isPlaying, pause, playSong, seek, togglePlay, volume],
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        src={currentSong?.audioSrc || ""}
        preload="metadata"
        crossOrigin="anonymous"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime || 0)}
        onEnded={() => setIsPlaying(false)}
      />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used inside PlayerProvider");
  }
  return context;
}
