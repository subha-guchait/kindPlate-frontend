import { useState } from "react";
import { toggleLikePost, markPostAsClaimed, deletePost } from "@/api/postApi";
import toast from "react-hot-toast";

export function useLike(post) {
  const [liked, setLiked] = useState(post.likedByUser);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [loading, setLoading] = useState(false);

  const handleLikeToggle = async () => {
    if (loading) return;

    const prevLiked = liked;
    const prevLikeCount = likeCount;

    // 🔁 Optimistic update
    const newLiked = !prevLiked;
    const newLikeCount = prevLikeCount + (prevLiked ? -1 : 1);

    setLiked(newLiked);
    setLikeCount(newLikeCount);
    setLoading(true);

    try {
      const data = await toggleLikePost(post._id);

      // ✅ Only update if changed
      if (liked !== data.post.likedByUser) setLiked(data.post.likedByUser);
      if (likeCount !== data.post.likeCount) setLikeCount(data.post.likeCount);
    } catch (err) {
      setLiked(prevLiked);
      setLikeCount(prevLikeCount);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { liked, likeCount, loading, handleLikeToggle };
}

export function useClaimPost(post) {
  const [isClaimed, setIsClaimed] = useState(post.isClaimed);
  const [claiming, setClaiming] = useState(false);

  const handleClaim = async () => {
    if (claiming) return;
    setClaiming(true);

    try {
      const data = await markPostAsClaimed(post._id);
      setIsClaimed(data.post.isClaimed);
      toast.success(data.message || "Post marked as claimed");
    } catch (err) {
      toast.error(err.message || "Failed to mark post as claimed");
    } finally {
      setClaiming(false);
    }
  };

  return { claiming, handleClaim, isClaimed };
}

export function useDeletePost(postId, onSuccess) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (deleting) return;

    setDeleting(true);
    try {
      const data = await deletePost(postId);
      toast.success(data.message || "Post deleted successfully");
      if (onSuccess) onSuccess(); // e.g., remove post from UI
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  return { deleting, handleDelete };
}
