import MovieCard from './MovieCard';

export default function MovieSection({ title, movies, onLoadMore, hasMore = false }) {
  return (
    <section className="movie-section">
      <h2 className="section-title">{title}</h2>
      <div className="movie-grid">
        {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
      {hasMore && movies.length > 0 && (
        <div className="more-container">
          <button className="btn btn-outline more-btn" onClick={onLoadMore}>
            Load more
          </button>
        </div>
      )}
    </section>
  );
}
