import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CartItem = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
  display: flex;
  align-items: center;
`;

const CartItemImage = styled.img`
  width: 100px;
  height: auto;
  margin-right: 16px;
`;

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
    <div>
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
      <button onClick={finalizePurchase}>Finalizar Compra</button>
    </div>
  );
}

export default CartDetail;
