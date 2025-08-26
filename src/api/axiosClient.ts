import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = import.meta.env.VITE_API_URL;

// إنشاء instance من axios
const api = axios.create({
  /* vookeie.set
  coojies.get */
  baseURL: baseURL, // server
  withCredentials: true, // send cookies
});

export const getAuthHeaders = () => {
  const token = Cookies.get("accessToken"); // assumes cookie is named "accessToken"
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Response interceptor
// Interceptor detrmine if the token expir response 
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const code = error.response?.data?.code;

    // 401 token expired / missing / invalid
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (code === "EXPIRED") {
        try {
          await api.post("/refresh");
          return api(originalRequest); // retry original request
        } catch (refreshError) {
          console.error("Refresh failed:", refreshError);
          // هنا ممكن تعمل logout redirect
        }
      } else if (code === "MISSING_ACCESS_TOKEN" || code === "INVALID") {
        console.error("User token issue:", code);
        // ممكن تظهر رسالة للمستخدم تطلب منه تسجيل الدخول
      }
    }

    // 404 user not found
    if (status === 404 && code === "NO_USER") {
      console.error("User not found:", error.response.data.message);
      // ممكن تعرض رسالة للمستخدم أو redirect
    }

    // 400 errors من PATCH
    if (status === 400) {
      console.error("Invalid input:", error.response.data.message);
    }

    // 500 server errors
    if (status === 500) {
      console.error("Server error:", error.response.data.message);
      // ممكن تعرض alert أو toast
    }

    return Promise.reject(error);
  }
);

export default api;
