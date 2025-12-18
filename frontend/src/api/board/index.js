import api from "../axios";

export const boardApi = {
  createBoard: async (data) => {
    const res = await api.post("/boards/create", {
      Title: data.name,
      Description: data.description,
    });
    return res.data;
  },

  getMyBoards: async () => {
    const res = await api.get("/boards/user-boards");
    return res.data;
  },
};
