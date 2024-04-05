"use client";

import Animation from "@/components/Animation";
import DataLayout from "@/components/data-samplers/DataLayout";
import axios from "axios";
import { useEffect } from "react";
import { useDataStore } from "@/store/store";
import MainLoader from "@/components/loaders/MainLoader";

const Products = () => {
  const { setData, setMapper, isLoading, setLoading } = useDataStore();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/products");
        const products = response.data;
        const dataToStore = {
          link: "products/new",
          field: "Product",
        };
        setMapper(products);
        setData(dataToStore);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [setData]);

  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <Animation>
          <DataLayout />
        </Animation>
      )}
    </>
  );
};

export default Products;
