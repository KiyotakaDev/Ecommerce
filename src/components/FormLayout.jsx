"use client";

import { addProduct } from "@/app/admin/_actions/actions";
import { zodAdmin, zodProduct } from "@/utils/schemas";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormLayout = ({ formProps }) => {
  const [price, setPrice] = useState(0);

  const { id, pTitle, pMapper } = formProps;

  const handler = async (formData) => {
    if (id === "register") {
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
        toast.success(response.data);
      } catch (error) {
        const errors = error.response.data;
        for (let i = 0; i < errors.length; i++) {
          toast.error(errors[i]);
        }
      }
    } else if (id === "product") {
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
              {id === "register" ? (
                <>
                  <label
                    htmlFor={field.label}
                    className="text-teal-900 font-semibold text-lg"
                  >
                    {field.title}
                  </label>
                  <input
                    type={field.type}
                    name={field.label}
                    placeholder={field.placeholder}
                    className="border-2 border-gray-300 rounded-md px-2 py-1 w-full mb-2 focus:border-emerald-500"
                  />
                </>
              ) : id === "product" ? (
                <>
                  <label
                    htmlFor={field.label}
                    className="text-teal-900 font-semibold text-lg"
                  >
                    {field.title}
                  </label>
                  <field.html
                    type={field.type}
                    name={field.label}
                    placeholder={field.placeholder}
                    {...(field.type === "file"
                      ? { multiple: true, accept: "image/*" }
                      : {})}
                    {...(field.type === "number"
                      ? { onChange: (e) => setPrice(e.target.value) }
                      : {})}
                    className="border-2 border-gray-300 rounded-md px-2 py-1 w-full mb-2 focus:border-emerald-500"
                  />
                  {field.type === "number" ? <span>${price / 100}</span> : null}
                </>
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
