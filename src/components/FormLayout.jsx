"use client";

import { addProduct } from "@/app/admin/_actions/product";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormLayout = ({ formProps }) => {
  const { id, pTitle, pMapper } = formProps;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handler = () => {
    if (id === "register") {
      return handleSubmit(async (data) => {
        try {
          if (data.password !== data.confirm_password)
            return toast.error("Passwords do not match");

          const response = await axios.post("/api/auth/register", {
            username: data.username,
            email: data.email,
            password: data.password,
          });
          toast.success(response.data.message);
        } catch (error) {
          const resError = error.response.data;
          for (let i = 0; i < resError.length; i++) {
            toast.error(resError[i]);
          }
        }
      });
    } else if (id === "product") {
      return addProduct;
    }
  };

  const select = handler();

  let messages = []

  return (
    <div>
      <h1 className="text-teal-900 font-bold my-2 mb-4 text-3xl">{pTitle}</h1>

      <form action={select}>
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
                    {...register(field.label, {
                      required: {
                        value: true,
                        message: `${field.title} is required.`,
                      },
                    })}
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
                    {...register(`${field.label}`, {
                      required: {
                        value: true,
                        message: `${field.title} is required.`,
                      },
                    })}
                    placeholder={field.placeholder}
                    {...(field.type === "file"
                      ? { multiple: true, accept: "image/*" }
                      : {})}
                    className="border-2 border-gray-300 rounded-md px-2 py-1 w-full mb-2 focus:border-emerald-500"
                  />
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
