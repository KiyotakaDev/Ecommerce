import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const DataLayout = ({ dataProps }) => {
  const { pLink, pTitle, pField, pMapper, setField } = dataProps;

  const customDeleteHandler = async (id) => {
    if (pField === "Admin") {
      try {
        const response = await axios.delete(`/api/admin/${id}`);
        toast.success(response.data);
        setField(pMapper.filter((mapper) => mapper.id !== id))
      } catch (error) {
        toast.error("Something went wrong")
      }
    } else if (pField === "Product") {
      console.log("Hello product");
    }
  };

  return (
    <div>
      <Link href={pLink} className="app-btn">
        Add admin
      </Link>
      {pMapper.length === 0 ? (
        <p>No {pField.toLowerCase()} added</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>{pTitle}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pMapper.map((field) => {
              const { id, username } = field;
              return (
                <tr key={id}>
                  <td className="text-xl">{username}</td>
                  <td>
                    <button
                      onClick={() => customDeleteHandler(id)}
                      className="bg-red-400/80 px-2 py-1 rounded-lg text-base flex justify-center items-center"
                    >
                      <TrashIcon className="w-8 h-8" />
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <ToastContainer />
    </div>
  );
};

export default DataLayout;
