import { useState } from "react";
import { useLogin, useLogout, useUser } from "../hooks/useUser";

const ProfilePage = () => {
  const [userType] = useState("patient");

  const login = useLogin();
  const logout = useLogout();
  const { data, error, isLoading } = useUser(userType);

  const handleLogin = () => {
    login.mutate({
      user: "user@example.com",
      password: "123456",
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.response?.data?.message}</p>;

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => logout.mutate()}>Logout</button>

      <h2>Profile</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
