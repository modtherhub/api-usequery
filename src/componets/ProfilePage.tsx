import { useUser, useUpdateUser, useDeleteUser } from "../hooks/useUser";

const ProfilePage = () => {
  const userType = "doctor"; // or clinic
  const { data, error, isLoading } = useUser(userType);
  const updateUser = useUpdateUser(userType);
  const deleteUser = useDeleteUser(userType);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.response?.data?.message}</p>;

  return (
    <div>
      <h2>Profile</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <button
        onClick={() =>
          updateUser.mutate({ fullName: "New Name" })
        }
      >
        Update Name
      </button>

      <button onClick={() => deleteUser.mutate()}>
        Delete Account
      </button>
    </div>
  );
};

export default ProfilePage;
