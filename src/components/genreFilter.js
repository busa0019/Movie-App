import { useMovieContext } from '../context/MovieContext';

export default function GenreFilter() {
  const { genres, selectedGenre, setSelectedGenre } = useMovieContext();

  return (
    <div className="genre-filter">
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        {genres.map(genre => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}