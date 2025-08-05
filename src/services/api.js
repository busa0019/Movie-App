const API_KEY = '534ad87f20edc3517addc5079baeccfe';
const BASE_URL = 'https://api.themoviedb.org/3';

// Helper function to process movies
const processMovies = (movies) => {
  return movies.map(movie => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    overview: movie.overview,
    genre_ids: movie.genre_ids
  }));
};

export async function fetchTrendingMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    return processMovies(data.results.slice(0, 8));
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
}

export async function fetchPopularMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    return processMovies(data.results.slice(0, 8));
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
}

export async function fetchTopRatedMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    return processMovies(data.results.slice(0, 8));
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
}

export async function fetchNowPlayingMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    return processMovies(data.results.slice(0, 8));
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    return [];
  }
}

export async function fetchMovieDetails(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
    );
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    
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
      cast: data.credits.cast.slice(0, 5).map(actor => actor.name),
      director: data.credits.crew.find(member => member.job === "Director")?.name
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

export async function fetchGenres() {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
}

// NEW: Search movies function
export async function searchMovies(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    return processMovies(data.results);
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}