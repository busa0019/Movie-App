import { useMovieContext } from '../context/MovieContext';
import MovieSection from '../components/MovieSection';

export default function Home() {
  const { 
    trending, 
    popular, 
    topRated,
    nowPlaying,
    isLoading,
    searchQuery
  } = useMovieContext();

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  // Hide movie sections when searching
  if (searchQuery) {
    return (
      <div className="home-page">
        <div className="container">
          <p>Searching for movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="container">
        <MovieSection 
          title="Trending This Week" 
          movies={trending} 
          category="trending"
        />
        
        <MovieSection 
          title="Popular Movies" 
          movies={popular} 
          category="popular"
        />
        
        <MovieSection 
          title="Top Rated" 
          movies={topRated} 
          category="top-rated"
        />
        
        <MovieSection 
          title="Now Playing" 
          movies={nowPlaying} 
          category="now-playing"
        />
      </div>
    </div>
  );
}