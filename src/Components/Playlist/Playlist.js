import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import React from 'react';

function Playlist({playlistName, playlistTracks, onNameChange, onRemove, onSave}) {
  const handleNameChange = (event) => {
    event.preventDefault();
    onNameChange(event.target.value);
  };

  const isRemoval = true;

  return (
    <div className="Playlist">
    <input value={playlistName} onChange={handleNameChange} />
    <TrackList results={playlistTracks} isRemoval={isRemoval} onRemove={onRemove} />
    <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;