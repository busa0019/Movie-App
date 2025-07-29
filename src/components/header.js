import React from 'react';
import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { theme } = useMovieContext();
  
  return (
    <header className={`header ${theme}`}>
      <div className="container">
        <Link to="/" className="logo">
          <h1>Movie Explorer</h1>
        </Link>
        <div className="controls">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;