import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import CartDetail from './components/CartDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/cart" element={<CartDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
