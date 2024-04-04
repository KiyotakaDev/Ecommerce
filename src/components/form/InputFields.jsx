import React from "react";

const InputFields = (props) => {
  return (
    <>
      <label
        htmlFor={props.label}
        className="text-teal-900 font-semibold text-lg"
      >
        {props.title}
      </label>
      <props.html
        type={props.type}
        name={props.label}
        placeholder={props.placeholder}
        {...(props.type === "file"
          ? { multiple: true, accept: "image/*" }
          : {})}
        {...(props.type === "number"
          ? { onChange: (e) => props.setPrice(e.target.value) }
          : {})}
        className="border-2 border-gray-300 rounded-md px-2 py-1 w-full mb-2 focus:border-emerald-500"
      />
      {props.type === "number" ? <span>${props.price / 100}</span> : null}
    </>
  );
};

export default InputFields;
