# 🎬 CineVerse — Movie App

Welcome to **CineVerse**, a clean, responsive React app for exploring movies via [The Movie Database (TMDB)](https://www.themoviedb.org/). Browse trending/popular/top-rated/now-playing titles, filter by genre, search by title, view rich details (cast/director), watch trailers, and save favorites (demo login).

## ✨ Features

- **Homepage sections**: Trending, Popular, Top Rated, In Theaters
  - Each section supports Load More pagination.
- **Genre browsing**: Pick a genre (e.g., Action, Comedy) and load more results.
- **Search**: Find movies by title.
- **Movie details**: Overview, release date, runtime, genres, rating, cast, director.
- **Trailers**: Embedded YouTube trailer (when available).
- **Favorites (demo)**: Toggle favorites only when "logged in" (no backend).
- **Skeletons**: Lightweight loading placeholders for smoother UX.
- **Responsive UI**: Looks good on mobile, tablet, and desktop.

## 🧰 Tech Stack

- **React 18**, [React Router DOM 7](https://reactrouter.com/)
- [Create React App](https://create-react-app.dev/) (react-scripts 5)
- Plain CSS (no CSS framework required)
- [TMDB API](https://developers.themoviedb.org/3)
- Optional deps like MUI are in package.json, but the current UI uses custom CSS.

## 🚀 Quick Start

### 1) Clone & Install

```bash
git clone https://github.com/busa0019/Movie-App.git
cd Movie-App
npm install
```

### 2) Environment Variable

Create a `.env` file in the project root:

```env
REACT_APP_TMDB_API_KEY=<your_tmdb_api_key>
```

> **Don't commit your real key.** On Vercel/GitHub you can add the same key in their environment settings.

### 3) Run Locally

```bash
npm start
```

App opens at `http://localhost:3000/`

### 4) Build

```bash
npm run build
```

Output is in the `build/` folder.

## 🌐 Deployment

### GitHub Pages

In `package.json`, set:

```json
"homepage": "https://<your-username>.github.io/Movie-App"
```

Ensure we generate a 404 fallback (for client-side routing):

```json
"devDependencies": { "shx": "^0.3.4" },
"scripts": {
  "postbuild": "shx cp build/index.html build/404.html",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

**Deploy:**

```bash
npm run deploy
```

> **Routing on GH Pages**: The app auto-detects `*.github.io` and uses HashRouter to avoid 404s.

### Vercel

In `package.json` for Vercel set:

```json
"homepage": "."
```

**Vercel Project Settings:**

| Setting | Value |
|---------|-------|
| Framework | Other (Create React App) |
| Build Command | `npm run build` |
| Output Directory | `build` |

**Environment Variables:**

| Key | Value |
|-----|-------|
| `REACT_APP_TMDB_API_KEY` | your real TMDB key |

**Node Version:** `22.x` (or match `"engines": { "node": "22.x" }`)

**Redeploy** (clear cache if needed).

## 🗂 Folder Structure (src)

```
src/
  components/
    ├── Header.js
    ├── GenreFilter.js
    ├── SearchBar.js
    ├── MovieCard.js
    ├── MovieSection.js
    ├── SkeletonCard.js
    └── ThemeToggle.js
  context/
    └── MovieContext.js
  pages/
    ├── Home.js
    ├── MovieDetail.js
    ├── SearchResults.js
    ├── Favorites.js
    ├── Auth.js
    ├── Genres.js
    └── Movies.js
  services/
    └── api.js
  ├── App.js
  ├── App.css
  ├── index.js
  └── index.css
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | run dev server |
| `npm run build` | production build (to `/build`) |
| `npm test` | CRA test runner (if needed) |
| `npm run deploy` | deploy to GitHub Pages (uses gh-pages) |

## 🔐 Demo Auth & Favorites

- **"Login"** is a demo toggle in the header.
- When not logged in, attempting to favorite will prompt you to log in.
- After "Login", "Favorites" page lists your saved movies (stored in localStorage).

## ⚙️ API Notes

Uses TMDB REST endpoints for:
- `trending`, `popular`, `top_rated`, `now_playing`
- `details`, `videos`, `genres`, and `search`

All requests read the key from `REACT_APP_TMDB_API_KEY`.

## 🧪 Troubleshooting

### Blank page on GitHub Pages
- Ensure `homepage` is your GH Pages URL
- `postbuild` copies `index.html` → `404.html`
- The app auto-switches to HashRouter on `github.io`

### Module not found on Vercel
- Vercel builds on Linux → file names are **case-sensitive**
- If you import `./components/Header`, the file must be `Header.js` (not `header.js`)
- Fix with `git mv`, commit, and push

### `react-scripts: command not found` on Vercel
Ensure `react-scripts` is listed in dependencies:

```json
"react-scripts": "5.0.1"
```

### TMDB errors
- Confirm the env var exists at build time
- The value is a valid key

## 🛣 Routing Behavior

| Environment | Router |
|-------------|--------|
| Local/Vercel | BrowserRouter |
| GitHub Pages | HashRouter (auto-detected via domain `github.io`) |

## 🧼 Code Quality

- React hooks with `useCallback` for stable handlers
- Per-section Load More with pagination
- Genre selection resets and fetches the correct list
- Skeleton placeholders while loading

## 📄 License

[MIT](LICENSE) — free to use and modify.

## 🙌 Credits

- Data from [TMDB](https://www.themoviedb.org/)
- *(This product uses the TMDB API but is not endorsed or certified by TMDB.)*

## 💡 Next Ideas

- Real authentication & profile (Firebase/Auth0)
- Infinite scroll
- Toast notifications for errors/success
- Unit tests (React Testing Library)
- Dark/light theme toggle persisted in localStorage
