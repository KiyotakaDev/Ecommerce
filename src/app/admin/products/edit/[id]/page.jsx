"use client";

import MainLoader from "@/components/loaders/MainLoader";
import ProductForm from "@/components/form/ProductForm";
import { useDataStore } from '@/store/dataStore'
import Animation from "@/components/Animation";
import { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productInfo, setProductInfo] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useDataStore()

  useEffect(() => {
    const getProduct = async () => {
      if (!id) return
      try {
        setIsLoading(true)
        const response = await axios.get(`/api/product/${id}`)
        setProductInfo(response.data.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error.message);
      }
    }
    getProduct()
  }, [id])
  
  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <Animation>
          <h1 className="form-title">Edit product</h1>
          {productInfo &&  (
            <ProductForm {...productInfo} />
          )}
        </Animation>
      )}
    </>
  );
};

export default AddProduct;
