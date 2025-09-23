import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostCard } from "@/components/PostCard";
import { useOtherUserPosts } from "@/hooks/useOtherUserPosts";
import { motion } from "framer-motion";

import PostSkeleton from "@/components/skeleton/PostSkeleton";

const OtherUserPostsPage = () => {
  const { userId } = useParams();

  const { posts, loading } = useOtherUserPosts({ userId });

  return (
    <div className="p-4">
      <div className="flex min-h-svh flex-col items-center ">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-gray-500"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4 shadow-md"
            >
              🥣
            </motion.div>
            <p className="text-lg font-medium">No posts </p>
            <p className="text-sm">This Person hasn't donated any food yet</p>
          </motion.div>
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
