import { create } from 'zustand';

export const useCardStore = create((set) => ({
  cards: [],
  
  // Set all cards (useful for initial load)
  setCards: (cards) => set({ cards }),
  
  // Add a single card
  addCard: (card) => set((state) => ({
    cards: [...state.cards, card]
  })),
  
  // Update a card
  updateCard: (cardId, updatedData) => set((state) => ({
    cards: state.cards.map((card) =>
      card._id === cardId ? { ...card, ...updatedData } : card
    )
  })),
  
  // Delete a card
  deleteCard: (cardId) => set((state) => ({
    cards: state.cards.filter((card) => card._id !== cardId)
  })),
  
  // Get cards by list ID (helper function)
  getCardsByListId: (listId) => {
    const state = useCardStore.getState();
    return state.cards.filter((card) => card.listId === listId);
  },
  
  // Move card to different list
  moveCardToList: (cardId, newListId) => set((state) => ({
    cards: state.cards.map((card) =>
      card._id === cardId ? { ...card, listId: newListId } : card
    )
  })),
  
  // Clear all cards
  clearCards: () => set({ cards: [] })
}));