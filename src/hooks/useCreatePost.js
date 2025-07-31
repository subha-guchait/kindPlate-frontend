import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { uploadPostMedia } from "@/api/mediaApi";
import { createPost } from "@/api/postApi";

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [abortController, setAbortController] = useState(null);

  const uploadPost = async (postData, file) => {
    console.log(postData);
    const error = validatePostData(postData);
    if (error) {
      toast.error(error);
      return;
    }
    setLoading(true);
    try {
      let mediaUrl = null;

      console.log(postData.expiryTime);

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
          if (error.name === "AbortError") {
            console.log("Upload aborted");
            return;
          }
          throw error;
        }
      }

      const post = {
        ...postData,
        expiryTime: new Date(Date.now() + expiryHours * 60 * 60 * 1000),
        mediaUrl: mediaUrl,
      };
      console.log(post);

      await createPost(post);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { uploadPost, loading, abortController };
};

export default useCreatePost;

function validatePostData(postData) {
  const { title, description, servings, expiry, location } = postData;

  if (!title.trim()) return "Title is required.";
  if (!description.trim()) return "Title is required.";
  if (!servings || isNaN(servings) || servings <= 0)
    return "enter valid servings in Number";
  //   if (!expiry || isNaN(expiry) || expiry <= 0)
  //     return "Expiry must be a positive number (in hours).";
  if (!location.city.trim() || !location.state.trim())
    return "Location city and state are required.";

  return null;
}
