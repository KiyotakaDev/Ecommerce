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
              <label htmlFor={label}>{title}</label>
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
                />
              ) : id === "product" ? (
                <input type={field.type} placeholder={placeholder} />
              ) : null}
            </div>
          );
        })}
        <button type="submit" className="app-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default FormLayout;
