import React, { useState, useEffect, useRef } from 'react';

function PodcastPlayer({ podcast }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`podcast_progress_${podcast._id}`);
    if (savedProgress) {
      setCurrentTime(parseFloat(savedProgress));
      playerRef.current.currentTime = parseFloat(savedProgress);
    }
  }, [podcast._id]);

  const handlePlayPause = () => {
    if (isPlaying) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(playerRef.current.currentTime);
    localStorage.setItem(`podcast_progress_${podcast._id}`, playerRef.current.currentTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    localStorage.removeItem(`podcast_progress_${podcast._id}`);
  };

  return (
    <div className="podcast-player">
      {podcast.type === 'audio' ? (
        <audio
          ref={playerRef}
          src={podcast.fileUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      ) : (
        <video
          ref={playerRef}
          src={podcast.fileUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      )}
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <div>Current Time: {Math.floor(currentTime)} seconds</div>
    </div>
  );
}

export default PodcastPlayer;