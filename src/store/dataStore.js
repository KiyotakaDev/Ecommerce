import { create } from 'zustand'

export const useDataStore = create((set) => ({
  // Initial states
  mapper: [],
  link: "",
  field: "",
  isLoading: false,
  showModal: false,
  objToDelete: null, // id
  objName: "",

  // Functions
  setMapper: (mapper) => set({ mapper: mapper }),
  setData: (data) => set({ link: data.link, field: data.field }),
  setLoading: (loading) => set({ isLoading: loading }),
  setShowModal: (show) => set({ showModal: show }),
  setObjToDelete: (obj) => set({ objToDelete: obj}),
  setName: (obj) => set({ objName: obj }),
}))