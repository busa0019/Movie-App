import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function Genres() {
  const { 
    genres, 
    selectedGenre, 
    setSelectedGenre, 
    genreMovies, 
    isLoading,
    loadMore,
    currentPage,
    totalPages,
    setCurrentPage  // Added setCurrentPage
  } = useMovieContext();

  return (
    <div className="genres-page">
      <div className="container">
        <div className="genre-selector">
          <h2>Browse by Genre</h2>
          <div className="genre-tags">
            {genres.map(genre => (
              <button
                key={genre.id}
                className={`genre-tag ${selectedGenre && selectedGenre.id === genre.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedGenre(genre);
                  setCurrentPage(1); // Now defined
                }}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
        
        <h2>{selectedGenre ? selectedGenre.name : 'All'} Movies</h2>
        
        <div className="movie-grid">
          {genreMovies && genreMovies.map(movie => (
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