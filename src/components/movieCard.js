import React from 'react';
import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

const MovieCard = ({ movie }) => {
  const { addToWatchlist, watchlist } = useMovieContext();
  const isInWatchlist = watchlist.some(m => m.id === movie.id);

  return (
    <div className="movie-card">
      {movie.poster_path ? (
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
          className="poster"
        />
      ) : (
        <div className="poster-placeholder">{movie.title}</div>
      )}
      
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="meta">
          <span className="rating">⭐ {movie.vote_average}</span>
          <span>{movie.release_date.substring(0, 4)}</span>
        </div>
        <p className="overview">{movie.overview.substring(0, 100)}...</p>
        
        <div className="actions">
          <Link to={`/movie/${movie.id}`} className="btn">
            Details
          </Link>
          <button 
            className={`btn ${isInWatchlist ? 'added' : ''}`} 
            onClick={() => !isInWatchlist && addToWatchlist(movie)}
            disabled={isInWatchlist}
          >
            {isInWatchlist ? '✓ Added' : '+ Watchlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;