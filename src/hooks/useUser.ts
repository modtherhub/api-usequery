import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser, deleteUser } from "../api/userApi";
import { login, logout } from "../api/authApi";

/**
 * custom hook to fetch user data
 * @param userType - Type or role of the user (e.g., "patient", "clinic")
 * @returns React Query object containing user data and status flags
 */
export const useUser = (userType: string) => {
  return useQuery({
    queryKey: ["user", userType],
    queryFn: () => getUser(userType),
    retry: false, // fail quickly instead of retrying multiple times
  });
};

/**
 * custom hook to update user data
 * @param userType - Type or role of the user
 * @returns React Query mutation object to update user
 */
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

/**
 * custom hook to delete a user
 * @param userType - Type or role of the user
 * @returns React Query mutation object to delete user
 */
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