import React, { useState } from "react";

const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="h-[50vh] flex flex-col justify-between">
      <div className="flex justify-center items-center mb-4 shadow-xl rounded-lg">
        <img src={activeImage} className="w-auto h-72" />
      </div>
      <div className="grid grid-cols-3 gap-x-2">
        {images.map((image, index) => (
          <div
            key={index}
            onMouseEnter={() => {
              setActiveImage(image), setIsActive(true);
            }}
            onMouseLeave={() => setIsActive(false)}
            className={`transition-all duration-200 ease-in-out preview-image rounded-lg cursor-pointer flex justify-center items-center p-2 ${
              isActive ? "hover:-translate-y-4" : ""
            }`}
          >
            <img src={image} alt="prev" className="h-32 w-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
