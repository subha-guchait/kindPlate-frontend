import { useState } from "react";
import toast from "react-hot-toast";

import { uploadPostMedia } from "@/api/mediaApi";
import { createPost } from "@/api/postApi";
import { analyseImage } from "@/api/aiApi";

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [pendingPostData, setPendingPostData] = useState(null);

  const uploadPost = async (postData, file) => {
    const error = validatePostData(postData);
    if (error) return toast.error(error);

    setLoading(true);
    try {
      let mediaUrl = null;

      const expiryHours = Number(postData.expiryTime);
      if (isNaN(expiryHours) || expiryHours <= 0) {
        toast.error("Expiry time must be a positive number");
        return;
      }

      if (file) {
        const controller = new AbortController();
        setAbortController(controller);

        try {
          mediaUrl = await uploadPostMedia(file, {
            signal: controller.signal,
          });
        } catch (error) {
          if (error.name === "AbortError") return;
          throw error;
        }
      }

      const finalPost = {
        ...postData,
        expiryTime: new Date(Date.now() + expiryHours * 60 * 60 * 1000),
        mediaUrl,
      };

      setPendingPostData(finalPost);

      //  RUN AI CHECK BEFORE CREATING POST
      const result = await analyseImage(mediaUrl);
      console.log(result.data);

      // If ANY issue → show modal
      if (
        !result.data.isFood ||
        result.data.isBlurry ||
        result.clarityScore < 5
      ) {
        setAiResult(result);
        setShowAiModal(true);
        return "AI_PENDING"; // STOP normal post creation
      }

      // Otherwise → directly create post
      await createPost(finalPost);
      toast.success("Post created!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Called when user clicks "Continue Anyway"
  const overrideAiAndCreatePost = async () => {
    if (!pendingPostData) return;

    setShowAiModal(false);
    setLoading(true);

    try {
      await createPost(pendingPostData);
      toast.success("Post created!");
      return "SUCCESS";
    } catch (err) {
      toast.error("Failed to create post");
      return "ERROR";
    } finally {
      setLoading(false);
    }
  };

  const cancelPost = () => {
    setShowAiModal(false);
    toast("Post cancelled due to AI warning", { icon: "⚠️" });
  };

  return {
    uploadPost,
    loading,
    abortController,
    showAiModal,
    aiResult,
    overrideAiAndCreatePost,
    cancelPost,
  };
};

export default useCreatePost;

function validatePostData(postData) {
  const { title, description, servings, location } = postData;

  if (!title.trim()) return "Title is required.";
  if (!description.trim()) return "Description is required.";
  if (!servings || isNaN(servings) || servings <= 0)
    return "Servings must be a positive number.";
  if (!location.city.trim() || !location.state.trim())
    return "Location city and state are required.";

  return null;
}
