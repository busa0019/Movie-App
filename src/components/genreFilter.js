import { useMovieContext } from '../context/MovieContext';

export default function GenreFilter() {
  const { genres, selectedGenre, setSelectedGenre } = useMovieContext();

  const handleChange = (e) => {
    const raw = e.target.value;              // '' or '28'
    const id = raw === '' ? '' : Number(raw);
    const genre = genres.find(g => g.id === id) || { id: '', name: 'All' };
    setSelectedGenre(genre);
  };

  const value = selectedGenre.id === '' ? '' : String(selectedGenre.id);

  return (
    <div className="genre-filter">
      <select value={value} onChange={handleChange}>
        {genres.map(g => (
          <option key={g.id || 'all'} value={g.id === '' ? '' : String(g.id)}>
            {g.name}
          </option>
        ))}
      </select>
    </div>
  );
}
