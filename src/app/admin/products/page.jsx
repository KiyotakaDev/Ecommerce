"use client";

import Animation from "@/components/Animation";
import DataLayout from "@/components/data-samplers/DataLayout";
import axios from "axios";
import { useEffect } from "react";
import { useDataStore } from "@/store/store";

const Products = () => {
  const { setData, setMapper } = useDataStore();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        const products = response.data
        const dataToStore = {
          link: "products/new",
          field: "Product"
        }
        setMapper(products)
        setData(dataToStore);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProducts();
  }, [setData]);

  return (
    <Animation>
      <DataLayout />
    </Animation>
  );
};

export default Products;
