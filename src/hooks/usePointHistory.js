import { getPointHistory } from "@/api/userApi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const usePointHistory = () => {
  const [totalPoint, setTotalPoint] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pointHistory, setPointHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchPointHistory = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await getPointHistory({ page: pageNum, limit: 10 });
      setTotalPoint(res.totalPoint);
      setPointHistory((prev) => {
        const newItems = res.pointHistory.filter(
          (item) => !prev.some((p) => p._id === item._id)
        );
        return [...prev, ...newItems];
      });

      setHasMore(res.hasNextPage);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to fetch Point history");
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchPointHistory(page);
  }, [page]);

  return {
    totalPoint,
    loading,
    pointHistory,
    page,
    setPage,
    isFetchingMore,
    setIsFetchingMore,
    hasMore,
    setHasMore,
  };
};

export default usePointHistory;
