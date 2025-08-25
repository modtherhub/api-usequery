import api from "./axiosClient";

export const login = async (credentials) => {
  // لما تسوي login، السيرفر بيرجع Set-Cookie للتوكنات
  const res = await api.post("/login", credentials);

  // ما نحتاج نخزن التوكن في JS
  // المتصفح يخزن الكوكي HttpOnly تلقائيًا
  return res.data; // { message: "login success" مثلا }
};

export const logout = async () => {
  // السيرفر يحذف الكوكيز (refresh & access)
  await api.post("/logout");
};
