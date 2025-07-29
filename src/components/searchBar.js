import React, { useState } from 'react';
import { useMovieContext } from '../context/MovieContext';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { handleSearch } = useMovieContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        aria-label="Search movies"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;