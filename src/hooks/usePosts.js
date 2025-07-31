import { useEffect, useState } from "react";
import { getPosts } from "@/api/postApi";

export const usePosts = ({
  currentPage,
  limit,
  selectedState,
  selectedCity,
}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  const fetchPosts = async () => {
    try {
      const data = await getPosts(currentPage, limit, {
        state: selectedState,
        city: selectedCity,
      });

      setPosts(data.posts);
      setPagination({
        hasPreviousPage: data.hasPreviousPage,
        hasNextPage: data.hasNextpage,
        previousPage: data.previousPage,
        nextPage: data.nextPage,
        lastPage: data.lastPage,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [limit, currentPage, selectedState, selectedCity]);

  return { posts, setPosts, loading, refresh: fetchPosts, ...pagination };
};
