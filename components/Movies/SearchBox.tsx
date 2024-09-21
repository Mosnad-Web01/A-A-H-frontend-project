// SearchBox.js
import React from 'react';

const SearchBox = ({ searchValue, setSearchValue }) => {
  return (
    <input
      className="search-box"
      type="text"
      placeholder="Search movies..."
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)} // Update search value on change
    />
  );
};

export default SearchBox;
