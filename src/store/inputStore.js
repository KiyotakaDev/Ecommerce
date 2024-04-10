import { create } from "zustand";

export const useInputStore = create((set) => ({
  // Initial state
  productInfo: [],

  // Functions
  setProductInfo: (data) => set({ productInfo: data }),
  resetProduct: () => set({ productInfo: []})
}));
