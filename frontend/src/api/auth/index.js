import api from "../axios";

export const authApi = {
  login: async (data) => {
    const res = await api.post("/auth/login", {
      email: data.Email,
      password: data.Password,
    });
    return res.data;
  },

  register: async (formData) => {
    const res = await api.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  logout: async () => {
    const res = await api.post("/auth/logout");
    return res.data;
  },

  me: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },
};
