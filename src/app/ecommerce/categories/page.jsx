"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ProductLoader from "@/components/loaders/ProductLoader";
import { motion } from "framer-motion";
import Animation from "@/components/Animation";
import ProductCard from "@/components/client/sub/ProductCard";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState({});
  const [principalLoader, setPrincipalLoader] = useState(false);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setPrincipalLoader(true);
        const response = await axios.get("/api/client/categories");
        setCategories(response.data.categories);
        setPrincipalLoader(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getCategories();
  }, []);

  const handleCategorySelect = async (categoryID) => {
    setSelectedCategory(categoryID);
    try {
      setIsLoading(true);
      const selected = categories.find((cat) => cat.id == categoryID);
      setFilteredProducts(selected.product);
      setSelectedProperties(selected.properties);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePropertySelect = (value, label, checked) => {
    if (checked) {
      const filter = filteredProducts.filter((prod) => prod?.properties[label] == value);
      setFilteredProducts(filter)
    } else {
      console.log(`Value: ${value}, label: ${label}, checked: ${checked}`);
    }
  };

  return (
    <>
      {principalLoader ? (
        <ProductLoader />
      ) : (
        <div className="flex">
          {/* Filter side */}
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900 h-[calc(100vh-5rem)] w-[18vw] text-white p-5 overflow-y-scroll"
          >
            <h1 className="font-bold text-2xl py-2">Categories</h1>
            <ul className="flex flex-col justify-start text-lg">
              {categories.map((category, index) => (
                <div key={index} className="flex justify-start">
                  <li>
                    <input
                      type="checkbox"
                      checked={selectedCategory == category.id}
                      onChange={() => handleCategorySelect(category.id)}
                    />
                    <label className="pl-2">{category.name}</label>
                    {selectedCategory == category.id &&
                      selectedProperties.length > 0 &&
                      selectedProperties.map((prop, i) => (
                        <div key={i} className="flex flex-col pl-6">
                          <p>{prop.name}</p>
                          {/* Category properteis */}
                          <div className="pb-3">
                            {prop?.values.map((value, index) => {
                              if (value == "") return;
                              return (
                                <div key={index} className="pb-1">
                                  <input
                                    type="checkbox"
                                    checked={
                                      selectedProperties[prop.name === value]
                                    }
                                    onChange={(e) =>
                                      handlePropertySelect(
                                        value,
                                        prop.name,
                                        e.target.checked
                                      )
                                    }
                                  />
                                  <label className="pl-2">{value}</label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                  </li>
                </div>
              ))}
            </ul>
          </motion.div>
          <div className="w-full p-10">
            {isLoading ? (
              <div>loading </div>
            ) : (
              <Animation>
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-4 gap-6">
                    {filteredProducts.map((product, index) => {
                      return <ProductCard key={index} {...product} />;
                    })}
                  </div>
                ) : (
                  <p className="text-3xl font-bold">
                    No product match with filter values
                  </p>
                )}
              </Animation>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriesPage;
