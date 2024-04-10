"use client";

import { addProductFields } from "@/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

const ProductForm = ({
  id,
  product: existingProduct,
  description: existingDescription,
  price: existingPrice,
}) => {
  const router = useRouter();

  const initialState = {
    product: existingProduct || "",
    images: [],
    description: existingDescription || "",
    price: existingPrice || 0,
  };
  const [productData, setProductData] = useState(initialState);

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Edit
        const response = await axios.put(`/api/product/${id}`, productData);
        if (response.status === 200) {
          router.push("/admin/products");
        }
      } else {
        // Create
        const response = await axios.post("/api/product/new", productData);
        console.log(response);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const handleFormInputs = (e, label) => {
    const { value } = e.target;
    setProductData((prev) => ({ ...prev, [label]: value }));
  };
  const handleImage = (e) => {
    const { files } = e.target;
    setProductData((prev) => ({ ...prev, images: [...files] }));
  };

  return (
    <form onSubmit={saveProduct} className="flex flex-col">
      {addProductFields.map((fields, index) => {
        const { html: CustomTag, type, label, title, placeholder } = fields;
        return (
          <div key={index}>
            <label className="form-label">{title}</label>
            <CustomTag
              type={type}
              value={productData[label]}
              onChange={(e) => handleFormInputs(e, label)}
              placeholder={placeholder}
              className="input-fields"
            />
            {label == "product" ? (
              <div className="flex flex-col">
                <label className="form-label">Images</label>
                <label className="w-24 h-24 flex flex-col justify-center items-center bg-gray-300 rounded-lg cursor-pointer hover:scale-105 transition-all duration-200 ease-out">
                  <ArrowUpOnSquareIcon className="stroke-teal-700 w-12 h-12" />
                  <p className="text-teal-700">Upload</p>
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    multiple
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>
              </div>
            ) : null}
            {type === "number" && (
              <span className="-mt-2 font-semibold text-teal-700/60">
                ${productData.price / 100}
              </span>
            )}
          </div>
        );
      })}
      <button type="submit" className="app-btn mt-3">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
