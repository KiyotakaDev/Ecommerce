"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminsData from "./AdminsData";
import ProductsData from "./ProductsData";
import Modal from "../sub/Modal";
import BtnHandler from "../sub/BtnHandler";

const DataLayout = ({ dataProps }) => {
  const { pLink, pField, pMapper, setMapper } = dataProps;
  const [idToDelete, setIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState("");

  const handleAction = (id) => {
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
      <h1 className="text-teal-900 font-bold my-2 mb-4 text-3xl">{pField}s</h1>
      <Link href={pLink} className="app-btn">
        {`Add ${pField.toLowerCase()}`}
      </Link>
      {pField === "Admin" ? (
        <AdminsData
          {...dataProps}
          handleAction={handleAction}
          setSelected={setSelected}
        />
      ) : pField === "Product" ? (
        <ProductsData
          {...dataProps}
          handleAction={handleAction}
          setSelected={setSelected}
        />
      ) : null}
      <Modal isOpen={showModal} cancel={cancelDelete}>
        {selected === "root" ? (
          <BtnHandler id={0} action={{ cancel: cancelDelete }} />
        ) : pMapper.length === 2 ? (
          <BtnHandler id={1} action={{ cancel: cancelDelete }} />
        ) : (
          <BtnHandler
            id={2}
            action={{
              confirm: confirmDelete,
              cancel: cancelDelete,
            }}
            obj={selected}
            type={pField.toLowerCase()}
          />
        )}
      </Modal>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default DataLayout;
