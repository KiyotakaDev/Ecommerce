import { useInputStore } from "@/store/inputStore";
import { toast } from "react-toastify";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

const InputFields = (props) => {
  const { html: CustomTag, label, title, type, placeholder, editing } = props;
  const { setImages, images, setProductFormData, productFormData } =
    useInputStore();

  const maxFileSize = 1024 * 1024 * 5; // 5MB in Bits
  const imageTypes = ["image/jpeg", "image/jpg", "image/png"];

  const imageUpload = (e) => {
    const files = Array.from(e.target.files);
    const errors = [];

    files.forEach((file, index) => {
      const size = file.size;
      const type = file.type;
      if (!imageTypes.includes(type))
        return errors.push(
          `File ${index + 1}: Only .jpeg, .jpg and .png are allowed`
        );
      if (size >= maxFileSize)
        return errors.push(`File ${index + 1}: Max size allowed is 5MB`);
    });

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    if (files.length === 0) {
      toast.error("Image is required");
      return;
    }
    if (files.length > 4 || productFormData.imagesPath.length > 3) {
      toast.error("Max 4 images");
      return;
    }
    if (productFormData) {
      setImages([...productFormData.imagesPath, ...files])
    } else {
      setImages(files)
    }
  };
  useEffect(() => {
    if (editing) setImages(productFormData.imagesPath)
  }, [])
  
  const handleFormInputs = (e) => {
    const { value } = e.target;
    setProductFormData({ [label]: value });
  };

  const renderImagesPreview = () => {
    const dbImages = productFormData.imagesPath;
    const imagesToRender = dbImages.length > 0 ? dbImages : images;
    return imagesToRender.map((image, index) => (
      <img
        key={index}
        src={dbImages.length > 0 ? image : URL.createObjectURL(image)}
        alt={`Preview-${index}`}
        className="h-24 w-auto rounded-lg"
      />
    ));
  };

  if (type === "file") {
    return (
      <div className="flex flex-col">
        <label htmlFor={label} className="text-teal-900 font-semibold text-lg">
          {title}
        </label>
        <div className="flex gap-2">
          {renderImagesPreview()}
          <label className="w-24 h-24 flex flex-col justify-center items-center bg-gray-300 rounded-lg cursor-pointer hover:scale-105 transition-all duration-200 ease-out">
            <ArrowUpOnSquareIcon className="stroke-teal-700 w-12 h-12" />
            <p className="text-teal-700">Upload</p>
            <input
              type="file"
              name={label}
              accept="image/jpg, image/jpeg, image/png"
              multiple
              onChange={imageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={label} className="text-teal-900 font-semibold text-lg">
        {title}
      </label>
      <CustomTag
        type={type}
        name={label}
        placeholder={placeholder}
        {...(productFormData && editing
          ? { value: productFormData[label] }
          : {})}
        onChange={(e) => handleFormInputs(e)}
        className="input-fields"
      />
      {type === "number" && (
        <span className="-mt-2 font-semibold text-teal-700/60">
          ${productFormData.price / 100}
        </span>
      )}
    </div>
  );
};

export default InputFields;
