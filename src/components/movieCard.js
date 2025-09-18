import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useMovieContext();
  const fav = isFavorite(movie.id);

  const onFavClick = (e) => {
    e.preventDefault(); // prevent link navigation
    toggleFavorite(movie);
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="poster-container" style={{ position: 'relative' }}>
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className="poster-placeholder">
            <span>{movie.title}</span>
          </div>
        )}

        {/* Heart button */}
        <button
          onClick={onFavClick}
          aria-pressed={fav}
          title={fav ? 'Remove from favorites' : 'Add to favorites'}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: 'rgba(0,0,0,0.5)',
            border: 'none',
            color: fav ? '#f43f5e' : '#e2e8f0',
            fontSize: 18,
            borderRadius: 6,
            padding: '6px 8px',
            cursor: 'pointer',
          }}
        >
          {fav ? '♥' : '♡'}
        </button>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="release-year">
            {movie.release_date?.substring(0, 4) || 'N/A'}
          </span>
          <div className="rating">
            <span className="rating-value">
              {typeof movie.vote_average === 'number'
                ? movie.vote_average.toFixed(1)
                : 'N/A'}
            </span>
            <span className="rating-total">/10</span>
            <span className="vote-count">| {movie.vote_count ?? 0} votes</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
