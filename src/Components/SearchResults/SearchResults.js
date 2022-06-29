import './SearchResults.css';
import TrackList from '../TrackList/TrackList';
import React from 'react';

function SearchResults({searchResults, onAdd}) {
  const isRemoval = false;
  return (
    <div className="SearchResults">
    <h2>Résultats</h2>
    <TrackList results={searchResults} onAdd={onAdd} isRemoval={isRemoval} />
    </div>
  );
}

export default SearchResults;