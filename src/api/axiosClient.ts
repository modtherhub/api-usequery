import axios from "axios";

// إنشاء instance من axios
const api = axios.create({
  baseURL: "http://localhost:5000", // غيّرها حسب السيرفر
  withCredentials: true, // مهم حتى يرسل الكوكيز
});

// Interceptor للـ response → يجدد التوكن إذا انتهى
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // محاولة تجديد التوكن
        await api.post("/refresh");
        return api(originalRequest); // إعادة المحاولة
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        // هنا ممكن تعمل logout redirect
      }
    }

    return Promise.reject(error);
  }
);

export default api;
