import { useState, useEffect } from "react";
import { CreatePostModal } from "@/components/CreatePostModal";
import { PostCard } from "@/components/PostCard";
import { useUserPosts } from "@/hooks/useUserPosts";
import addPostIcon from "../../assets/addPost.png";
import indiaData from "@/data/indiaStatesAndCities";
import PostSkeleton from "@/components/skeleton/PostSkeleton";

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
      <div className="flex min-h-svh flex-col items-center justify-center">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))
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
