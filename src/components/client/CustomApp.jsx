"use client";

import { CartProvider } from "./CartProvider";
import Header from "./Header";

const CustomApp = ({ children }) => {
  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  );
};

export default CustomApp;
