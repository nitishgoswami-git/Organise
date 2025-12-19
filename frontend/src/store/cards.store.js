import { create } from "zustand";

export const useCardStore = create((set) => ({
  cards: [],

  setCards: (cards) => set({ cards }),

  addCard: (card) =>
    set((state) => ({
      cards: [...state.cards, card],
    })),

  updateCard: (updatedCard) =>
    set((state) => ({
      cards: state.cards.map((c) =>
        c._id === updatedCard._id ? updatedCard : c
      ),
    })),

  deleteCard: (cardId) =>
    set((state) => ({
      cards: state.cards.filter((c) => c._id !== cardId),
    })),
}));
