import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function Favorites() {
  const { user, favorites } = useMovieContext();

  return (
    <div className="favorites-page">
      <div className="container">
        <h1>Your Favorites</h1>

        {!user && <p>Please login to see and manage your favorites.</p>}

        {user && favorites.length === 0 && (
          <p>No favorites yet. Tap the ♥ on any movie to save it.</p>
        )}

        {user && favorites.length > 0 && (
          <div className="movie-grid">
            {favorites.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
