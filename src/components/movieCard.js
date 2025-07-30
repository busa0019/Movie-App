import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="poster-container">
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
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="release-year">
            {movie.release_date?.substring(0, 4) || 'N/A'}
          </span>
          <div className="rating">
            <span className="rating-value">{movie.vote_average.toFixed(1)}</span>
            <span className="rating-total">/10</span>
            <span className="vote-count">| {movie.vote_count} votes</span>
          </div>
        </div>
      </div>
    </Link>
  );
}