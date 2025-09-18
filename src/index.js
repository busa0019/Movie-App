import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { MovieProvider } from './context/MovieContext';
import './index.css';

const basename = (() => {
  try {
    // CRA sets PUBLIC_URL from package.json "homepage" or env at build time
    const publicUrl = process.env.PUBLIC_URL || '';
    if (!publicUrl) return '/';
    const { pathname } = new URL(publicUrl, window.location.href);
    // remove trailing slash for BrowserRouter
    return pathname && pathname !== '/' && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname || '/';
  } catch {
    return '/';
  }
})();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename={basename}>
    <MovieProvider>
      <App />
    </MovieProvider>
  </BrowserRouter>
);
