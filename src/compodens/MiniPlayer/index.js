import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

import { usePlayer } from "../../contexts/PlayerContext";
import "./MiniPlayer.css";

const formatTime = (value) => {
  const totalSeconds = Math.floor(Number(value) || 0);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

function MiniPlayer() {
  const {
    currentSong,
    isPlaying,
    duration,
    currentTime,
    volume,
    togglePlay,
    seek,
    changeVolume,
  } = usePlayer();

  if (!currentSong?.audioSrc) return null;

  return (
    <aside className="mini-player" aria-label="Trinh phat nhac">
      <div className="mini-player__top">
        <Link to={currentSong.path || "/"} className="mini-player__cover-link">
          <img className="mini-player__cover" src={currentSong.coverImage} alt={currentSong.title || "Bai hat"} />
        </Link>

        <div className="mini-player__meta">
          <Link to={currentSong.path || "/"} className="mini-player__title" title={currentSong.title}>
            {currentSong.title || "Bai hat dang phat"}
          </Link>
          <p className="mini-player__artist" title={currentSong.artistName}>
            {currentSong.artistName || "Dang cap nhat"}
          </p>
        </div>

        <button type="button" className="mini-player__play" onClick={togglePlay} aria-label={isPlaying ? "Tam dung" : "Phat"}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
      </div>

      <div className="mini-player__progress-row">
        <span>{formatTime(currentTime)}</span>
        <input
          className="mini-player__range"
          type="range"
          min="0"
          max={duration || 0}
          step="1"
          value={Math.min(currentTime, duration || currentTime || 0)}
          onChange={(event) => seek(event.target.value)}
        />
        <span>{formatTime(duration)}</span>
      </div>

      <div className="mini-player__volume">
        <FontAwesomeIcon icon={faVolumeHigh} />
        <input
          className="mini-player__range"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(event) => changeVolume(event.target.value)}
        />
      </div>
    </aside>
  );
}

export default MiniPlayer;
