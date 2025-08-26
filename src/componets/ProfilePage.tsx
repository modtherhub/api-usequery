// src/pages/ProfilePage.tsx
import React, { useState } from "react";
import { useUser, useUpdateUser, useDeleteUser, useLogin, useLogout } from "../hooks/useUser";

const ProfilePage = () => {
  const [userType] = useState("patient");

  const login = useLogin();
  const logout = useLogout();
  const { data, error, isLoading } = useUser(userType);
  const updateUser = useUpdateUser(userType);
  const deleteUser = useDeleteUser(userType);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as any).response?.data?.message}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login / Logout</h1>
      <button onClick={() => login.mutate({ user: "user@example.com", password: "123456" })}>
        Login
      </button>
      <button onClick={() => logout.mutate()}>Logout</button>

      <h2>Profile</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <button onClick={() => updateUser.mutate({ name: "Updated Name" })}>Update Name</button>
      <button onClick={() => deleteUser.mutate()}>Delete Account</button>
    </div>
  );
};

export default ProfilePage;
