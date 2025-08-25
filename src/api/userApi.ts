import api from "./axiosClient";

export const getUser = (userType) =>
  api.get(`/user/${userType}`).then((res) => res.data);

export const updateUser = (userType, data) =>
  api.patch(`/user/${userType}`, data).then((res) => res.data);

export const deleteUser = (userType) =>
  api.delete(`/user/${userType}`).then((res) => res.status);
