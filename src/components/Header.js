import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import SearchBar from './SearchBar';
import GenreFilter from './GenreFilter';

export default function Header() {
  const { user, logout } = useMovieContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>CineVerse</h1>
            <p className="tagline">Where Stories Come Alive</p>
          </Link>

          <div className="search-filter">
            <SearchBar />
            <GenreFilter />
          </div>

          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
              <li><Link to="/favorites" className={isActive('/favorites') ? 'active' : ''}>Favorites</Link></li>
            </ul>
          </nav>

          <div className="user-actions">
            {user ? (
              <div className="user-profile">
                <span>Hi, {user.name}</span>
                <button onClick={logout} className="btn logout-btn">Logout</button>
              </div>
            ) : (
              <button onClick={() => navigate('/auth')} className="btn login-btn">Login</button>
            )}
          </div>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
