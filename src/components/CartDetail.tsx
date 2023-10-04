import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CartDetailContainer = styled.div`
  background-color: var(--prussian-blue);
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  color: var(--sky-blue);
`;

const CartItem = styled.div`
  background-color: white;
  border: 1px solid var(--blue-green);
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: var(--prussian-blue);
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--selective-yellow);
  }
`;

const CartItemImage = styled.img`
  width: 100px;
  height: auto;
  margin-right: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CheckoutButton = styled.button`
  background-color: var(--ut-orange);
  color: var(--prussian-blue);
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s, transform 0.2s;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 16px;

  &:hover {
    background-color: var(--selective-yellow);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const CartItemDetails = styled.div`
  margin-left: 16px;
`;

const CartItemTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 1.2rem;
`;

const CartItemYear = styled.p`
  margin: 0 0 5px 0;
  font-size: 1rem;
`;

const CartItemType = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const BackButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: var(--sky-blue);
  padding: 10px 20px;
  border-radius: 4px;
  margin-top: 20px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 10px;

  &:hover {
    background-color: var(--selective-yellow);
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const CartDetail: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const finalizePurchase = () => {
    alert("Compra realizada con éxito!");
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartDetailContainer>
      <h1 style={{ marginBottom: "20px", color: "white" }}>
        Detalle del Carrito
      </h1>

      {cart.length === 0 ? (
        <p style={{ marginBottom: "20px", color: "white" }}>
          Tu carrito está vacío.
        </p>
      ) : (
        <div>
          {cart.map((item) => (
            <CartItem key={item.movie.imdbID}>
              <CartItemImage src={item.movie.Poster} alt={item.movie.Title} />
              <CartItemDetails>
                <CartItemTitle>{item.movie.Title}</CartItemTitle>
                <CartItemYear>{item.movie.Year}</CartItemYear>
                <CartItemType>{item.movie.Type}</CartItemType>
                <p>Cantidad: {item.quantity}</p>
                <p>Tipo: {item.type}</p>
                {item.type === "renta" && (
                  <p>
                    Fecha de Renta:{" "}
                    {item.rentDate &&
                      new Date(item.rentDate).toLocaleDateString()}
                  </p>
                )}
              </CartItemDetails>
            </CartItem>
          ))}
        </div>
      )}
      <CheckoutButton onClick={finalizePurchase}>
        Finalizar Compra
      </CheckoutButton>

      <BackButton to="/">Regresar al inicio</BackButton>
    </CartDetailContainer>
  );
};

export default CartDetail;
