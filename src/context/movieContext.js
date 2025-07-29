import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchMovies, searchMovies, getGenres } from '../services/api';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState({ trending: [], popular: [], top_rated: [] });
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const loadData = async () => {
      const [genresData, trendingData, popularData, topRatedData] = await Promise.all([
        getGenres(),
        fetchMovies('trending'),
        fetchMovies('popular'),
        fetchMovies('top_rated')
      ]);
      
      setGenres(genresData.genres);
      setMovies({
        trending: trendingData.results,
        popular: popularData.results,
        top_rated: topRatedData.results
      });
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setIsLoading(true);
    const results = await searchMovies(query);
    setSearchQuery(query);
    setMovies(prev => ({ ...prev, searchResults: results.results }));
    setIsLoading(false);
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const addToWatchlist = (movie) => {
    setWatchlist(prev => [...prev, movie]);
  };

  return (
    <MovieContext.Provider value={{
      movies,
      genres,
      selectedGenre,
      setSelectedGenre,
      searchQuery,
      handleSearch,
      isLoading,
      watchlist,
      addToWatchlist,
      theme,
      toggleTheme
    }}>
      {children}
    </MovieContext.Provider>
  );
};