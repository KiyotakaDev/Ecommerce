"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import Animation from "../Animation";
import FeatureLoader from "../loaders/FeatureLoader";
import { useCartContext } from "./CartProvider";

const Featured = () => {
  const { addProductToCart } = useCartContext()

  const [featured, setFeatured] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFeatured = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/client/featured");
        setFeatured(response.data.featured);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        if (error.response) {
          console.log(error.response.error);
        }
      }
    };

    getFeatured();
  }, []);

  return (
    <div className="bg-zinc-900">
      {isLoading ? (
        <FeatureLoader />
      ) : (
        <Animation>
          <div className="wrapper featured-grid h-[60vh] max-h-[60vh] py-14">
            <div className="flex flex-col justify-center items-start gap-6">
              <h1 className="text-white text-5xl font-bold tracking-wider">
                {featured.product}
              </h1>
              <div className="h-56 overflow-y-scroll">

              <p className="text-zinc-300 text-xl">{featured.description}</p>
              </div>
              <div className="flex gap-12 text-lg text-white">
                <button className="client-s-btn">
                  Read more
                </button>
                <button onClick={() => addProductToCart(featured.id)} className="client-p-btn">
                  <ShoppingCartIcon className="w-8 h-8" />
                  Add to cart
                </button>
              </div>
            </div>
            <div className="relative flex justify-center items-center h-full">
              <img
                src={featured?.imagesPath ? featured.imagesPath[0] : null}
                alt={`${featured.product} preview`}
                className="absolute h-[110%] w-auto -top-5 rounded-2xl"
              />
            </div>
          </div>
        </Animation>
      )}
    </div>
  );
};

export default Featured;
