import React from 'react'
import search_icon from '../assets/search.svg'

const Search = ({searchTerm, setSearchTerm}) => {
    
  return (
    <div className="search">
      <div>
        <img src={search_icon} alt="" />

        <input
          type="text"
          placeholder="Search a Every cinematic Movies "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Search