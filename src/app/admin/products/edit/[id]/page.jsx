"use client";

import Animation from "@/components/Animation";
import FormLayout from "@/components/form/FormLayout";
import { addProductFields } from "@/constants";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import MainLoader from "@/components/loaders/MainLoader";

const AddProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/product/${id}`);
        const data = response.data.data;
        setProduct(data);
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
              pData: product,
            }}
          />
        </Animation>
      )}
    </>
  );
};

export default AddProduct;
