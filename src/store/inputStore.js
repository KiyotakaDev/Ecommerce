import { create } from 'zustand'

export const useInputStore = create((set) => ({
  // Initial state
  price: 0,
  images: [],

  // Functions
  setPrice: (amount) => set({ price: amount }),
  setImages: (image) => set((state) => ({ images: [...state.images, ...image]})),
}))