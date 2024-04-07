import { useDataStore } from "@/store/dataStore";
import Link from "next/link";
import {
  InformationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../sub/Modal";
import ModalButtons from "../sub/ModalButtons";

const DataLayout = () => {
  const data = useDataStore();
  const {
    link,
    field,
    mapper,
    setMapper,
    showModal,
    setShowModal,
    setObjToDelete,
    objToDelete,
    setName,
    objName,
  } = data;

  const type = field.toLowerCase();

  const showActions = (id, name) => {
    setShowModal(true), setObjToDelete(id), setName(name);
  };

  const handleCancel = () => {
    setShowModal(false), setObjToDelete(null);
  };

  const handleConfirm = () => {
    handleDelete(objToDelete);
    setObjToDelete(null);
    setName("");
    setShowModal(false)
  };

  const handleDelete = async (id) => {
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
      <h1 className="text-teal-900 font-bold my-2 mb-4 text-3xl">{field}s</h1>
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
                            onClick={() => showActions(data.id, validation)}
                            className="action-btn text-white bg-red-500"
                          >
                            <TrashIcon className="w-5 h-5" />
                            Delete
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-evenly items-center">
                          <button
                            onClick={() => showActions(data.id, validation)}
                            className="bg-slate-400 hover:bg-slate-500 transition-colors duration-200 ease-in-out w-full flex justify-center items-center action-btn"
                          >
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
      <Modal isOpen={showModal} cancel={handleCancel}>
        {objName === "root" ? (
          <ModalButtons id={0} action={{ cancel: handleCancel }} />
        ) : mapper.length === 2 && field === "Admin" ? (
          <ModalButtons id={1} action={{ cancel: handleCancel }} />
        ) : (
          <ModalButtons
            id={2}
            action={{
              confirm: handleConfirm,
              cancel: handleCancel,
            }}
            name={objName}
            field={type}
          />
        )}
      </Modal>
      <ToastContainer />
    </>
  );
};

export default DataLayout;
