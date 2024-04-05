// "use client";

// import axios from "axios";
// import Link from "next/link";
// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AdminsData from "./AdminsData";
// import ProductsData from "./ProductsData";
// import Modal from "../sub/Modal";
// import BtnHandler from "../sub/BtnHandler";
// import { useDataStore } from '@/store/store'

// const DataLayout = () => {
//   const { link, field, mapper, setMapper } = useDataStore;
//   const [idToDelete, setIdToDelete] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selected, setSelected] = useState("");

//   const handleAction = (id) => {
//     setShowModal(true);
//     setIdToDelete(id);
//   };

//   const confirmDelete = () => {
//     customDeleteHandler(idToDelete);
//     setShowModal(false);
//   };

//   const cancelDelete = () => {
//     setShowModal(false);
//     setIdToDelete(null);
//   };

//   const customDeleteHandler = async (id) => {
//     if (field === "Admin") {
//       try {
//         const response = await axios.delete(`/api/admin/${id}`);
//         toast.success(response.data);
//         setMapper(mapper.filter((mapper) => mapper.id !== id));
//       } catch (error) {
//         toast.error("Something went wrong");
//       }
//     } else if (field === "Product") {
//       try {
//         const response = await axios.delete(`/api/product/${id}`);
//         toast.success(response.data);
//         setMapper(mapper.filter((mapper) => mapper.id !== id));
//       } catch (error) {
//         toast.error("Something went wrong");
//       }
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-teal-900 font-bold my-2 mb-4 text-3xl">{field}s</h1>
//       <Link href={link} className="app-btn">
//         {`Add ${field.toLowerCase()}`}
//       </Link>
//       {field === "Admin" ? (
//         <AdminsData
//           {...dataProps}
//           handleAction={handleAction}
//           setSelected={setSelected}
//         />
//       ) : field === "Product" ? (
//         <ProductsData
//           {...dataProps}
//           handleAction={handleAction}
//           setSelected={setSelected}
//         />
//       ) : null}
//       <Modal isOpen={showModal} cancel={cancelDelete}>
//         {selected === "root" ? (
//           <BtnHandler id={0} action={{ cancel: cancelDelete }} />
//         ) : mapper.length === 2 && field === 'Admin' ? (
//           <BtnHandler id={1} action={{ cancel: cancelDelete }} />
//         ) : (
//           <BtnHandler
//             id={2}
//             action={{
//               confirm: confirmDelete,
//               cancel: cancelDelete,
//             }}
//             obj={selected}
//             type={field.toLowerCase()}
//           />
//         )}
//       </Modal>
//       <ToastContainer autoClose={2500} />
//     </div>
//   );
// };

// export default DataLayout;

import React from "react";
import { useDataStore } from "@/store/store";
import Link from "next/link";
import ActionHandler from "../sub/ActionHandler";
import {
  InformationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DataLayout = () => {
  const data = useDataStore();
  const { link, field, mapper, setMapper } = data;

  const type = field.toLowerCase();

  const handleDelete = async (id, type) => {
    try {
      const response = await axios.delete(`/api/${type}/${id}`);
      const filter = mapper.filter((newData) => newData.id !== id);
      setMapper(filter);
      toast.success(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {!data ? (
        <div>Loading</div>
      ) : (
        <>
          <h1 className="text-teal-900 font-bold my-2 mb-4 text-3xl">
            {field}s
          </h1>
          <Link href={link} className="app-btn">
            {`Add ${field.toLowerCase()}`}
          </Link>
          {mapper.length !== 0 ? (
            <>
              <table className="border border-slate-300">
                <thead>
                  <tr className="border border-slate-200">
                    <td>{field}</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {mapper.map((data, index) => {
                    const { username, name } = data;
                    const validation = username ? username : name;

                    return (
                      <tr key={index}>
                        <td>{validation}</td>
                        <td>
                          {username !== "root" || name ? (
                            <div className="flex justify-evenly">
                              <Link
                                href={`${type}s/edit/${data.id}`}
                                className="action-btn bg-yellow-500"
                              >
                                <PencilSquareIcon className="w-5 h-5" />
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(data.id, type)}
                                className="action-btn text-white bg-red-500"
                              >
                                <TrashIcon className="w-5 h-5" />
                                Delete
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-evenly items-center">
                              <button className="bg-slate-400 hover:bg-slate-500 transition-colors duration-200 ease-in-out w-full flex justify-center items-center action-btn">
                                <InformationCircleIcon className="w-6 h-6" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <div>No {type}s yet!</div>
          )}
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default DataLayout;
