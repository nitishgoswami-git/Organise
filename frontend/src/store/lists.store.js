import { create } from "zustand";

export const useListStore = create((set) => ({
  lists: [],          // all loaded lists
  loading: false,

  // Set all lists (e.g., when board is loaded)
  setLists: (lists) => set({ lists }),

  // Add a list
  addList: (list) => set((state) => ({ lists: [...state.lists, list] })),

  // Update a list by ID
  updateList: (updatedList) =>
    set((state) => ({
      lists: state.lists.map((l) =>
        l._id === updatedList._id ? updatedList : l
      ),
    })),

  // Remove a list
  removeList: (listId) =>
    set((state) => ({
      lists: state.lists.filter((l) => l._id !== listId),
    })),

  // Clear all lists (on logout or board switch)
  clearLists: () => set({ lists: [] }),
}));
