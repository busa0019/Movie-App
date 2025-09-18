import { useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useMovieContext();

  useEffect(() => {
    document.body.dataset.theme = theme; // use in CSS if you add themes
  }, [theme]);

  return (
    <button className="btn btn-outline" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
    </button>
  );
}
