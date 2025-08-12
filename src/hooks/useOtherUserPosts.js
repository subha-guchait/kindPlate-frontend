import { useEffect, useState } from "react";
import { otherUserPosts } from "@/api/postApi";
import toast from "react-hot-toast";

export const useOtherUserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await otherUserPosts(userId);

      setPosts(data.posts);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to fetch user posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  return { posts, loading };
};
