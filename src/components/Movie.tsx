import React from 'react';
import styled from 'styled-components';

const MovieContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid var(--blue-green);
  margin: 16px;
  width: 200px;
  text-align: center;
  border-radius: 8px;
  transition: transform 0.2s;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
  }
`;

const MovieTitle = styled.h2`
  font-size: 1.2rem;
  color: var(--prussian-blue);
  margin-top: 16px;
`;

const MoviePoster = styled.img`
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s, transform 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const MovieDetails = styled.p`
  font-size: 0.9rem;
  color: var(--prussian-blue);
  margin-top: 8px;
`;

const AddToCartButton = styled.button`
  background-color: #0090c5;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.3s;
  margin-top: 16px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--selective-yellow);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

interface MovieProps {
    title: string;
    year: string;
    type: string;
    poster: string;
    addToCart: () => void;
  }

const Movie: React.FC<MovieProps> = ({ title, year, type, poster, addToCart }) => {

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.src = "/img/placeholder.png";
        target.onerror = null;
    };

    return (
        <MovieContainer>
            <MoviePoster src={poster} alt={title} onError={handleImageError} />
            <MovieTitle>{title}</MovieTitle>
            <MovieDetails>{year} | {type}</MovieDetails>
            <AddToCartButton onClick={addToCart}>Agregar al carrito</AddToCartButton>
        </MovieContainer>
    );
};

export default Movie;
