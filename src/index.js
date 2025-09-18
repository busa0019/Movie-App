import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { MovieProvider } from './context/MovieContext';
import './index.css';

const isGhPages = /github\.io$/i.test(window.location.hostname);
const repoName = window.location.pathname.split('/')[1]; // "Movie-App" on GH Pages
const basename = isGhPages ? `/${repoName}` : '/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename={basename}>
    <MovieProvider>
      <App />
    </MovieProvider>
  </BrowserRouter>
);
