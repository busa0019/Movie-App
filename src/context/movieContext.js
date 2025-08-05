import { createContext, useContext, useState, useEffect } from 'react';
import { 
  fetchTrendingMovies, 
  fetchPopularMovies, 
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchMovieDetails,
  fetchGenres,
  searchMovies // Added search function
} from '../services/api';

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [user, setUser] = useState(null);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchResults, setSearchResults] = useState([]); // Added search results
  
  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [trendingData, popularData, topRatedData, nowPlayingData, genresData] = 
          await Promise.all([
            fetchTrendingMovies(),
            fetchPopularMovies(),
            fetchTopRatedMovies(),
            fetchNowPlayingMovies(),
            fetchGenres()
          ]);
        
        setTrending(trendingData);
        setPopular(popularData);
        setTopRated(topRatedData);
        setNowPlaying(nowPlayingData);
        setGenres(['All', ...genresData.map(g => g.name)]);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // NEW: Search movies when query changes
  useEffect(() => {
    if (searchQuery) {
      const search = async () => {
        setIsLoading(true);
        try {
          const results = await searchMovies(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error('Search failed:', error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      };
      
      const timer = setTimeout(() => {
        search();
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Get movie details
  const getMovieDetails = async (id) => {
    setIsLoading(true);
    try {
      const movie = await fetchMovieDetails(id);
      setSelectedMovie(movie);
    } catch (error) {
      console.error('Failed to get movie details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate login
  const login = () => {
    setUser({
      name: "MovieBuff",
      avatar: null
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    trending,
    popular,
    topRated,
    nowPlaying,
    selectedMovie,
    getMovieDetails,
    searchQuery,
    setSearchQuery,
    genres,
    selectedGenre,
    setSelectedGenre,
    isLoading,
    searchResults // Added search results
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  return useContext(MovieContext);
}