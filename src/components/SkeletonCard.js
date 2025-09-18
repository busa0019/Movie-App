export default function SkeletonCard() {
  return (
    <div className="movie-card">
      <div className="poster-container skeleton skeleton-card" />
      <div className="movie-info">
        <div className="skeleton" style={{ height: 20, width: '80%', marginBottom: 10 }} />
        <div className="skeleton" style={{ height: 14, width: '60%' }} />
      </div>
    </div>
  );
}
