import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadPostmanData } from './loadPostmanData';

loadPostmanData(); // Load Postman data into localStorage

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

reportWebVitals(); // Optional performance logging
