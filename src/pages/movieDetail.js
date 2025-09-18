import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

export default function MovieDetail() {
  const { id } = useParams();
  const { selectedMovie, getMovieDetails, isLoading } = useMovieContext();

  useEffect(() => {
    if (id) getMovieDetails(id);
  }, [id, getMovieDetails]);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (!selectedMovie) {
    return (
      <div className="movie-detail error">
        <div className="container">
          <h2>Movie Not Found</h2>
          <p>Sorry, we couldn’t find the movie you’re looking for.</p>
          <Link to="/" className="btn">Back to Home</Link>
        </div>
      </div>
    );
  }

  const {
    title,
    tagline,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    runtime,
    vote_average,
    vote_count,
    genres,
    director,
    cast,
  } = selectedMovie;

  const ratingText =
    typeof vote_average === 'number' ? `${vote_average.toFixed(1)}/10` : 'N/A';

  return (
    <div className="movie-detail">
      {/* Backdrop */}
      <div
        className="backdrop"
        style={
          backdrop_path
            ? { backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})` }
            : { backgroundColor: '#1e293b' }
        }
      />

      <div className="container">
        <div className="movie-content">
          {/* Poster */}
          <div className="poster-container">
            {poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
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
            <h1 className="title">{title}</h1>

            {tagline ? <p className="tagline">{tagline}</p> : null}

            <div className="meta">
              {release_date && (
                <div className="release">
                  <strong>Release Date:</strong> {release_date}
                </div>
              )}

              <div className="rating">
                <strong>Rating:</strong> {ratingText}
                {typeof vote_count === 'number' ? ` (${vote_count} votes)` : ''}
              </div>

              {runtime ? (
                <div className="runtime">
                  <strong>Runtime:</strong> {runtime} minutes
                </div>
              ) : null}
            </div>

            {genres?.length ? (
              <div className="genres">
                <strong>Genres:</strong>
                <div className="genre-list">
                  {genres.map((g) => (
                    <span key={g.id} className="genre-tag">
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {overview ? (
              <div className="overview">
                <h3>Overview</h3>
                <p>{overview}</p>
              </div>
            ) : null}

            {director ? (
              <div className="director">
                <strong>Director:</strong> {director}
              </div>
            ) : null}

            {cast?.length ? (
              <div className="cast">
                <strong>Cast:</strong>{' '}
                <div className="cast-list">{cast.join(', ')}</div>
              </div>
            ) : null}

            <div style={{ marginTop: '20px' }}>
              <Link to="/" className="btn">← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
