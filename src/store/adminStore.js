import { create } from "zustand";

export const useAdminStore = create((set) => ({
  // Initial state
  adminData: {},

  // Functions
  setAdminData: (data) => set({ adminData: data }),
  resetAdminData: () => set({ adminData: {} })
}));
