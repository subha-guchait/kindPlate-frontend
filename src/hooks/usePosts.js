import { useEffect, useState } from "react";
import { getPosts } from "@/api/postApi";
import toast from "react-hot-toast";

export const usePosts = ({
  currentPage,
  limit,
  selectedState,
  selectedCity,
}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    nextPage: null,
    lastPage: 1,
  });

  const fetchPosts = async (pageNum, reset = false) => {
    try {
      const data = await getPosts(pageNum, limit, {
        state: selectedState,
        city: selectedCity,
      });

      setPosts((prev) =>
        reset || pageNum === 1 ? data.posts : [...prev, ...data.posts]
      );

      setPagination({
        hasNextPage: data.hasNextpage,
        nextPage: data.nextPage,
        lastPage: data.lastPage,
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  // Run on first load + whenever filters/limit change
  useEffect(() => {
    setPosts([]);
    setLoading(true);
    fetchPosts(1, true); // reset load
  }, [limit, selectedState, selectedCity]);

  // Run when currentPage changes (for infinite scroll)
  useEffect(() => {
    if (currentPage > 1) {
      setIsFetchingMore(true);
      fetchPosts(currentPage);
    }
  }, [currentPage]);

  return {
    posts,
    setPosts,
    loading,
    isFetchingMore,
    setIsFetchingMore,
    ...pagination,
  };
};
