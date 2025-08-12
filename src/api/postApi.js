import api from "./axios";

export const getPosts = async (page = 1, limit = 10, filter = {}) => {
  try {
    const params = { page, limit, ...filter };
    const response = await api.get("/posts", { params });

    return response.data;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw new Error(err.response.data.message);
  }
};

export const createPost = async (postData) => {
  try {
    const res = await api.post("/posts", postData);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const otherUserPosts = async (userId) => {
  try {
    const res = await api.get(`/posts/user/${userId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
export const userPosts = async () => {
  try {
    const res = await api.get("/posts/user");
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const toggleLikePost = async (postId) => {
  try {
    const res = await api.post(`/posts/like/${postId}`, {});
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
export const deletePost = async (postId) => {
  try {
    const res = await api.delete(`/posts/${postId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const markPostAsClaimed = async (postId) => {
  try {
    const res = await api.patch(`/posts/claimed/${postId}`, {});
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
