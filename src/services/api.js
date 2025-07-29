const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your key
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (type) => {
  const endpoints = {
    trending: `/trending/movie/week`,
    popular: `/movie/popular`,
    top_rated: `/movie/top_rated`,
  };
  
  const response = await fetch(`${BASE_URL}${endpoints[type]}?api_key=${API_KEY}`);
  return response.json();
};

export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  return response.json();
};

export const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return response.json();
};

export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return response.json();
};