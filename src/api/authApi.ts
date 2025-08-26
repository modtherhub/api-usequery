// src/api/authApi.ts
import api from "./axiosClient";

/*  */
export const login = async (credentials: { user: string; password: string }) => {
  return api.post("/login", credentials).then(res => res.data);
};

/* نحذف الكوكيز */
/* ري دايرروكت للهومبيج */
export const logout = async () => {
  return api.post("/logout").then(res => res.data);
};
