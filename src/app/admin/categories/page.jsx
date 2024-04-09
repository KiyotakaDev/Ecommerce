"use client";

import Animation from "@/components/Animation";
import MainLoader from "@/components/loaders/MainLoader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoriesPage = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");
  const [isLoading, setisLoading] = useState(false);

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

  const saveCategory = async (e) => {
    e.preventDefault();
    try {
      const data = {
        category: name,
        parent: parent,
      };
      console.log(data);
      await axios.post("/api/category/new", data);
      setName("");
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

  const editCategory = (id) => {
    console.log(id);
  }

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
            New Category
          </label>
          <form onSubmit={saveCategory} className="flex gap-1">
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
            <button type="submit" className="app-btn">
              Save
            </button>
          </form>
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
                        onClick={() => editCategory(category.id)}
                        className="action-btn bg-yellow-500 w-full"
                      >
                        Edit
                      </button>
                      <button className="action-btn bg-red-500 text-white w-full">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ToastContainer />
        </Animation>
      )}
    </>
  );
};

export default CategoriesPage;
