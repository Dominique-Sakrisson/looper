import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './components/app/App';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

hydrate(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

