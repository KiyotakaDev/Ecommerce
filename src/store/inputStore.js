import { create } from "zustand";

export const useInputStore = create((set) => ({
  // Initial state
  productFormData: {
    product: "",
    images: [],
    description: "",
    price: 0,
  },
  images: [],
  isLoading: false,

  // Functions
  setProductFormData: (data) =>
    set((state) => ({ productFormData: { ...state.productFormData, ...data } })),
  setIsLoading: (bool) => set({ isLoading: bool }),
  setImages: (image) =>
    set((state) => ({ images: [...state.images, ...image] })),
}));
