import React, { useState } from "react";
import styled from "styled-components";

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

const TypeButton = styled.button`
  background-color: var(--ut-orange);
  color: var(--prussian-blue);
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  margin-right: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--selective-yellow);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const AddToCartStyledButton = styled.button`
  background-color: var(--blue-green);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--selective-yellow);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const CartOptions = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column; // Cambio aquí para centrar el label
  gap: 10px;
  align-items: center;
`;

const StyledSelect = styled.select`
  padding: 5px;
  border: 1px solid var(--blue-green);
  border-radius: 4px;
  background-color: white;
  color: var(--prussian-blue);
  flex: 1; // Cambio aquí para que ocupe todo el espacio
  width: 100%; // Asegurarse de que ocupe todo el ancho
`;

const StyledInput = styled.input`
  padding: 5px;
  border: 1px solid var(--blue-green);
  border-radius: 4px;
  background-color: white;
  color: var(--prussian-blue);
`;

const ToastMessage = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--ut-orange);
  color: var(--prussian-blue);
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: opacity 0.3s, transform 0.3s;
  opacity: 0;
  transform: translateY(100px);

  &.show {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface MovieProps {
  movie: {
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
    imdbID: string;
  };
  addToCart: (
    movie: any,
    type: "renta" | "venta",
    quantity: number,
    rentDate?: Date
  ) => void;
}

const Movie: React.FC<MovieProps> = ({ movie, addToCart }) => {
  const [transactionType, setTransactionType] = useState<"renta" | "venta">(
    "venta"
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [rentDate, setRentDate] = useState<Date | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  // Establecer la fecha mínima para el input:
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const handleAddToCart = () => {
    if (transactionType === "renta" && !rentDate) {
      alert("Por favor, selecciona una fecha de renta.");
      return;
    }

    addToCart(movie, transactionType, quantity, rentDate || undefined);

    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = "/img/placeholder.png";
    target.onerror = null;
  };

  return (
    <MovieContainer>
      <MoviePoster
        src={movie.Poster}
        alt={movie.Title}
        onError={handleImageError}
      />
      <MovieTitle>{movie.Title}</MovieTitle>
      <MovieDetails>
        {movie.Year} | {movie.Type}
      </MovieDetails>
      <CartOptions>
        <InputGroup>
          <label>
            Tipo:
            <StyledSelect
              value={transactionType}
              onChange={(e) =>
                setTransactionType(e.target.value as "renta" | "venta")
              }
            >
              <option value="venta">Venta</option>
              <option value="renta">Renta</option>
            </StyledSelect>
          </label>
        </InputGroup>
        {transactionType === "renta" && (
          <InputGroup>
            <label>
              Fecha de Renta:
              <StyledInput
                type="date"
                min={formattedDate}
                value={rentDate?.toISOString().split("T")[0] || ""}
                onChange={(e) => setRentDate(new Date(e.target.value))}
              />
            </label>
          </InputGroup>
        )}
        <InputGroup>
          <label>
            Cantidad:
            <StyledInput
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </label>
        </InputGroup>
        <AddToCartStyledButton onClick={handleAddToCart}>
          Agregar al carrito
        </AddToCartStyledButton>
      </CartOptions>
      {toastVisible && (
        <ToastMessage className="show">
          Producto agregado al carrito!
        </ToastMessage>
      )}
    </MovieContainer>
  );
};

export default Movie;
