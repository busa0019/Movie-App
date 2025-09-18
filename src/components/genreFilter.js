import { useMovieContext } from '../context/MovieContext';

export default function GenreFilter() {
  const { genres, selectedGenre, setSelectedGenre } = useMovieContext();

  const handleChange = (e) => {
    const genreId = e.target.value;
    const genre = genres.find(g => g.id === genreId) || { id: '', name: 'All' };
    setSelectedGenre(genre);
  };

  return (
    <div className="genre-filter">
      <select
        value={selectedGenre.id}
        onChange={handleChange}
      >
        {genres.map(genre => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}