import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "@/api/userApi";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
const useProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!authUser) {
      setLoading(false);
      return;
    }
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data.user);
        console.log(data.user);
      } catch (err) {
        toast.error(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authUser]);

  const handleUpdate = async (updatedData) => {
    const isValid = handleInputErrors(updatedData);
    if (!isValid) return;
    try {
      const updatedUser = await updateUserProfile(updatedData);
      setUser(updatedUser.user);
      toast.success("Profile updated sucessfully!");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
      console.error(err);
    }
  };

  function handleInputErrors(updatedData) {
    if (!updatedData.firstName || !updatedData.lastName || !updatedData.phone) {
      toast.error("All fields are required");
      return false;
    }
    if (updatedData.firstName.length < 2) {
      toast.error("First Name must be atleast 2 characters long");
      return false;
    }
    if (updatedData.lastName.length < 2) {
      toast.error("Last Name must be atleast 2 characters long");
      return false;
    }

    if (updatedData.phone.length !== 10) {
      toast.error("Phone number must be 10 digits long");
      return false;
    }

    return true;
  }

  return { user, loading, handleUpdate };
};

export default useProfile;
