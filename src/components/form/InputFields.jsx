// import { useInputStore } from "@/store/inputStore";
// import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
// import { toast } from "react-toastify";

// const InputFields = (props) => {
//   const { images, setImages } = useInputStore()

//   if (props.formType.includes('Edit')) {
//     console.log("Edit");
//   }
//   const CustomInput = props.html;

//   const max_file_size = 1024 * 1024 * 5; // 5MB in Bits
//   const image_types = ["image/jpeg", "image/jpg", "image/png"];

//   if (props.type === "file") {
//     const uploadImages = (e) => {
//       const files = Array.from(e.target.files);
//       const errors = []

//       files.forEach((file, index) => {
//         const size = file.size
//         const type = file.type
//         if (!image_types.includes(type)) errors.push(`File ${index + 1}: Only .jpeg, .jpg and .png are allowed`)
//         if (size >= max_file_size) errors.push(`File ${index + 1}: Max size allowed is 5MB`)
//       })

//       if (errors.length > 0) {
//         errors.forEach((error) => toast.error(error))
//         return
//       }

//       if (files.length === 0) {
//         toast.error("Image is required")
//         return
//       }
//       if (files.length > 4 || images.length > 3) {
//         toast.error("Max 4 images")
//         return
//       }
//       setImages((prev) => [...prev, ...files]);
//     };

//     return (
//       <>
//         <label
//           htmlFor={props.label}
//           className="text-teal-900 font-semibold text-lg"
//         >
//           {props.title}
//         </label>
//         {props.type === "file" ? (
//           <div className="flex">
//             {images.length > 0 ? (
//               <>
//                 {images.map((img, i) => (
//                   <img
//                     key={i}
//                     src={URL.createObjectURL(img)}
//                     alt={`Preview-${i}`}
//                     className="h-24 w-auto rounded-lg"
//                   />
//                 ))}
//               </>
//             ) : null}
//             <label className="w-24 h-24 flex flex-col justify-center items-center bg-gray-300 rounded-lg cursor-pointer hover:scale-105 transition-all duration-200 ease-out">
//               <ArrowUpOnSquareIcon className="stroke-teal-700 w-12 h-12" />
//               <p className="text-teal-700">Upload</p>
//               <input
//                 type={props.type}
//                 name={props.label}
//                 multiple
//                 accept="image/jpg, image/jpeg, image/png"
//                 className="hidden"
//                 onChange={uploadImages}
//               />
//             </label>
//           </div>
//         ) : null}
//       </>
//     );
//   }

//   return (
//     <>
//       <label
//         htmlFor={props.label}
//         className="text-teal-900 font-semibold text-lg"
//       >
//         {props.title}
//       </label>
//       <CustomInput
//         type={props.type}
//         name={props.label}
//         placeholder={props.placeholder}
//         {...(props.type === "number"
//           ? { onChange: (e) => props.setPrice(e.target.value) }
//           : {})}
//         className="border-2 border-gray-300 rounded-md px-2 py-1 w-full mb-2 focus:border-emerald-500"
//       />
//       {props.type === "number" ? <span>${props.price / 100}</span> : null}
//     </>
//   );
// };

// export default InputFields;
import { useInputStore } from "@/store/inputStore";
import { toast } from "react-toastify";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

const InputFields = (props) => {
  const { html: CustomTag, label, title, type, placeholder } = props;
  const { price, setPrice, images, setImages } = useInputStore();

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
    if (files.length > 4 || images.length > 3) {
      toast.error("Max 4 images");
      return;
    }
    setImages(files);
  };

  if (type === "file") {
    return (
      <div className="flex flex-col">
        <label htmlFor={label} className="text-teal-900 font-semibold text-lg">
          {title}
        </label>
        <div className="flex gap-2">
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
        {...(type == "number"
          ? { onChange: (e) => setPrice(e.target.value) }
          : {})}
        className="input-fields"
      />
      {type == "number" ? (
        <span className="-mt-2 font-semibold text-teal-700/60">
          ${price / 100}
        </span>
      ) : null}
    </div>
  );
};

export default InputFields;
