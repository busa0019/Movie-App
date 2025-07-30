import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import { MovieProvider } from './context/MovieContext';
import './App.css';

function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;