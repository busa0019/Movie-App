import { useMovieContext } from '../context/MovieContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useMovieContext();
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
    </button>
  );
}