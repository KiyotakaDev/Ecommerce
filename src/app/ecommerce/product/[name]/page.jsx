"use client";

import { useCartContext } from "@/components/client/CartProvider";
import ProductImages from "@/components/client/ProductImages";
import ProductLoader from "@/components/loaders/productLoader";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const { productID, addProductToCart } = useCartContext();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/client/product/${productID}`);
        setProduct(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProduct();
  }, []);

  return (
    <>
      {isLoading ? (
        <ProductLoader />
      ) : (
        <div className="wrapper">
          <div className="single-grid mt-14 gap-10">
            <div className="bg-white flex justify-center items-center rounded-xl px-10 py-6">
              {product?.imagesPath && (
                <ProductImages images={product?.imagesPath} />
              )}
            </div>
            <div className="flex flex-col justify-between py-10">
              <div>
                <h1 className="text-4xl font-bold text-violet-950 mb-5">
                  {product.product}
                </h1>
                <p className="text-2xl">{product.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-2xl">
                  ${product.price / 100}
                </span>
                <button
                  onClick={() => addProductToCart(product.id)}
                  className="client-p-btn text-white"
                >
                  <ShoppingCartIcon className="w-8 h-8 stroke-white" />
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
