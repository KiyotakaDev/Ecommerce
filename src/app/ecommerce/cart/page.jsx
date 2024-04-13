"use client";

import Animation from "@/components/Animation";
import { useCartContext } from "@/components/client/CartProvider";
import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const {
    cartProducts,
    getCartProducts,
    isLoading,
    addProductToCart,
    lessOfThisProduct,
  } = useCartContext();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const get = async () => {
      const cartProductsResponse = await getCartProducts();
      setProducts(cartProductsResponse);
    };
    get();
  }, []);

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p.id === productId)?.price || 0;
    total += price;
  }

  return (
    <div className="wrapper">
      {cartProducts.length > 0 ? (
        <div className="cart-grid gap-x-10 mt-10">
          <div className="cart-prod p-10">
            <h1 className="text-4xl font-bold tracking-wider">Cart</h1>
            {!isLoading ? (
              <Animation>
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map((product, index) => {
                        const productQuantity = cartProducts.filter(
                          (id) => id === product.id
                        ).length;

                        return (
                          <tr key={index}>
                            <td>
                              <div className="flex flex-col gap-3 mt-2">
                                <div className="mt-2 w-full bg-zinc-400/60 rounded-lg flex justify-center items-center shadow-lg shadow-zinc-400 gap-4">
                                  <img
                                    src={product.imagesPath[0]}
                                    className="h-36 w-36"
                                  />
                                </div>
                                <span className="text-black text-xl">
                                  {product.product}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="grid grid-cols-1 grid-rows-3 w-3/5">
                                <button
                                  onClick={() => addProductToCart(product.id)}
                                  className="quantity"
                                >
                                  +
                                </button>
                                <span className="flex justify-center items-center">
                                  {productQuantity}
                                </span>
                                {productQuantity > 1 ? (
                                  <button
                                    onClick={() =>
                                      lessOfThisProduct(product.id)
                                    }
                                    className="quantity"
                                  >
                                    -
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      lessOfThisProduct(product.id)
                                    }
                                    className="quantity bg-red-400 hover:bg-red-600"
                                  >
                                    <TrashIcon className="w-6 h-6 stroke-white" />
                                  </button>
                                )}
                              </div>
                            </td>
                            <td>${product.price / 100}</td>
                          </tr>
                        );
                      })}
                    <tr>
                      <td></td>
                      <td></td>
                      <td className="text-2xl text-black pt-5">
                        ${total / 100}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Animation>
            ) : null}
          </div>
          <div className="bg-white rounded-lg h-[40vh] w-full">payment</div>
        </div>
      ) : (
        <div className="mt-20">
          <p className="text-4xl font-bold text-center">No products in cart</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
