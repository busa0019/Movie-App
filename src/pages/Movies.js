import { useState, useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function Movies() {
  const { popular, isLoading, loadMore, currentPage, totalPages } = useMovieContext();
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    // Check if popular exists and has results
    if (popular && popular.results) {
      if (currentPage === 1) {
        setAllMovies(popular.results);
      } else {
        setAllMovies(prev => [...prev, ...popular.results]);
      }
    }
  }, [popular, currentPage]);

  return (
    <div className="movies-page">
      <div className="container">
        <h1>All Movies</h1>
        
        <div className="movie-grid">
          {allMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        {currentPage < totalPages && (
          <div className="load-more">
            <button onClick={loadMore} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}