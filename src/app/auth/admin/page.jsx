"use client";

import { adminLogin } from "@/constants";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const router = useRouter();

  const initialState = {
    username: "",
    password: "",
  };
  const [logData, setLogData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        username: logData.username,
        password: logData.password,
        redirect: false,
      });
      if (response.error) {
        toast.error(response.error);
        return;
      }
      if (response.ok) {
        router.push("/admin");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const handleOnChange = (value, label) => {
    setLogData((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <div className="h-screen flex justify-center items-center bg-violet-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between bg-violet-300 shadow-lg shadow-violet-700 p-10 h-[50%] w-[35%] rounded-2xl"
      >
        <div className="flex flex-col gap-5">
          <h1 className="form-title">Login</h1>
          {adminLogin.map((field, index) => {
            const { title, type, placeholder } = field;
            const htfor = title.toLocaleLowerCase();
            return (
              <div key={index} className="flex flex-col">
                <label htmlFor={htfor} className="form-label">
                  {title}
                </label>
                <input
                  type={type}
                  name={htfor}
                  placeholder={placeholder}
                  onChange={(e) => handleOnChange(e.target.value, htfor)}
                  className="input-fields py-3 px-5 text-2xl"
                />
              </div>
            );
          })}
        </div>
        <button className="w-full form-btn py-3 rounded-lg font-bold">
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
