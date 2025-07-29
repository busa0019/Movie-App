import { useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { fetchMovies } from '../services/api';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const { movies, setMovies } = useMovieContext();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (error) {
        console.error('Failed to load movies:', error);
        setMovies([]);
      }
    };
    
    loadMovies();
  }, [setMovies]);

  return (
    <div className="home-page">
      <SearchBar />
      <GenreFilter />
      
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <div className="loading-message">Loading movies...</div>
        )}
      </div>
    </div>
  );
}