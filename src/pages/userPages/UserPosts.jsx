import { useState, useEffect } from "react";
import { CreatePostModal } from "@/components/CreatePostModal";
import { PostCard } from "@/components/PostCard";
import { useUserPosts } from "@/hooks/useUserPosts";
import addPostIcon from "../../assets/addPost.png";
import indiaData from "@/data/indiaStatesAndCities";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import { motion } from "framer-motion";

const UserPostsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { posts, setPosts, loading, refresh } = useUserPosts();

  const handleRemovePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <div className="tooltip tooltip-left" data-tip="Add New Post">
          <button
            className="w-12 h-12 rounded-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center shadow-md transition cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <img src={addPostIcon} alt="Add Post" className="w-5 h-5 invert" />
          </button>
        </div>
      </div>

      <CreatePostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onPostCreated={refresh}
        indiaData={indiaData}
      />
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
              <img
                src={addPostIcon}
                alt="Add Post"
                className="w-8 h-8 invert opacity-70"
              />
            </motion.div>
            <p className="text-lg font-medium">No posts yet</p>
            <p className="text-sm">
              Click the + button to create your first post
            </p>
          </motion.div>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onDelete={handleRemovePost}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPostsPage;
