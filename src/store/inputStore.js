import { create } from "zustand";

export const useInputStore = create((set) => ({
  // Initial state
  productFormData: {
    product: "",
    imagesPath: [],
    description: "",
    price: 0,
  },
  images: [],
  isLoading: false,
  onMainPage: false,

  // Functions
  setProductFormData: (data) => 
      set((state) => ({ productFormData: { ...state.productFormData, ...data } })),
  resetProduct: () => set({
    productFormData: {
      product: "",
      imagesPath: [],
      description: "",
      price: 0
    },
    images: []
  }),
  setIsLoading: (bool) => set({ isLoading: bool }),
  setImages: (image) =>
    set((state) => ({ images: [...state.images, ...image] })),
  setOnMainPage: (bool) => set({ onMainPage: bool })
}));
