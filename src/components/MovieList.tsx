import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getMovies } from '../services/movieService';
import Movie from './Movie';

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await getMovies('batman');
        setMovies(result);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Se produjo un error inesperado");
        }
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (movie: any) => {
    setCart(prevCart => [...prevCart, movie]);
  };

  return (
    <div>
      <h1>Lista de Películas</h1>
      <Link to="/cart">Ver Carrito</Link>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <MoviesGrid>
        {movies.map(movie => (
          <Movie 
            key={movie.imdbID}
            title={movie.Title}
            year={movie.Year}
            type={movie.Type}
            poster={movie.Poster}
            addToCart={() => addToCart(movie)}
          />
        ))}
      </MoviesGrid>
    </div>
  );
}

export default MovieList;
