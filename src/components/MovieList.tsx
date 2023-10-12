import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getMovies } from "../services/movieService";
import Movie from "./Movie";

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
padding: 10px 15px;
background-color: var(--ut-orange);
color: var(--prussian-blue);
border: none;
border-radius: 4px;
cursor: pointer;
transition: background-color 0.2s;
margin-right: 20px;
text-decoration: none;

&:hover {
    background-color: var(--selective-yellow);
  }
`;

const HeaderContainer = styled.header`
  background-color: var(--prussian-blue);
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled.h1`
  color:white;
  font-size: 2rem;
  margin: 0;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: bold;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; // Espacio entre los elementos
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
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
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchMovies = async () => {
    setError(null);
    try {
      const result = await getMovies(searchTerm || "batman");
      result.sort((a: { Year: number; },b: { Year: number; }) =>  (a.Year > b.Year ? 1 : -1));

      setMovies(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Se produjo un error inesperado");
      }
    }
  };

  const addToCart = (
    movie: any,
    type: "renta" | "venta",
    quantity: number,
    rentDate?: Date
  ) => {
    const existingItemIndex = cart.findIndex(
      (item) => item.movie.imdbID === movie.imdbID
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          movie,
          type,
          rentDate,
          quantity,
        },
      ]);
    }

    setFeedbackMessage(`¡${movie.Title} ha sido añadido al carrito!`);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchMovies();
  };

  return (
    <div>
      <HeaderContainer>
        <LeftContainer>
          <HeaderTitle>Blockbuster App</HeaderTitle>
          <SearchContainer>
            <SearchForm onSubmit={handleSearchSubmit}>
              <SearchInput
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar películas..."
              />
              <SearchButton type="submit">Buscar</SearchButton>
            </SearchForm>
          </SearchContainer>
        </LeftContainer>
        <StyledLink to="/cart">Ver Carrito</StyledLink>
      </HeaderContainer>

      {feedbackMessage && <FeedbackMessage>{feedbackMessage}</FeedbackMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <MoviesGrid>
        {movies.map((movie) => (
          <Movie key={movie.imdbID} movie={movie} addToCart={addToCart} />
        ))}
      </MoviesGrid>
    </div>
  );
};

export default MovieList;
