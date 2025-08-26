import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser, deleteUser } from "../api/userApi";
import { login, logout } from "../api/authApi";

export const useUser = (userType: string) => {
  return useQuery({
    queryKey: ["user", userType],
    queryFn: () => getUser(userType),
    retry: false, // خلينا نفيلير بسرعة بدلاً محاولات كتيرة
  });
};

export const useUpdateUser = (userType: string) => {
  const queryClient = useQueryClient();
  return useMutation<any, any, any>({
    mutationFn: (data) => updateUser(userType, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userType] });
    },
    onError: (err: any) => {
      console.error("Update failed:", err.response?.data?.message);
      alert(err.response?.data?.message || "Update failed");
    },
  });
};

/* تدعيدل  */
export const useDeleteUser = (userType: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteUser(userType),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user", userType] }); // حذف الكاش
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