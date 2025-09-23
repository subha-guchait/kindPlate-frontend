import React, { useState, useEffect, useRef, useCallback } from "react";
import Leaderboard from "@/components/leaderboard/LeadeboardCard";
import { getLeaderboard } from "@/api/userApi";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";

const LeaderboardPage = () => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 6;

  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const observerRef = useRef(null);

  const fetchLeaderboard = async (pageNum = 1) => {
    try {
      const data = await getLeaderboard({ page: pageNum, limit });

      if (pageNum === 1) {
        setLeaderboard(data.leaderboard); // fresh load
      } else {
        setLeaderboard((prev) => {
          // Filter out duplicates
          const newItems = data.leaderboard.filter(
            (item) => !prev.some((p) => p._id === item._id)
          );
          return [...prev, ...newItems];
        });
      }

      setHasMore(data.hasNextPage);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to fetch Leaderboard");
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  // first fetch
  useEffect(() => {
    fetchLeaderboard(1);
  }, []);

  // infinite scroll using IntersectionObserver
  const lastElementRef = useCallback(
    (node) => {
      if (isFetchingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setIsFetchingMore(true);
          setPage((prev) => {
            const nextPage = prev + 1;
            fetchLeaderboard(nextPage);
            return nextPage;
          });
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [hasMore, isFetchingMore]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <Leaderboard leaderboardData={leaderboard} currentUserId={authUser?.id} />

      {/* Sentinel element for infinite scroll */}
      <div ref={lastElementRef} className="h-10"></div>

      {isFetchingMore && (
        <div className="flex justify-center py-4">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;
