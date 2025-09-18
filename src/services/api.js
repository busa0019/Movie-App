// Prefer .env: REACT_APP_TMDB_API_KEY=your_tmdb_key
const API_KEY = process.env.REACT_APP_TMDB_API_KEY || '534ad87f20edc3517addc5079baeccfe';
const BASE_URL = 'https://api.themoviedb.org/3';

const processMovies = (movies = []) =>
  movies.map((m) => ({
    id: m.id,
    title: m.title,
    poster_path: m.poster_path,
    backdrop_path: m.backdrop_path,
    release_date: m.release_date,
    vote_average: m.vote_average ?? 0,
    vote_count: m.vote_count ?? 0,
    overview: m.overview,
    genre_ids: m.genre_ids,
  }));

// Each list returns { movies: Movie[], totalPages: number }
export async function fetchTrendingMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`);
  if (!res.ok) return { movies: [], totalPages: 1 };
  const data = await res.json();
  return { movies: processMovies(data.results).slice(0, 8), totalPages: data.total_pages || 1 };
}

export async function fetchPopularMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  if (!res.ok) return { movies: [], totalPages: 1 };
  const data = await res.json();
  return { movies: processMovies(data.results).slice(0, 8), totalPages: data.total_pages || 1 };
}

export async function fetchTopRatedMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
  if (!res.ok) return { movies: [], totalPages: 1 };
  const data = await res.json();
  return { movies: processMovies(data.results).slice(0, 8), totalPages: data.total_pages || 1 };
}

export async function fetchNowPlayingMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
  if (!res.ok) return { movies: [], totalPages: 1 };
  const data = await res.json();
  return { movies: processMovies(data.results).slice(0, 8), totalPages: data.total_pages || 1 };
}

// Details + Credits
export async function fetchMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`);
  if (!res.ok) return null;
  const d = await res.json();
  return {
    id: d.id,
    title: d.title,
    tagline: d.tagline,
    overview: d.overview,
    poster_path: d.poster_path,
    backdrop_path: d.backdrop_path,
    release_date: d.release_date,
    runtime: d.runtime,
    vote_average: d.vote_average,
    vote_count: d.vote_count,
    genres: d.genres,
    cast: d.credits?.cast?.slice(0, 5).map((a) => a.name) || [],
    director: d.credits?.crew?.find((m) => m.job === 'Director')?.name || null,
  };
}

// Trailer videos (YouTube)
export async function fetchMovieVideos(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.results || [];
}

// Genres
export async function fetchGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.genres || [];
}

// Search
export async function searchMovies(query, page = 1) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!res.ok) return [];
  const data = await res.json();
  return processMovies(data.results || []);
}

// Discover by genre — returns { movies, totalPages }
export async function fetchMoviesByGenre(genreIds, page = 1) {
  const ids = Array.isArray(genreIds) ? genreIds.join(',') : String(genreIds);
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${encodeURIComponent(
      ids
    )}&sort_by=popularity.desc&page=${page}`
  );
  if (!res.ok) return { movies: [], totalPages: 1 };
  const data = await res.json();
  return { movies: processMovies(data.results).slice(0, 8), totalPages: data.total_pages || 1 };
}
