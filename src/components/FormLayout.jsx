"use client";

import { useForm } from "react-hook-form";

const FormLayout = ({ formProps }) => {
  const { id, pTitle, pMapper } = formProps;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const selectSubmit = handleSubmit(async (data) => {
    if (id === "register") {
      console.log("Register func: ", data);
    } else if (id === "product") {
      console.log("Product func: ", data);
    }
  });

  return (
    <div>
      <h1 className="text-teal-900 font-bold my-2 mb-4 text-3xl">{pTitle}</h1>

      <form action={selectSubmit}>
        {pMapper.map((field, index) => {
          const { label, title, type, placeholder } = field;
          return (
            <div key={index}>
              <label
                htmlFor={label}
                className="text-teal-900 font-semibold text-lg"
              >
                {title}
              </label>
              {id === "register" ? (
                <input
                  type={type}
                  {...register(label, {
                    required: {
                      value: true,
                      message: `${title} is required.`,
                    },
                  })}
                  placeholder={placeholder}
                  className="border-2 border-gray-300 rounded-md px-2 py-1 w-full mb-2 focus:border-emerald-500"
                />
              ) : id === "product" ? (
                <input type={field.type} placeholder={placeholder} />
              ) : null}
            </div>
          );
        })}
        <button type="submit" className="app-btn mt-3">
          Add
        </button>
      </form>
    </div>
  );
};

export default FormLayout;
