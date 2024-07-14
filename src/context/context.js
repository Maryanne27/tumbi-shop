import React, { createContext, useState } from "react";

export const context = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartQuantity = cart.length;
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId)
    );
  };

  const incrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId
          ? { ...product, quantity: (product.quantity || 1) + 1 }
          : product
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId && (product.quantity || 1) > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  return (
    <context.Provider
      value={{
        cart,
        cartQuantity,
        addToCart,
        clearCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </context.Provider>
  );
};
