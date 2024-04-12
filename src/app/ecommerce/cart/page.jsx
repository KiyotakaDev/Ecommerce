"use client";

import Animation from "@/components/Animation";
import { useCartContext } from "@/components/client/CartProvider";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const { cartProducts, getCartProducts, isLoading } = useCartContext();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const get = async () => {
      setProducts(await getCartProducts());
    };
    get();
  }, []);

  return (
    <div className="wrapper">
      {cartProducts.length > 0 ? (
        <div className="cart-grid gap-x-10 mt-10">
          <div className="cart-prod p-10">
            <h1 className="text-4xl font-bold tracking-wider">Cart</h1>
            {!isLoading ? (
              <Animation>
                <table className="mt-10 w-full">
                  <thead className="text-gray-500">
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map((product, index) => (
                        <tr key={index}>
                          <td>
                            <div>
                              <div className="bg-zinc-400/60 rounded-lg flex justify-center items-center shadow-lg shadow-zinc-400">
                                <img
                                  src={product.imagesPath[0]}
                                  className="h-36 w-36"
                                />
                              </div>

                              {product.product}
                            </div>
                          </td>
                          <td>
                            {
                              cartProducts.filter((id) => id === product.id)
                                .length
                            }
                          </td>
                          <td>100</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Animation>
            ) : null}
          </div>
          <div className="bg-white rounded-lg h-[40vh] w-full">payment</div>
        </div>
      ) : (
        <div>No products added</div>
      )}
    </div>
  );
};

export default CartPage;
