import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchMovieDetails,
  fetchGenres,
  searchMovies,
  fetchMoviesByGenre,
} from '../services/api';

const MovieContext = createContext(null);

export function MovieProvider({ children }) {
  const [user, setUser] = useState(null);

  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [genres, setGenres] = useState([{ id: '', name: 'All' }]);
  const [selectedGenre, setSelectedGenre] = useState({ id: '', name: 'All' });

  // Genre results + pagination
  const [genreMovies, setGenreMovies] = useState([]);
  const [genrePage, setGenrePage] = useState(1);
  const [genreTotalPages, setGenreTotalPages] = useState(1);

  // Favorites (persisted)
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  const isFavorite = useCallback(
    (id) => favorites.some((m) => m.id === id),
    [favorites]
  );
  const toggleFavorite = useCallback(
    (movie) => {
      setFavorites((prev) =>
        isFavorite(movie.id)
          ? prev.filter((m) => m.id !== movie.id)
          : [...prev, movie]
      );
    },
    [isFavorite]
  );

  // Initial bootstrapping
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [
          trendingData,
          popularData,
          topRatedData,
          nowPlayingData,
          genresData,
        ] = await Promise.all([
          fetchTrendingMovies(),
          fetchPopularMovies(),
          fetchTopRatedMovies(),
          fetchNowPlayingMovies(),
          fetchGenres(),
        ]);

        setTrending(trendingData);
        setPopular(popularData);
        setTopRated(topRatedData);
        setNowPlaying(nowPlayingData);

        // Normalize genre ids to strings (to match <select> values)
        const normalizedGenres = [
          { id: '', name: 'All' },
          ...(genresData || []).map((g) => ({ id: String(g.id), name: g.name })),
        ];
        setGenres(normalizedGenres);
      } catch (err) {
        console.error('Failed to load initial data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  // When genre changes, reset and fetch first page
  useEffect(() => {
    const run = async () => {
      if (!selectedGenre.id) {
        setGenreMovies([]);
        setGenrePage(1);
        setGenreTotalPages(1);
        return;
      }
      setIsLoading(true);
      try {
        const { items, totalPages } = await fetchMoviesByGenre(selectedGenre.id, 1);
        setGenreMovies(items);
        setGenrePage(1);
        setGenreTotalPages(totalPages);
      } catch (err) {
        console.error('Failed to fetch genre movies:', err);
        setGenreMovies([]);
        setGenrePage(1);
        setGenreTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [selectedGenre]);

  // Load more for genres
  const loadMoreGenre = useCallback(async () => {
    if (!selectedGenre.id) return;
    if (genrePage >= genreTotalPages) return;

    setIsLoading(true);
    try {
      const nextPage = genrePage + 1;
      const { items } = await fetchMoviesByGenre(selectedGenre.id, nextPage);
      setGenreMovies((prev) => [...prev, ...items]);
      setGenrePage(nextPage);
    } catch (err) {
      console.error('Failed to load more genre movies:', err);
    } finally {
      setIsLoading(false);
    }
  }, [genrePage, genreTotalPages, selectedGenre?.id]);

  // Debounced search
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await searchMovies(searchQuery);
        setSearchResults(results);
      } catch (err) {
        console.error('Search failed:', err);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Stable function for fetching details
  const getMovieDetails = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const movie = await fetchMovieDetails(id);
      setSelectedMovie(movie);
    } catch (err) {
      console.error('Failed to get movie details:', err);
      setSelectedMovie(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auth
  const login = ({ email }) => {
    const name = email ? email.split('@')[0] : 'MovieBuff';
    setUser({ name, email: email || null, avatar: null });
    return true;
  };
  const logout = () => setUser(null);

  const value = {
    // auth
    user,
    login,
    logout,

    // collections
    trending,
    popular,
    topRated,
    nowPlaying,

    // details
    selectedMovie,
    getMovieDetails,

    // search
    searchQuery,
    setSearchQuery,
    searchResults,

    // genres + pagination
    genres,
    selectedGenre,
    setSelectedGenre,
    genreMovies,
    genrePage,
    genreTotalPages,
    loadMoreGenre,

    // favorites
    favorites,
    isFavorite,
    toggleFavorite,

    // ui
    isLoading,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}

export function useMovieContext() {
  return useContext(MovieContext);
}
