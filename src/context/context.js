// src/contexts/context.js
import React, { createContext, useState } from 'react';

export const context = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartQuantity = cart.length;

  return (
    <context.Provider value={{ cart, addToCart, clearCart, cartQuantity }}>
      {children}
    </context.Provider>
  );
};
