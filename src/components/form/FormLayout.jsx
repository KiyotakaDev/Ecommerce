"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputFields from "./InputFields";
import { addProduct } from "@/app/admin/_actions/actions";
import { useInputStore } from "@/store/inputStore";
import { useDataStore } from "@/store/dataStore";
import { useRouter } from "next/navigation";
import axios from "axios";

const FormLayout = ({ formProps }) => {
  const router = useRouter();
  const { id, pMapper, pTitle } = formProps;
  const { images: inputImages } = useInputStore();
  const { id: productID } = useDataStore;

  const editing = pTitle.includes("Edit");

  const handler = async (formData) => {
    if (id === "products") {
      try {
        inputImages.forEach((image) => {
          formData.append("images", image);
        });

        const response = await addProduct(formData, editing, productID);
        if (response.errors) {
          const errors = response.errors;
          for (const error in errors) {
            toast.error(errors[error][0]);
          }
        } else if (response === 200) {
          router.push("/admin/products");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (id === "admins") {
      try {
        const newData = {
          username: formData.get("username"),
          email: formData.get("email"),
          password: formData.get("password"),
          confirm_password: formData.get("confirm_password"),
        };

        const response = await axios.post("/api/admin/new", newData);
        if (response.status === 200) {
          router.push("/admin/admins");
        }
      } catch (error) {
        const backErrors = error.response.data.errors;
        backErrors.forEach((err) => toast.error(err));
      }
    }
  };

  return (
    <div>
      <h1 className="text-teal-900 font-bold my-2 mb-4 text-3xl">{pTitle}</h1>

      <form action={handler}>
        {pMapper.map((field, index) => (
          <div key={index} className="flex">
            <InputFields {...field} editing={editing} />
          </div>
        ))}
        <button type="submit" className="app-btn mt-3">
          Add
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormLayout;
