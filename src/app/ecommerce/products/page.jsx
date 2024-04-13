"use client";

import ProductCard from "@/components/client/sub/ProductCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductLoader from "@/components/loaders/ProductLoader";
import Animation from "@/components/Animation";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/client/product/all");
        setAllProducts(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <ProductLoader />
      ) : (
        <Animation>
          <div className="wrapper">
            <h1 className="text-4xl text-violet-950 font-bold tracking-wide mt-10 mb-5">
              All products
            </h1>
            <div className="allproducts-grid gap-10">
              {allProducts &&
                allProducts.map((prod, index) => (
                  <ProductCard key={index} {...prod} />
                ))}
            </div>
          </div>
        </Animation>
      )}
    </>
  );
};

export default AllProducts;
