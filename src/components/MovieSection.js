import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

export default function MovieSection({ title, movies, category }) {
  return (
    <section className="movie-section">
      <h2 className="section-title">{title}</h2>
      
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {movies.length > 0 && (
        <div className="more-container">
          <Link to={`/${category}`} className="btn more-btn">
            View More
          </Link>
        </div>
      )}
    </section>
  );
}