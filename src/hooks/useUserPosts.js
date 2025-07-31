import { useEffect, useState } from "react";
import { userPosts } from "@/api/postApi";
import toast from "react-hot-toast";

export const useUserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await userPosts();

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
  }, []);

  return { posts, setPosts, loading, refresh: fetchPosts };
};
