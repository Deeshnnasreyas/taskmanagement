import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const { VITE_APP_URL } = import.meta.env;

// Fetch User API
const fetchUser = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("User not found!");
  const { data } = await axios.get(`${VITE_APP_URL}/user/2`);
  return data;
};

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  //  Update User Mutation
  const updateMutation = useMutation({
    mutationFn: (updatedUser) =>
      axios.put(`${VITE_APP_URL}/user/${user.id}`, updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    },
    onError: () => toast.error("Failed to update profile"),
  });

  //  Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error loading profile</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Toaster />
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-2">
            {user?.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
        </div>

        {/* Edit Profile Form */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              defaultValue={user?.name}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={user?.email}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <button
            onClick={() => {
              setIsEditing(true);
              setFormData({ name: user?.name, email: user?.email });
            }}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
