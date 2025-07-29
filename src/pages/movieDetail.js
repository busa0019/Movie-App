// src/pages/MovieDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

const MovieDetail = () => {
  const { id } = useParams();
  const { getMovieDetails, addToWatchlist, watchlist, removeFromWatchlist } = useMovieContext();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const isInWatchlist = watchlist.some(m => m.id === Number(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id, getMovieDetails]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!movie) {
    return <div className="error-message">Movie not found</div>;
  }

  return (
    <div className="movie-detail">
      <div className="detail-header">
        <h1>{movie.title}</h1>
        <div className="detail-meta">
          <span>⭐ {movie.vote_average}</span>
          <span>{movie.release_date}</span>
          <span>{movie.runtime} min</span>
        </div>
      </div>
      
      <div className="detail-content">
        {movie.poster_path && (
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title}
            className="detail-poster"
          />
        )}
        
        <div className="detail-info">
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          
          <div className="detail-actions">
            <button 
              className={isInWatchlist ? 'remove' : 'add'}
              onClick={() => isInWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
            >
              {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
            </button>
            
            {movie.homepage && (
              <a 
                href={movie.homepage} 
                target="_blank" 
                rel="noopener noreferrer"
                className="official-site"
              >
                Official Website
              </a>
            )}
          </div>
          
          <div className="detail-cast">
            <h3>Cast</h3>
            <div className="cast-grid">
              {movie.credits?.cast?.slice(0, 6).map(person => (
                <div key={person.id} className="cast-member">
                  {person.profile_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} 
                      alt={person.name}
                    />
                  ) : (
                    <div className="cast-placeholder"></div>
                  )}
                  <p>{person.name}</p>
                  <p className="character">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;