import { useMovieContext } from '../context/MovieContext';

export default function Favorites() {
  const { user } = useMovieContext();

  return (
    <div className="favorites-page">
      <div className="container">
        <h1>Your Favorites</h1>
        {user ? (
          <p>Your favorite movies will appear here</p>
        ) : (
          <p>Please login to see your favorites</p>
        )}
      </div>
    </div>
  );
}