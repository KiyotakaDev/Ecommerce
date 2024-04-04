import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const DataLayout = ({ dataProps }) => {
  const { pLink, pTitle, pField, pMapper, setMapper } = dataProps;

  const customDeleteHandler = async (id) => {
    if (pField === "Admin") {
      try {
        const response = await axios.delete(`/api/admin/${id}`);
        toast.success(response.data);
        setMapper(pMapper.filter((mapper) => mapper.id !== id))
      } catch (error) {
        toast.error("Something went wrong")
      }
    } else if (pField === "Product") {
      try {
        const response = await axios.delete(`/api/product/${id}`);
        toast.success(response.data);
        setMapper(pMapper.filter((mapper) => mapper.id !== id))
      } catch (error) {
        toast.error("Something went wrong")
      }
    }
  };

  return (
    <div>
      <Link href={pLink} className="app-btn">
        {`Add ${pField.toLowerCase()}`}
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
              const { id, username, name } = field;
              return (
                <tr key={id}>
                  <td className="text-xl">{pField === 'Admin' ? username : name}</td>
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
