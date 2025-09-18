import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useMovieContext();
  const fav = isFavorite(movie.id);

  const onHeart = (e) => {
    e.preventDefault(); // stop navigating to details
    toggleFavorite(movie);
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="poster-container" style={{ position: 'relative' }}>
        {movie.poster_path ? (
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        ) : (
          <div className="poster-placeholder"><span>{movie.title}</span></div>
        )}
        <button
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          onClick={onHeart}
          style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(0,0,0,0.5)', color: fav ? '#ef4444' : '#e2e8f0',
            border: 'none', borderRadius: '999px', width: 36, height: 36, cursor: 'pointer',
            fontSize: 18, display: 'grid', placeItems: 'center'
          }}
          title={fav ? 'Remove favorite' : 'Add favorite'}
        >
          {fav ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="release-year">{movie.release_date?.substring(0, 4) || 'N/A'}</span>
          <div className="rating">
            <span className="rating-value">{(movie.vote_average ?? 0).toFixed(1)}</span>
            <span className="rating-total">/10</span>
            <span className="vote-count"> | {movie.vote_count ?? 0} votes</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
