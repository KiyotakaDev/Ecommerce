"use client";

import Animation from "@/components/Animation";
import DataLayout from "@/components/admin/data-samplers/DataLayout";
import axios from "axios";
import { useEffect } from "react";
import { useDataStore } from "@/store/dataStore";
import MainLoader from "@/components/loaders/MainLoader";

const AdminsPage = () => {
  const { setData, setMapper, isLoading, setLoading } = useDataStore();

  useEffect(() => {
    const getAdmins = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/admins");
        const admins = response.data;
        const dataToStore = {
          link: "admins/new",
          field: "Admin",
        };
        setData(dataToStore);
        setMapper(admins);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAdmins();
  }, [setData]);

  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <Animation>
          <DataLayout />
        </Animation>
      )}
    </>
  );
};

export default AdminsPage;
