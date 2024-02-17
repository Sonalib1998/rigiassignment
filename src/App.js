import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Playlist from './components/Playlist';
import video from './assets/sample.mp4'
import video1 from './assets/sample1.mp4'
import video2 from './assets/sample2.mp4'


const App = () => {
  const initialPlaylist = [
    { id: 1, title: 'Sample 1', url: video },
    { id: 2, title: 'Sample 2', url: video1 },
    { id: 3, title: 'Sample 3', url: video2 }
  ];

  const [selectedVideo, setSelectedVideo] = useState(initialPlaylist[0]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="app">
    <VideoPlayer
      videoUrl={selectedVideo.url}
      autoplay={true}
      playbackSpeed={1}
    />
    <Playlist videos={initialPlaylist} onVideoClick={handleVideoClick} />
  </div>
  );
};

export default App;
