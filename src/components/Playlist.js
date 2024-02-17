import React, { useState } from 'react';

const Playlist = ({ videos, onVideoClick }) => {
  const [playlist, setPlaylist] = useState(videos);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(playlist);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPlaylist(items);
  };

  return (
    <div className="playlist">
    <h2>Playlist</h2>
    {videos.map((video) => (
      <div key={video.id} onClick={() => onVideoClick(video)} className="playlist-item">
        {video.title}
      </div>
    ))}
  </div>
  );
};

export default Playlist;
