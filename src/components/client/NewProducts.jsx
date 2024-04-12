"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./sub/ProductCard";

const NewProducts = () => {
  const [latest, setLatest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLatestProds = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/client/latest");
        setLatest(response.data.latest);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        if (error.response) console.log(error.response.error);
      }
    };
    getLatestProds();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="wrapper pb-16">
          <h3 className="py-6 text-3xl font-semibold text-violet-950">
            New arrivals
          </h3>
          <div className="latest-prods gap-10">
            {latest.length > 0 &&
              latest.map((prod, index) => (
                <ProductCard key={index} {...prod} />
              ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NewProducts;
