import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import CartDetail from './components/CartDetail';
import styled from 'styled-components';

const MainContainer = styled.div`
padding: 20px;
  background-image: url('/img/bg.jpg'); // Usamos la ruta relativa a la carpeta public
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 100vh; // Esto asegura que el fondo cubra toda la altura de la ventana
`;

function App() {
  return (
    <MainContainer>
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/cart" element={<CartDetail />} />
      </Routes>
    </Router>
    </MainContainer>
  );
}

export default App;
