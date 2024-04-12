import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Context error");
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const addProductToCart = (product) => {
    setCartProducts(prev => [...prev, product])
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addProductToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
