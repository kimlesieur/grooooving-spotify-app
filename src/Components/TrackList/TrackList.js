import Track from '../Track/Track';
import './TrackList.css';
import React from 'react';

function TrackList({results, onAdd, isRemoval, onRemove}) {

  return (
    <div className="TrackList">
      {results.map(track => <Track key={track.id} track={track} isRemoval={isRemoval} onAdd={onAdd} onRemove={onRemove} />)
      }

    </div>  
  );
}

export default TrackList;