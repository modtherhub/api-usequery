import api from "./axiosClient";
import { baseURL } from "./axiosClient";
import { getAuthHeaders } from "./axiosClient";

/*  */
export const getUser = async <T = unknown>(childPath: string) => {
  const url = `${baseURL}/${childPath}`;
  const response = await api.get<T>(url, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return response.data;
};


export const updateUser = async <T = unknown>(
  childPath: string,
  data: Record<string, any>
) => {
  const url = `${baseURL}/${childPath}`;
  const response = await api.patch<T>(url, data, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });
  return response.data;
};


export const deleteUser = async <T = unknown>(childPath: string) => {
  const url = `${baseURL}/${childPath}`;
  const response = await api.delete<T>(url, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return response.data;
};
