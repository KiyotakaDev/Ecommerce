import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import React from "react";
import { toast } from "react-toastify";

const InputFields = (props) => {
  const [images, setImages] = props.useState([]);
  const CustomInput = props.html;

  if (props.type === "file") {
    const uploadImages = (e) => {
      const files = Array.from(e.target?.files)
      if (files.length > 4 || images > 4) {
        toast.error("Max 4 images")
        return
      }

      setImages(prev => [...prev, ...files])
    }

    return (
      <>
        <label
          htmlFor={props.label}
          className="text-teal-900 font-semibold text-lg"
        >
          {props.title}
        </label>
        {props.type === "file" ? (
          <div className="flex">
            {images.length > 0 ? (
              <>
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    alt={`Preview-${i}`}
                    className="h-24 w-auto rounded-lg"
                  />
                ))}
              </>
            ) : null}
            <label className="w-24 h-24 flex flex-col justify-center items-center bg-gray-300 rounded-lg cursor-pointer hover:scale-105 transition-all duration-200 ease-out">
              <ArrowUpOnSquareIcon className="stroke-teal-700 w-12 h-12" />
              <p className="text-teal-700">Upload</p>
              <input
                type={props.type}
                name={props.label}
                multiple
                accept="image/*"
                className="hidden"
                onChange={uploadImages}
              />
            </label>
          </div>
        ) : null}
      </>
    );
  }

  return (
    <>
      <label
        htmlFor={props.label}
        className="text-teal-900 font-semibold text-lg"
      >
        {props.title}
      </label>
      <CustomInput
        type={props.type}
        name={props.label}
        placeholder={props.placeholder}
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
