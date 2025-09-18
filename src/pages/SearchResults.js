import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function SearchResults() {
  const { searchResults, isLoading, searchQuery } = useMovieContext();

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading search results...</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="container">
        <h2>Search Results for "{searchQuery}"</h2>
        {searchResults.length > 0 ? (
          <div className="movie-grid">
            {searchResults.map((m) => <MovieCard key={m.id} movie={m} />)}
          </div>
        ) : (
          <p>No movies found. Try another search.</p>
        )}
      </div>
    </div>
  );
}
