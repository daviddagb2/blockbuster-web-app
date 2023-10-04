import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  background-color: var(--sky-blue);
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

// Componente
const CartDetail: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const finalizePurchase = () => {
    alert("Compra realizada con éxito!");
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartDetailContainer>
      <h1>Detalle del Carrito</h1>
      <div>
        {cart.map(movie => (
          <CartItem key={movie.imdbID}>
            <CartItemImage src={movie.Poster} alt={movie.Title} />
            <div>
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
              <p>{movie.Type}</p>
              {/* Aquí puedes mostrar la cantidad si decides implementar esa funcionalidad */}
            </div>
          </CartItem>
        ))}
      </div>
      <CheckoutButton onClick={finalizePurchase}>Finalizar Compra</CheckoutButton>
    </CartDetailContainer>
  );
}

export default CartDetail;
