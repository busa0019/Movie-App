import React from 'react';
import { useMovieContext } from '../context/MovieContext';

const GenreFilter = () => {
  const { genres, selectedGenre, setSelectedGenre } = useMovieContext();

  return (
    <div className="genre-filter">
      <select
        value={selectedGenre || ''}
        onChange={(e) => setSelectedGenre(e.target.value ? parseInt(e.target.value) : null)}
        aria-label="Filter by genre"
      >
        <option value="">All Genres</option>
        {genres.map(genre => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;