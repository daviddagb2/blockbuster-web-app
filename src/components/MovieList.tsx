import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getMovies } from '../services/movieService';
import Movie from './Movie';

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  background-color: var(--ut-orange);
  color: var(--prussian-blue);
  padding: 12px 24px;
  border-radius: 5px;
  margin-top: 20px;
  text-decoration: none;
  font-size: 1.2rem;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--selective-yellow);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const HeaderContainer = styled.header`
  background-color: var(--prussian-blue);
  padding: 20px 0;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled.h1`
  color: var(--sky-blue);
  font-size: 2rem;
  margin: 0;
  font-weight: bold;
`;

const SearchInput = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid var(--blue-green);
  margin-right: 10px;
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  background-color: var(--ut-orange);
  color: var(--prussian-blue);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--selective-yellow);
  }
`;

const FeedbackMessage = styled.div`
  background-color: var(--ut-orange);
  color: var(--prussian-blue);
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
  transition: opacity 0.3s;
`;


const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchMovies();
  };

  const fetchMovies = async () => {
    // Limpiamos el error antes de intentar una nueva búsqueda
    setError(null);

    try {
        const result = await getMovies(searchTerm || 'batman');
        setMovies(result);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Se produjo un error inesperado");
        }
    }
};

  useEffect(() => {
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
    // Verifica si la película ya está en el carrito
    const isMovieInCart = cart.some(cartMovie => cartMovie.imdbID === movie.imdbID);
  
    if (!isMovieInCart) {
      setCart(prevCart => [...prevCart, movie]);
      setFeedbackMessage(`¡${movie.Title} ha sido agregado al carrito!`);
    } else {
      setFeedbackMessage(`¡${movie.Title} ya está en el carrito!`);
    }
  
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3000);
  };

  return (
    <div>
      <HeaderContainer>
        <HeaderTitle>Blockbuster App</HeaderTitle>
      </HeaderContainer>
      <StyledLink to="/cart">Ver Carrito</StyledLink>
      {feedbackMessage && <FeedbackMessage>{feedbackMessage}</FeedbackMessage>}
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
