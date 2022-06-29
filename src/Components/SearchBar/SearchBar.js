import './SearchBar.css';
import React from 'react';

function SearchBar({onSearch}) {

  const handleTermChange  = (e) => {
    e.preventDefault();
    onSearch(e.target.value);
  };

  return (
<div className="SearchBar">
  <input onChange={handleTermChange} placeholder="Enter A Song, Album, or Artist" />
  <button className="SearchButton">SEARCH</button>
</div>
  );
}

export default SearchBar;