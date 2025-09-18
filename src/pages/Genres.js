import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function Genres() {
  const {
    genres,
    selectedGenre,
    setSelectedGenre,
    genreMovies,
    isLoading,
    loadMoreGenre,
    hasMoreGenre,
  } = useMovieContext();

  return (
    <div className="genres-page">
      <div className="container">
        <div className="genre-selector">
          <h2>Browse by Genre</h2>
          <div className="genre-tags">
            {genres.map((g) => (
              <button
                key={String(g.id)}
                className={`genre-tag ${selectedGenre?.id === g.id ? 'active' : ''}`}
                onClick={() => setSelectedGenre(g)}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        <h2>{selectedGenre ? selectedGenre.name : 'All'} Movies</h2>

        <div className="movie-grid">
          {genreMovies.map((m) => <MovieCard key={m.id} movie={m} />)}
        </div>

        {hasMoreGenre && (
          <div className="load-more">
            <button onClick={loadMoreGenre} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
