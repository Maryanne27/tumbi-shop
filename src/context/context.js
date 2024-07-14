import React, { createContext, useEffect, useState } from "react";

export const context = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
      setCartQty(
        storedCart.reduce((total, item) => total + item.quantity, 0)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartQty(cart.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);
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
        cartQty,
        setSearchQuery,
      }}
    >
      {children}
    </context.Provider>
  );
};
