import React from 'react';
import styled from 'styled-components';

const MovieContainer = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
  width: 200px;
  text-align: center;
`;

const MoviePoster = styled.img`
  width: 100%;
  height: auto;
`;

interface MovieProps {
  title: string;
  year: string;
  type: string;
  poster: string;
  addToCart: () => void;
}

const Movie: React.FC<MovieProps> = ({ title, year, type, poster, addToCart }) => {
  return (
    <MovieContainer>
      <MoviePoster src={poster} alt={title} />
      <h2>{title}</h2>
      <p>{year}</p>
      <p>{type}</p>
      <button onClick={addToCart}>Agregar al carrito</button>
    </MovieContainer>
  );
}

export default Movie;
