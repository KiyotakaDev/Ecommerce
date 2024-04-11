"use client";

import MainLoader from "@/components/loaders/MainLoader";
import ProductForm from "@/components/admin/form/ProductForm";
import { useDataStore } from "@/store/dataStore";
import { useInputStore } from "@/store/inputStore";
import Animation from "@/components/Animation";
import { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useDataStore();
  const { setProductInfo } = useInputStore();

  useEffect(() => {
    const getProduct = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/product/${id}`);
        setProductInfo(response.data.data);
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
        <MainLoader />
      ) : (
        <Animation>
          <h1 className="form-title">Edit product</h1>
          <ProductForm />
        </Animation>
      )}
    </>
  );
};

export default AddProduct;
