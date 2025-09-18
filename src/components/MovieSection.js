import MovieCard from './MovieCard';

export default function MovieSection({ title, movies }) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="movie-section">
      <h2 className="section-title">{title}</h2>
      <div className="movie-grid">
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </section>
  );
}
