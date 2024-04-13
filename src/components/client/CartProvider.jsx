import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Context error");
  return context;
};

export const CartProvider = ({ children }) => {
  const defaultProducts = JSON.parse(localStorage.getItem("cart"));
  const [cartProducts, setCartProducts] = useState(defaultProducts || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  const getCartProducts = async () => {
    try {
      setIsLoading(true);
      const uniqueProducts = new Set(cartProducts)
      const uniqueArray = [...uniqueProducts]
      const productsResponse = await Promise.all(
        uniqueArray.map(async (id) => {
          const response = await axios.get(`/api/client/product/${id}`);
          return response.data.products;
        })
      );
      setIsLoading(false);
      return productsResponse;
    } catch (error) {
      console.log(error.message);
    }
  };

  const addProductToCart = (productID) => {
    setCartProducts((prev) => [...prev, productID]);
  };
  const lessOfThisProduct = (productID) => {
    console.log(productID);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        getCartProducts,
        isLoading,
        addProductToCart,
        lessOfThisProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
