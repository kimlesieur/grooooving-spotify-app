import './Track.css';
import React from 'react';

function Track({track, isRemoval, onAdd, onRemove}) {

  const renderAction = () => {
    if(isRemoval){
      return <button className="Track-action" onClick={removeTrack}>-</button>
    }
    return <button className="Track-action" onClick={addTrack} >+</button>
  };

  const addTrack = () => {
    onAdd(track);
  };

  const removeTrack = () => {
    onRemove(track);
  };

  return (
    <div className="Track">
    <div className="Track-information">
      <h3>{track.name}</h3>
      <p>{track.artist} - {track.album}</p>
    </div>
    {renderAction()}
  </div>
  );
}

export default Track;