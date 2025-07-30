import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import SearchBar from './SearchBar';
import GenreFilter from './GenreFilter';

export default function Header() {
  const { user, login, logout } = useMovieContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <h1>CineVerse</h1>
            <p className="tagline">Where Stories Come Alive</p>
          </Link>
          
          {/* Search and Filter */}
          <div className="search-filter">
            <SearchBar />
            <GenreFilter />
          </div>
          
          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">Movies</Link></li>
              <li><Link to="/">Genres</Link></li>
              <li><Link to="/">Favorites</Link></li>
            </ul>
          </nav>
          
          {/* User Actions */}
          <div className="user-actions">
            {user ? (
              <div className="user-profile">
                <span>Hi, {user.name}</span>
                <button onClick={logout} className="btn logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={login} className="btn login-btn">
                Login
              </button>
            )}
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}