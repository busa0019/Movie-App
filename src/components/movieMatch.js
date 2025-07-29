import React, { useState } from 'react';
import { useMovieContext } from '../context/MovieContext';

const MovieMatch = () => {
  const { movies } = useMovieContext();
  const [friendName, setFriendName] = useState('');
  const [matchResult, setMatchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const findMovieMatch = () => {
    if (!friendName.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const allMovies = [
        ...movies.trending,
        ...movies.popular,
        ...movies.top_rated
      ];
      
      const shuffled = [...allMovies].sort(() => 0.5 - Math.random());
      const recommendations = shuffled.slice(0, 3);
      
      setMatchResult({
        friendName,
        recommendations
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="movie-match">
      <h2>Movie Match</h2>
      <p>Find movies you and your friends both love!</p>
      
      <div className="match-form">
        <input
          type="text"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
          placeholder="Enter friend's name"
          aria-label="Friend's name"
        />
        <button onClick={findMovieMatch} disabled={isLoading}>
          {isLoading ? 'Finding matches...' : 'Find Match'}
        </button>
      </div>
      
      {matchResult && (
        <div className="match-result">
          <h3>Movies for {matchResult.friendName} and You</h3>
          <div className="recommendations">
            {matchResult.recommendations.map(movie => (
              <div key={movie.id} className="recommendation-card">
                {movie.poster_path ? (
                  <img 
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                    alt={movie.title} 
                  />
                ) : (
                  <div className="recommendation-placeholder">
                    <span>{movie.title}</span>
                  </div>
                )}
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
          <p className="match-message">
            You both have great taste! These movies match your preferences.
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieMatch;