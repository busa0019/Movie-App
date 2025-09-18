import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchMovieDetails,
  fetchMovieVideos,
  fetchGenres,
  searchMovies,
  fetchMoviesByGenre,
} from '../services/api';

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Lists & pagination
  const [trending, setTrending] = useState([]);
  const [trendingPage, setTrendingPage] = useState(1);
  const [trendingTotal, setTrendingTotal] = useState(1);

  const [popular, setPopular] = useState([]);
  const [popularPage, setPopularPage] = useState(1);
  const [popularTotal, setPopularTotal] = useState(1);

  const [topRated, setTopRated] = useState([]);
  const [topRatedPage, setTopRatedPage] = useState(1);
  const [topRatedTotal, setTopRatedTotal] = useState(1);

  const [nowPlaying, setNowPlaying] = useState([]);
  const [nowPlayingPage, setNowPlayingPage] = useState(1);
  const [nowPlayingTotal, setNowPlayingTotal] = useState(1);

  // Genre
  const [genres, setGenres] = useState([{ id: '', name: 'All' }]);
  const [selectedGenre, setSelectedGenre] = useState({ id: '', name: 'All' });
  const [genreMovies, setGenreMovies] = useState([]);
  const [genrePage, setGenrePage] = useState(1);
  const [genreTotal, setGenreTotal] = useState(1);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Details
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  // Favorites (localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('favorites');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  // ---- Initial load
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const [t1, p1, tr1, n1, gList] = await Promise.all([
          fetchTrendingMovies(1),
          fetchPopularMovies(1),
          fetchTopRatedMovies(1),
          fetchNowPlayingMovies(1),
          fetchGenres(),
        ]);

        setTrending(t1.movies); setTrendingTotal(t1.totalPages);
        setPopular(p1.movies); setPopularTotal(p1.totalPages);
        setTopRated(tr1.movies); setTopRatedTotal(tr1.totalPages);
        setNowPlaying(n1.movies); setNowPlayingTotal(n1.totalPages);

        setGenres([{ id: '', name: 'All' }, ...gList]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // ---- Load more per section
  const loadMoreTrending = useCallback(async () => {
    if (trendingPage >= trendingTotal) return;
    setIsLoading(true);
    try {
      const next = trendingPage + 1;
      const res = await fetchTrendingMovies(next);
      setTrending((prev) => [...prev, ...res.movies]);
      setTrendingPage(next);
    } finally {
      setIsLoading(false);
    }
  }, [trendingPage, trendingTotal]);

  const loadMorePopular = useCallback(async () => {
    if (popularPage >= popularTotal) return;
    setIsLoading(true);
    try {
      const next = popularPage + 1;
      const res = await fetchPopularMovies(next);
      setPopular((prev) => [...prev, ...res.movies]);
      setPopularPage(next);
    } finally {
      setIsLoading(false);
    }
  }, [popularPage, popularTotal]);

  const loadMoreTopRated = useCallback(async () => {
    if (topRatedPage >= topRatedTotal) return;
    setIsLoading(true);
    try {
      const next = topRatedPage + 1;
      const res = await fetchTopRatedMovies(next);
      setTopRated((prev) => [...prev, ...res.movies]);
      setTopRatedPage(next);
    } finally {
      setIsLoading(false);
    }
  }, [topRatedPage, topRatedTotal]);

  const loadMoreNowPlaying = useCallback(async () => {
    if (nowPlayingPage >= nowPlayingTotal) return;
    setIsLoading(true);
    try {
      const next = nowPlayingPage + 1;
      const res = await fetchNowPlayingMovies(next);
      setNowPlaying((prev) => [...prev, ...res.movies]);
      setNowPlayingPage(next);
    } finally {
      setIsLoading(false);
    }
  }, [nowPlayingPage, nowPlayingTotal]);

  // ---- Genre change & load more
  useEffect(() => {
    (async () => {
      if (!selectedGenre.id) {
        setGenreMovies([]);
        setGenrePage(1);
        setGenreTotal(1);
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetchMoviesByGenre(selectedGenre.id, 1);
        setGenreMovies(res.movies);
        setGenrePage(1);
        setGenreTotal(res.totalPages);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedGenre]);

  const loadMoreGenre = useCallback(async () => {
    if (!selectedGenre.id || genrePage >= genreTotal) return;
    setIsLoading(true);
    try {
      const next = genrePage + 1;
      const res = await fetchMoviesByGenre(selectedGenre.id, next);
      setGenreMovies((prev) => [...prev, ...res.movies]);
      setGenrePage(next);
    } finally {
      setIsLoading(false);
    }
  }, [selectedGenre, genrePage, genreTotal]);

  // ---- Search
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    const t = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await searchMovies(searchQuery, 1);
        setSearchResults(res);
      } finally {
        setIsLoading(false);
      }
    }, 400);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // ---- Details + Trailer
  const getMovieDetails = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const d = await fetchMovieDetails(id);
      setSelectedMovie(d);
      setTrailerKey(null);
      const vids = await fetchMovieVideos(id);
      const yt = vids.find((v) => v.site === 'YouTube' && v.type === 'Trailer');
      setTrailerKey(yt?.key || null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ---- Favorites (gated by login)
  const toggleFavorite = (movie) => {
    if (!user) {
      alert('Please log in to manage favorites.');
      return false;
    }
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      const next = exists ? prev.filter((m) => m.id !== movie.id) : [...prev, movie];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
    return true;
  };
  const isFavorite = (id) => {
    if (!user) return false;
    return favorites.some((m) => m.id === id);
  };

  // ---- Auth (basic)
  const login = (email) => {
    // derive a friendly name from the email
    const display = email?.split('@')?.[0] || 'MovieBuff';
    const nextUser = { name: display, email };
    setUser(nextUser);
    localStorage.setItem('user', JSON.stringify(nextUser));
    return true;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // keep favorites in localStorage; or clear if you prefer:
    // setFavorites([]); localStorage.removeItem('favorites');
  };

  const value = {
    // auth
    user, login, logout,

    // lists
    trending, popular, topRated, nowPlaying,
    trendingPage, trendingTotal, loadMoreTrending,
    popularPage, popularTotal, loadMorePopular,
    topRatedPage, topRatedTotal, loadMoreTopRated,
    nowPlayingPage, nowPlayingTotal, loadMoreNowPlaying,

    // genres
    genres, selectedGenre, setSelectedGenre,
    genreMovies, genrePage, genreTotal, loadMoreGenre,

    // search
    searchQuery, setSearchQuery, searchResults,

    // details
    selectedMovie, trailerKey, getMovieDetails,

    // favorites
    favorites, toggleFavorite, isFavorite,

    // ui
    isLoading,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}

export function useMovieContext() {
  return useContext(MovieContext);
}
