import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function Movies() {
  const { popular, isLoading } = useMovieContext();

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="movies-page">
      <div className="container">
        <h1>Popular Movies</h1>
        <div className="movie-grid">
          {popular.map((m) => <MovieCard key={m.id} movie={m} />)}
        </div>
      </div>
    </div>
  );
}
