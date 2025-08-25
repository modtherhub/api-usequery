import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser, deleteUser } from "../api/userApi";
import { login, logout } from "../api/authApi";

export const useUser = (userType) => {
  return useQuery({
    queryKey: ["user", userType],
    queryFn: () => getUser(userType),
    retry: false, // خلينا نفيلير بسرعة بدلاً محاولات كتيرة
  });
};

export const useUpdateUser = (userType) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateUser(userType, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", userType]);
    },
  });
};

export const useDeleteUser = (userType) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteUser(userType),
    onSuccess: () => {
      queryClient.removeQueries(["user", userType]); // حذف الكاش
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};