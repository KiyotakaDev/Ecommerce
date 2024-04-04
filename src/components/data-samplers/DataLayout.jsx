"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import AdminsData from "./AdminsData";
import ProductsData from "./ProductsData";

const DataLayout = ({ dataProps }) => {
  const { pLink, pTitle, pField, pMapper, setMapper } = dataProps;
  const [idToDelete, setIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState("");

  const deleteOnClick = (id) => {
    setShowModal(true);
    setIdToDelete(id);
  };

  const confirmDelete = () => {
    customDeleteHandler(idToDelete);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setIdToDelete(null);
  };

  const customDeleteHandler = async (id) => {
    if (pField === "Admin") {
      try {
        const response = await axios.delete(`/api/admin/${id}`);
        toast.success(response.data);
        setMapper(pMapper.filter((mapper) => mapper.id !== id));
      } catch (error) {
        toast.error("Something went wrong");
      }
    } else if (pField === "Product") {
      try {
        const response = await axios.delete(`/api/product/${id}`);
        toast.success(response.data);
        setMapper(pMapper.filter((mapper) => mapper.id !== id));
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div>
      <Link href={pLink} className="app-btn">
        {`Add ${pField.toLowerCase()}`}
      </Link>
      {pField === "Admin" ? (
        <AdminsData
          {...dataProps}
          deleteOnClick={deleteOnClick}
          setSelected={setSelected}
        />
      ) : pField === "Product" ? (
        <ProductsData />
      ) : null}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-4 rounded-md"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              {selected === "root" ? (
                <div>
                  <p>Root user can't be deleted</p>
                  <button
                    onClick={cancelDelete}
                    className="bg-emerald-400 delete-handler-btn"
                  >
                    OK
                  </button>
                </div>
              ) : pMapper.length === 1 ? (
                <div>
                  <p>The app must have at least one Admin!</p>
                  <button
                    onClick={cancelDelete}
                    className="bg-emerald-400 delete-handler-btn"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <>
                  <p className="mb-4 flex flex-col gap-4">
                    <p>
                      Are you sure you want to{" "}
                      <span className="text-red-500">delete</span> this{" "}
                      <span className="font-bold">{pField.toLowerCase()}</span>?
                    </p>
                    <p>
                      <b>"{selected}"</b>
                    </p>
                  </p>
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Yes
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                  >
                    No
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default DataLayout;
