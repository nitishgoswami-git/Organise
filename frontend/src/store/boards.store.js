import { create } from "zustand";

export const useBoardStore = create((set) => ({
  boards: [],          
  loading: true,       
  setBoards: (boards) =>
    set({
      boards,
      loading: false,
    }),
  addBoard: (board) =>
    set((state) => ({
      boards: [...state.boards, board],
    })),
  clearBoards: () =>
    set({
      boards: [],
      loading: false,
    }),
}));
