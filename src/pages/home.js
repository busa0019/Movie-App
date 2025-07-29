import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import MovieMatch from '../components/MovieMatch';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
  const { movies, isLoading, searchQuery } = useMovieContext();

  const renderSection = (title, movies) => (
    movies?.length > 0 && (
      <section className="movie-section">
        <h2>{title}</h2>
        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    )
  );

  return (
    <div className="home">
      <div className="hero">
        <h1>Discover Your Next Favorite Movie</h1>
        <SearchBar />
      </div>
      
      <div className="tools">
        <GenreFilter />
        <ThemeToggle />
      </div>
      
      <MovieMatch />
      
      {isLoading ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <>
          {searchQuery ? (
            renderSection(`Search Results for "${searchQuery}"`, movies.searchResults)
          ) : (
            <>
              {renderSection('Trending Now', movies.trending)}
              {renderSection('Popular Movies', movies.popular)}
              {renderSection('Top Rated', movies.top_rated)}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;