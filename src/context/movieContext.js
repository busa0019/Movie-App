import { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Add other movie-related states here
  
  return (
    <MovieContext.Provider 
      value={{
        theme,
        setTheme,
        movies,
        setMovies,
        selectedGenre,
        setSelectedGenre
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  const context = useContext(MovieContext);
  
  if (context === undefined) {
    throw new Error('useMovieContext must be used within MovieProvider');
  }
  
  return context;
}

