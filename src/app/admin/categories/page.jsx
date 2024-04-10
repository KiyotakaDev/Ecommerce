"use client";

import Animation from "@/components/Animation";
import MainLoader from "@/components/loaders/MainLoader";
import Modal from "@/components/sub/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoriesPage = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [objToDelete, setObjToDelete] = useState(null);
  const [objName, setObjName] = useState("");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setisLoading(true);
      const response = await axios.get("/api/categories");
      const categoriesWithParentNames = await Promise.all(
        response.data.map(async (category) => {
          if (category.parent) {
            const parentCategory = await axios.get(
              `/api/category/${category.parent}`
            );
            return { ...category, parentName: parentCategory.data.name };
          }
          return category;
        })
      );
      setCategories(categoriesWithParentNames);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setObjName("");
    setObjToDelete(null);
  };

  const handleConfirm = async () => {
    try {
      await axios.delete(`/api/category/${objToDelete}`);
      const filter = categories.filter(
        (category) => category.id !== objToDelete
      );
      setCategories(filter);
      setShowModal(false);
      toast.success("Deleted!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    try {
      const data = {
        category: name,
        parent,
        properties: properties.map((p) => ({
          name: p.name,
          values: p.values.split(","),
        })),
      };
      if (editing) {
        data.id = editing.id;
        await axios.put(`/api/categories`, data);
        toast.success("Editing success!");
      } else {
        await axios.post("/api/category/new", data);
        toast.success("Category added!");
      }
      setEditing(null);
      setName("");
      setParent("");
      setProperties([]);
      getCategories();
    } catch (error) {
      if (error.response.data.errors) {
        const backErrors = error.response?.data.errors;
        backErrors.forEach((err) => toast.error(err));
      } else {
        console.log(error.response.data.error);
      }
    }
  };

  const editCategory = (category) => {
    setEditing(category);
    setName(category.name);
    setParent(category.parent);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  };

  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };

  const upadetPropName = (newName, index, prop) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };
  const updatePropValues = (newValues, index, prop) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  };
  const removeProp = (indexToRemove) => {
    setProperties((prev) => {
      return [...prev].filter((prop, i) => {
        return i !== indexToRemove;
      });
    });
  };

  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <Animation>
          <h1 className="text-teal-900 font-bold my-2 mb-4 text-3xl">
            Categories
          </h1>
          <label className="text-teal-900 font-semibold text-lg">
            {editing ? `Edit category ${editing.name}` : "New Category"}
          </label>
          <form onSubmit={saveCategory}>
            <div className="flex gap-1">
              <input
                type="text"
                value={name}
                placeholder={"Category name"}
                onChange={(e) => setName(e.target.value)}
                className="mb-0 input-fields"
              />
              <select
                value={parent}
                onChange={(e) => setParent(e.target.value)}
                className="input-fields mb-0"
              >
                <option value="">No parent category</option>
                {categories.length > 0 &&
                  categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-teal-900 font-semibold text-lg">
                Properties
              </label>
              <button
                type="button"
                onClick={addProperty}
                className="app-btn text-base bg-blue-400 hover:bg-blue-600"
              >
                Add Property
              </button>
              {properties.length > 0 &&
                properties.map((prop, i) => (
                  <div key={i} className="flex gap-2 mt-3 mb-3">
                    <input
                      type="text"
                      value={prop.name}
                      onChange={(e) => upadetPropName(e.target.value, i, prop)}
                      placeholder="property name (example: color)"
                      className="input-fields mb-0"
                    />
                    <input
                      type="text"
                      value={prop.values}
                      onChange={(e) =>
                        updatePropValues(e.target.value, i, prop)
                      }
                      placeholder="values, coma separated"
                      className="input-fields mb-0"
                    />
                    <button
                      onClick={() => removeProp(i)}
                      type="button"
                      className="app-btn text-base bg-red-500 hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>

            <div className="flex gap-2">
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setName("");
                    setParent("");
                    setProperties([]);
                  }}
                  className="app-btn mt-2 bg-slate-400 hover:bg-slate-600"
                >
                  Cancel
                </button>
              )}
              <button type="submit" className="app-btn mt-2">
                {editing ? "Edit" : "Save"}
              </button>
            </div>
          </form>
          {!editing && (
            <table>
              <thead>
                <tr>
                  <td>Category name</td>
                  <td>Parent category</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 &&
                  categories.map((category, index) => (
                    <tr key={index}>
                      <td>{category.name}</td>
                      <td>{category.parent ? category.parentName : "None"}</td>
                      <td className="flex justify-evenly w-full gap-4">
                        <button
                          onClick={() => editCategory(category)}
                          className="action-btn bg-yellow-500 w-full"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setObjName(category.name);
                            setObjToDelete(category.id);
                          }}
                          className="action-btn bg-red-500 text-white w-full"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
          <ToastContainer />
          <Modal isOpen={showModal} cancel={handleCancel}>
            <div>
              <p>
                Are you sure you want to{" "}
                <span className="text-red-500">delete</span>{" "}
                <span className="font-semibold">{objName}</span> category?
              </p>
            </div>
            <div className="flex justify-evenly items-center">
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mt-8"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-8"
              >
                Yes
              </button>
            </div>
          </Modal>
        </Animation>
      )}
    </>
  );
};

export default CategoriesPage;
