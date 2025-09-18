import { useMovieContext } from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';

export default function GenreFilter() {
  const { genres, selectedGenre, setSelectedGenre } = useMovieContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const id = e.target.value; // string
    const genre = genres.find((g) => g.id === id) || { id: '', name: 'All' };
    setSelectedGenre(genre);
    // Make sure results are visible on Home
    navigate('/');
  };

  return (
    <div className="genre-filter">
      <select value={selectedGenre.id} onChange={handleChange}>
        {genres.map((g) => (
          <option key={g.id || 'all'} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
    </div>
  );
}
