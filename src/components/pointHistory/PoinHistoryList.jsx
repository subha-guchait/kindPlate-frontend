import { useEffect, useState, useRef, useCallback } from "react";
import PointHistoryCard from "./PointHistoryCard";
import SkeletonCard from "@/components/pointHistory/pointHistorySkeletonCard";

const PointHistoryList = ({
  totalPoint,
  loading,
  pointHistory,
  page,
  setPage,
  isFetchingMore,
  setIsFetchingMore,
  hasMore,
  setHasMore,
}) => {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (isFetchingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingMore, hasMore]
  );

  return (
    <div className="space-y-4 mt-6">
      {pointHistory.map((item, index) => (
        <PointHistoryCard key={item._id} history={item} index={index} />
      ))}

      {isFetchingMore ||
        (loading &&
          Array(3)
            .fill(0)
            .map((_, i) => <SkeletonCard key={i} />))}

      <div ref={lastElementRef}></div>
    </div>
  );
};

export default PointHistoryList;
