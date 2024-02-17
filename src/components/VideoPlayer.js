import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const VideoPlayer = ({ videoUrl, autoplay, playbackSpeed }) => {
  const [playing, setPlaying] = useState(autoplay);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(playbackSpeed);
  const playerRef = useRef(null);

  const handlePlayPause = () => setPlaying(!playing);

  const handleProgress = (progress) => {
    if (!seeking) {
      setPlayed(progress.played);
      setCurrentTime(progress.playedSeconds);
    }
  };

  const handleSeekMouseDown = () => setSeeking(true);

  const handleSeekChange = (e) => {
    const seekTo = parseFloat(e.target.value);
    setPlayed(seekTo);
    setCurrentTime(seekTo * duration);
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    const seekTo = parseFloat(e.target.value);
    playerRef.current.seekTo(seekTo);
  };

  const handleDuration = (duration) => setDuration(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing && currentTime < duration) {
        setCurrentTime(currentTime + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playing, currentTime, duration]);

  useEffect(() => {
    // Set playback speed when it changes
    playerRef.current && (playerRef.current.playbackRate = speed);
  }, [speed]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="video-player">
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="640px"
        height="360px"
        playbackRate={speed}
      />
      <div>
      <button onClick={handlePlayPause}  style={{
            backgroundColor: '#f2f2f2',
            color: '#333',           
            borderRadius: '10%',     
            padding: '10px',         
            border: 'none',          
            cursor: 'pointer',       
          }}>
          {playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onChange={handleSeekChange}
          onMouseDown={handleSeekMouseDown}
          onMouseUp={handleSeekMouseUp}
        />
        <div>
          <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
        </div>
        <label>Playback Speed:</label>
        <select value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))}>
        <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
      </div>
    </div>
  );
};

export default VideoPlayer;
