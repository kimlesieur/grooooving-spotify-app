import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';
import React, { useState } from 'react';
const utils = require('../../utils/utils');
const spotify = utils();

function App() {
  spotify.getAccessToken();
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("My new playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  
  const updatePlaylistName = (name) => {
    return setPlaylistName(name);
  };

  const addTrack = (track) => {
    const test = playlistTracks.find(savedTracks => savedTracks.id === track.id );
      if(test){
        return null;
      }
      setPlaylistTracks([...playlistTracks, track]);

  };

  const removeTrack = (track) => {
    const newArray = playlistTracks.filter(savedTracks => savedTracks.id !== track.id)
    setPlaylistTracks(newArray);
  };

  const savePlaylist = async () => {
    const trackURIs = [];
    playlistTracks.forEach(track => {
      trackURIs.push(track.uri)
    });
    await spotify.savePlaylist(playlistName, trackURIs);
    setPlaylistTracks([]);
    setPlaylistName("New playlist");
  };

  const search = async (searchTerm) => {
    spotify.getAccessToken();
    const results = await spotify.search(searchTerm);
    setSearchResults(results);
  };

  return (
    <div>
    <h1>Gr<span className="highlight">oooo</span>ving</h1>
    <div className="App">
      <SearchBar onSearch={search} /> 
      <div className="App-playlist">
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onNameChange={updatePlaylistName} onRemove={removeTrack} onSave={savePlaylist}  />
      </div>
    </div>
  </div>
  );
}

export default App;
