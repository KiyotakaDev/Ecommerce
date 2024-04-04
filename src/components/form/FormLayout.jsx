"use client";

import { addProduct } from "@/app/admin/_actions/actions";
import { zodAdmin, zodProduct } from "@/utils/schemas";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputFields from "./InputFields";
import { useRouter } from 'next/navigation'

const FormLayout = ({ formProps }) => {
  const router = useRouter()
  const [price, setPrice] = useState(0);

  const { id, pTitle, pMapper } = formProps;

  const handler = async (formData) => {
    if (id === "admins") {
      try {
        const newData = {
          username: formData.get("username"),
          email: formData.get("email"),
          password: formData.get("password"),
        };

        if (newData.password !== formData.get("confirm_password")) {
          return toast.error("Passwords do not match");
        }

        const validator = zodAdmin.safeParse(newData)
        if (!validator.success) {
          const errors = validator.error.formErrors.fieldErrors
          for (const err in errors) {
            toast.error(errors[err][0])
          }
          return
        }

        const response = await axios.post("/api/admin/new", newData);
        if (response.status === 200) {
          router.push("/admin/admins")
        }
        toast.success(response.data);
      } catch (error) {
        const errors = error.response.data;
        for (let i = 0; i < errors.length; i++) {
          toast.error(errors[i]);
        }
      }
    } else if (id === "products") {
      const validator = zodProduct.safeParse({
        product: formData.get("product"),
        images: formData.getAll("image"),
        description: formData.get("description"),
        price: formData.get("price"),
      });
      if (!validator.success) {
        const errors = validator.error.formErrors.fieldErrors;
        for (const err in errors) {
          toast.error(errors[err][0]);
        }
      }

      router.push('/admin/products')
      return addProduct(formData);
    }
  };

  return (
    <div>
      <h1 className="text-teal-900 font-bold my-2 mb-4 text-3xl">{pTitle}</h1>

      <form action={handler}>
        {pMapper.map((field, index) => {
          return (
            <div key={index}>
              {id === "admins" ? (
                  <InputFields {...field} />
              ) : id === "products" ? (
                  <InputFields {...field} price={price} setPrice={setPrice} />
              ) : null}
            </div>
          );
        })}
        <ToastContainer />
        <button type="submit" className="app-btn mt-3">
          Add
        </button>
      </form>
    </div>
  );
};

export default FormLayout;
