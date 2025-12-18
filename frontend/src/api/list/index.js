import api from "../axios";

export const listApi = {
  createList: async (data) => {
    const res = await api.post("/lists/create", {
      Title: data.name,
      Description: data.description,
      boardId: data.boardId,
    });
    return res.data;
  },

  getLists: async (boardId) => {
    const res = await api.get("/lists/board-lists", {
      params: { boardId },
    });
    return res.data;
  },
};
