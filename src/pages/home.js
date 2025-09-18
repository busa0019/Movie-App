import { useMovieContext } from '../context/MovieContext';
import MovieSection from '../components/MovieSection';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const {
    isLoading,
    // lists
    trending, trendingPage, trendingTotal, loadMoreTrending,
    popular,  popularPage,  popularTotal,  loadMorePopular,
    topRated, topRatedPage, topRatedTotal, loadMoreTopRated,
    nowPlaying, nowPlayingPage, nowPlayingTotal, loadMoreNowPlaying,
    // genre
    selectedGenre, genreMovies, genrePage, genreTotal, loadMoreGenre,
    // search
    searchQuery,
  } = useMovieContext();

  if (isLoading && !trending.length && !popular.length && !topRated.length && !nowPlaying.length) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  // If a genre is selected, show a dedicated page-like section
  if (selectedGenre.id) {
    return (
      <div className="home-page">
        <div className="container">
          <h2 className="section-title">{selectedGenre.name} Movies</h2>
          <div className="movie-grid">
            {genreMovies.map((m) => <MovieCard key={m.id} movie={m} />)}
          </div>
          {genrePage < genreTotal && (
            <div className="more-container">
              <button className="btn btn-outline more-btn" onClick={loadMoreGenre}>
                Load more
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Hide sections when actively searching
  if (searchQuery) {
    return (
      <div className="home-page">
        <div className="container">
          <p>Searching for "{searchQuery}"…</p>
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
          hasMore={trendingPage < trendingTotal}
          onLoadMore={loadMoreTrending}
        />
        <MovieSection
          title="Popular Movies"
          movies={popular}
          hasMore={popularPage < popularTotal}
          onLoadMore={loadMorePopular}
        />
        <MovieSection
          title="Top Rated"
          movies={topRated}
          hasMore={topRatedPage < topRatedTotal}
          onLoadMore={loadMoreTopRated}
        />
        <MovieSection
          title="In Theaters"
          movies={nowPlaying}
          hasMore={nowPlayingPage < nowPlayingTotal}
          onLoadMore={loadMoreNowPlaying}
        />
      </div>
    </div>
  );
}
