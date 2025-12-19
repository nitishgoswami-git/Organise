import { create } from "zustand";

export const useCardStore = create((set) => ({
  cards: [],

  // Replace all cards (fetch)
  setCards: (cards) => set({ cards }),

  // Add single card
  addCard: (card) =>
    set((state) => ({
      cards: [...state.cards, card],
    })),

  // Update card
  updateCard: (updatedCard) =>
    set((state) => ({
      cards: state.cards.map((c) =>
        c._id === updatedCard._id ? updatedCard : c
      ),
    })),

  // Delete single card
  deleteCard: (cardId) =>
    set((state) => ({
      cards: state.cards.filter((c) => c._id !== cardId),
    })),

  // DELETE ALL CARDS BELONGING TO A LIST (NEW)
  removeCardsByList: (listId) =>
    set((state) => ({
      cards: state.cards.filter((c) => c.ListId !== listId),
    })),
}));
