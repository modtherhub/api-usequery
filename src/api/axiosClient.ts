import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = import.meta.env.VITE_API_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: baseURL, // Base server URL
  withCredentials: true, // Send cookies with requests
});

// Get Authorization header from cookie
export const getAuthHeaders = () => {
  const token = Cookies.get("accessToken"); // assumes cookie is named "accessToken"
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const code = error.response?.data?.code;

    // handle 401 errors expired / missing / invalid token
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (code === "EXPIRED") {
        try {
          await api.post("/refresh"); // attempt to refresh the token
          return api(originalRequest); // retry original request
        } catch (refreshError) {
          console.error("Refresh failed:", refreshError);
          // redirect user to login features
        }
      } else if (code === "MISSING_ACCESS_TOKEN" || code === "INVALID") {
        console.error("User token issue:", code);
        // notify user to log in features
      }
    }

    // handle 404 (user not found)
    if (status === 404 && code === "NO_USER") {
      console.error("User not found:", error.response.data.message);
      // show message or redirect features
    }

    // handle 400 invalid input
    if (status === 400) {
      console.error("Invalid input:", error.response.data.message);
    }

    // handel 500 server error
    if (status === 500) {
      console.error("Server error:", error.response.data.message);
      // display alert or toast
    }

    return Promise.reject(error);
  }
);

export default api;
