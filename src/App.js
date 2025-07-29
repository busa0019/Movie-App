import { useMovieContext } from './context/MovieContext';
import Header from './components/Header';
import Home from './pages/Home';
import './App.css';

function App() {
  const { theme } = useMovieContext();

  return (
    <div className={`app ${theme}`}>
      <Header />
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;