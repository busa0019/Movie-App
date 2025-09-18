import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import { MovieProvider } from './context/MovieContext';
import './index.css';

const isGhPages = /github\.io$/i.test(window.location.hostname);

const Router = isGhPages ? HashRouter : BrowserRouter;
const basename = isGhPages ? '' : '/'; // HashRouter ignores basename

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router basename={basename}>
    <MovieProvider>
      <App />
    </MovieProvider>
  </Router>
);
