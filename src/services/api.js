// src/services/api.js
// This file contains functions to interact with The Movie Database (TMDB) API
const API_KEY = '534ad87f20edc3517addc5079baeccfe';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (type) => {
  const endpoints = {
    trending: '/trending/movie/week',
    popular: '/movie/popular',
    top_rated: '/movie/top_rated'
  };
  
  const response = await fetch(`${BASE_URL}${endpoints[type]}?api_key=${API_KEY}`);
  if (!response.ok) throw new Error('Failed to fetch movies');
  return response.json();
};

export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  if (!response.ok) throw new Error('Search failed');
  return response.json();
};

export const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`);
  if (!response.ok) throw new Error('Failed to get movie details');
  return response.json();
};

export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  if (!response.ok) throw new Error('Failed to get genres');
  return response.json();
};