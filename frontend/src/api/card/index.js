import api from "../axios";

export const cardApi = {
  createCard: async (data) => {
    const res = await api.post("/cards/create", {
      Title: data.title || data.Title,
      Description: data.description || data.Description,
      listId: data.listId,
    });
    return res.data;
  },

  getCards: async (listId) => {
    const res = await api.get("/cards/list-cards", { params: { listId } });
    // Ensure `data` is always an array
    return {
      ...res.data,
      data: Array.isArray(res.data.data) ? res.data.data : [],
    };
  },

  updateCard: async (cardId, data) => {
    const res = await api.put(`/cards/update/${cardId}`, data);
    return res.data;
  },

  deleteCard: async (cardId) => {
    const res = await api.delete(`/cards/delete/${cardId}`);
    return res.data;
  },
};
