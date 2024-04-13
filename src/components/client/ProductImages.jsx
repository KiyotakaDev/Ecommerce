import React, { useState } from "react";

const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <div>
      <div className="flex justify-center items-center mb-4 shadow-xl rounded-lg">
        <img src={activeImage} className="w-auto h-56" />
      </div>
      <div className="grid grid-cols-3 gap-x-2">
        {images.map((image, index) => (
          <div
            key={index}
            onMouseEnter={() => setActiveImage(image)}
            className="preview-image rounded-lg cursor-pointer flex justify-center items-center p-2"
          >
            <img src={image} alt="prev" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
