import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

export default function MovieDetail() {
  const { id } = useParams();
  const { selectedMovie, getMovieDetails, isLoading } = useMovieContext();

  useEffect(() => {
    if (id) {
      getMovieDetails(id);
    }
  }, [id, getMovieDetails]);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (!selectedMovie) {
    return (
      <div className="movie-detail error">
        <h2>Movie Not Found</h2>
        <p>Sorry, we couldn't find the movie you're looking for.</p>
        <Link to="/" className="btn">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="movie-detail">
      {/* Backdrop */}
      <div 
        className="backdrop" 
        style={{ 
          backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})` 
        }}
      />
      
      <div className="container">
        <div className="movie-content">
          {/* Poster */}
          <div className="poster-container">
            {selectedMovie.poster_path ? (
              <img 
                src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} 
                alt={selectedMovie.title}
                className="movie-poster"
              />
            ) : (
              <div className="poster-placeholder">
                <span>No Image</span>
              </div>
            )}
          </div>
          
          {/* Details */}
          <div className="details">
            <h1 className="title">{selectedMovie.title}</h1>
            
            {selectedMovie.tagline && (
              <p className="tagline">{selectedMovie.tagline}</p>
            )}
            
            <div className="meta">
              <div className="release">
                <strong>Release Date:</strong> {selectedMovie.release_date}
              </div>
              
              <div className="rating">
                <strong>Rating:</strong> {selectedMovie.vote_average.toFixed(1)}/10 
                ({selectedMovie.vote_count} votes)
              </div>
              
              {selectedMovie.runtime && (
                <div className="runtime">
                  <strong>Runtime:</strong> {selectedMovie.runtime} minutes
                </div>
              )}
            </div>
            
            {selectedMovie.genres?.length > 0 && (
              <div className="genres">
                <strong>Genres:</strong>
                <div className="genre-list">
                  {selectedMovie.genres.map(genre => (
                    <span key={genre.id} className="genre-tag">{genre.name}</span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="overview">
              <h3>Overview</h3>
              <p>{selectedMovie.overview}</p>
            </div>
            
            {selectedMovie.director && (
              <div className="director">
                <strong>Director:</strong> {selectedMovie.director}
              </div>
            )}
            
            {selectedMovie.cast?.length > 0 && (
              <div className="cast">
                <strong>Cast:</strong>
                <div className="cast-list">
                  {selectedMovie.cast.join(', ')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}