"use client";

import { addAdminFields } from "@/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminForm = () => {
  const router = useRouter();
  const initial = {
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  }
  const [adminData, setAdminData] = useState(initial)

  const saveAdmin = async (e) => {
    e.preventDefault();
    try {
      // Create
      const response = await axios.post(
        "/api/admin/admins/new",
        adminData
      );
      if (response.status === 200) {
        router.push("/admin/admins");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFormInputs = (e, label) => {
    const { value } = e.target;
    setAdminData((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <form onSubmit={saveAdmin} className="flex flex-col">
      {addAdminFields.map((fields, index) => {
        const { html: CustomTag, type, label, title, placeholder } = fields;
        return (
          <div key={index}>
            <label className="form-label">{title}</label>
            <CustomTag
              type={type}
              value={adminData[label]}
              onChange={(e) => handleFormInputs(e, label)}
              placeholder={placeholder}
              className="input-fields"
            />
          </div>
        );
      })}
      <button type="submit" className="app-btn mt-3">
        Save
      </button>
    </form>
  );
};

export default AdminForm;
