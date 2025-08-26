import api from "./axiosClient";
import { baseURL, getAuthHeaders } from "./axiosClient";

/**
 * fetch user data from the server
 * @param childPath - API endpoint path for the user
 * @returns rhe user data
 */
export const getUser = async <T = unknown>(childPath: string) => {
  const url = `${baseURL}/${childPath}`;
  const response = await api.get<T>(url, {
    headers: {
      ...getAuthHeaders(), // Attach Authorization header
    },
  });
  return response.data;
};

/**
 * Update user data on the server
 * @param childPath - API endpoint path for the user
 * @param data - Object containing fields to update
 * @returns The updated user data
 */
export const updateUser = async <T = unknown>(
  childPath: string,
  data: Record<string, any>
) => {
  const url = `${baseURL}/${childPath}`;
  const response = await api.patch<T>(url, data, {
    headers: {
      ...getAuthHeaders(), // Attach Authorization header
      "Content-Type": "application/json", // specify JSON payload
    },
  });
  return response.data;
};

/**
 * Delete a user from the server
 * @param childPath - API endpoint path for the user
 * @returns Response data (typically empty)
 */
export const deleteUser = async <T = unknown>(childPath: string) => {
  const url = `${baseURL}/${childPath}`;
  const response = await api.delete<T>(url, {
    headers: {
      ...getAuthHeaders(), // Attach Authorization header
    },
  });
  return response.data;
};
