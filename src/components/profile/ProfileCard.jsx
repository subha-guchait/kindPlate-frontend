import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegNewspaper } from "react-icons/fa";
import { useAuthContext } from "@/context/AuthContext";
import { Pencil } from "lucide-react";

const ProfileCard = ({ user }) => {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  const isOwnProfile = authUser?.id === user?._id;

  const handlePostsPage = () => {
    if (isOwnProfile) {
      navigate("/posts");
    } else {
      navigate(`/users/${user._id}/posts`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-black dark:to-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-xl dark:shadow-black/80 bg-white dark:bg-zinc-900">
        {/* Profile Header Image */}
        <div className="relative h-60 w-full overflow-hidden">
          <img
            src={user?.imgUrl || "/default-profile.jpg"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
            <h1 className="text-2xl font-bold">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-sm">{user?.userType}</p>
          </div>
        </div>

        {/* Profile Info & Action */}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-zinc-700">
              <img
                src={user?.imgUrl || "/default-profile.jpg"}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-zinc-200">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={handlePostsPage}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 cursor-pointer"
            >
              <FaRegNewspaper /> View Posts
            </button>
            {isOwnProfile && (
              <button
                onClick={() => navigate("/edit-profile")}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
