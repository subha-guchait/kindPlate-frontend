import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostCard } from "@/components/PostCard";
import { useOtherUserPosts } from "@/hooks/useOtherUserPosts";

import PostSkeleton from "@/components/skeleton/PostSkeleton";

const OtherUserPostsPage = () => {
  const { userId } = useParams();

  const { posts, loading } = useOtherUserPosts({ userId });

  return (
    <div className="p-4">
      <div className="flex min-h-svh flex-col items-center justify-center">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherUserPostsPage;
