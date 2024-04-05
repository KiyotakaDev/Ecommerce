import { create } from 'zustand'

export const useDataStore = create((set) => ({
  // Initial states
  mapper: [],
  link: "",
  field: "",

  // Functions
  setMapper: (mapper) => set({ mapper: mapper }),
  setData: (data) => set({ link: data.link, field: data.field }),
  handleDelete: () => {
    
  }
}))