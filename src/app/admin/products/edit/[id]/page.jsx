"use client";

import Animation from "@/components/Animation";
import FormLayout from "@/components/form/FormLayout";
import { addProductFields } from "@/constants";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import MainLoader from "@/components/loaders/MainLoader";
import { useInputStore } from "@/store/inputStore";

const AddProduct = () => {
  const { id } = useParams();
  const { setProductFormData, isLoading, setIsLoading } = useInputStore()
  
  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/product/${id}`);
        const data = response.data.data;
        setProductFormData(data);
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
          <FormLayout
            formProps={{
              id: "products",
              pTitle: "Edit Product",
              pMapper: addProductFields,
            }}
          />
        </Animation>
      )}
    </>
  );
};

export default AddProduct;
