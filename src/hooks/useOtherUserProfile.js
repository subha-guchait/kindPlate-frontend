import { useEffect, useState } from "react";
import { getOtherUserProfile } from "@/api/userApi";
import toast from "react-hot-toast";
const useOtherUserProfile = (userId) => {
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getOtherUserProfile(userId);
        setOtherUser(data.user);
      } catch (err) {
        console.error(err);
        toast.error(err.message || "failed get Profile of this user");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { otherUser, loading };
};

export default useOtherUserProfile;
