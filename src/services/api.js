// src/services/api.js

// Prefer .env: REACT_APP_TMDB_API_KEY=your_tmdb_key
const API_KEY = process.env.REACT_APP_TMDB_API_KEY || '534ad87f20edc3517addc5079baeccfe';
const BASE_URL = 'https://api.themoviedb.org/3';

// Normalize movie objects for consistent use in the app
const processMovies = (movies) =>
  movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    overview: movie.overview,
    genre_ids: movie.genre_ids,
  }));

// Trending (day)
export async function fetchTrendingMovies() {
  try {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return processMovies(data.results.slice(0, 8));
  } catch (err) {
    console.error('Error fetching trending movies:', err);
    return [];
  }
}

// Popular
export async function fetchPopularMovies() {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return processMovies(data.results.slice(0, 8));
  } catch (err) {
    console.error('Error fetching popular movies:', err);
    return [];
  }
}

// Top Rated
export async function fetchTopRatedMovies() {
  try {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return processMovies(data.results.slice(0, 8));
  } catch (err) {
    console.error('Error fetching top rated movies:', err);
    return [];
  }
}

// Now Playing
export async function fetchNowPlayingMovies() {
  try {
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return processMovies(data.results.slice(0, 8));
  } catch (err) {
    console.error('Error fetching now playing movies:', err);
    return [];
  }
}

// Movie Details (with credits for cast/director)
export async function fetchMovieDetails(id) {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
    );
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();

    return {
      id: data.id,
      title: data.title,
      tagline: data.tagline,
      overview: data.overview,
      poster_path: data.poster_path,
      backdrop_path: data.backdrop_path,
      release_date: data.release_date,
      runtime: data.runtime,
      vote_average: data.vote_average,
      vote_count: data.vote_count,
      genres: data.genres,
      cast: data.credits?.cast?.slice(0, 5).map((a) => a.name) || [],
      director: data.credits?.crew?.find((m) => m.job === 'Director')?.name || null,
    };
  } catch (err) {
    console.error('Error fetching movie details:', err);
    return null;
  }
}

// Genres list
export async function fetchGenres() {
  try {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return data.genres || [];
  } catch (err) {
    console.error('Error fetching genres:', err);
    return [];
  }
}

// Search by query
export async function searchMovies(query) {
  try {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return processMovies(data.results || []);
  } catch (err) {
    console.error('Error searching movies:', err);
    return [];
  }
}

// NEW: Discover by genre (single id or array of ids)
export async function fetchMoviesByGenre(genreIds, page = 1) {
  const ids = Array.isArray(genreIds) ? genreIds.join(',') : String(genreIds);
  try {
    const res = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${encodeURIComponent(
        ids
      )}&sort_by=popularity.desc&page=${page}`
    );
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return processMovies(data.results.slice(0, 8));
  } catch (err) {
    console.error('Error fetching movies by genre:', err);
    return [];
  }
}
