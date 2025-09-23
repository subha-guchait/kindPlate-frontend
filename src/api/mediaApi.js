import api from "./axios";
import axios from "axios";

export const uploadPostMedia = async (selectedFile, options) => {
  if (!selectedFile) return;
  try {
    //request presigned url from backend
    const res = await api.post(
      "/media/upload/post",
      { fileName: selectedFile.name, contentType: selectedFile.type },
      { signal: options.signal }
    );

    const { url } = res.data;
    console.log(selectedFile.type);

    await axios.put(`${url}`, selectedFile, {
      headers: { "Content-Type": selectedFile.type },
      signal: options.signal,
    });

    return url.split("?")[0]; // Return clean S3 URL
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Failed to upload media");
  }
};

export const uploadProfilePicture = async (file, options = {}) => {
  if (!file) return;

  try {
    const res = await api.post(
      "/media/upload/profile-photo", // your backend should handle this route separately
      { fileName: file.name, contentType: file.type },
      { signal: options.signal }
    );

    const { url } = res.data;

    await axios.put(url, file, {
      headers: { "Content-Type": file.type },
      signal: options.signal,
    });

    return url.split("?")[0]; // Return S3 URL without query
  } catch (error) {
    console.error("Failed to upload profile picture", error);
    throw new Error("Profile picture upload failed");
  }
};

export const uploadAdMedia = async (selectedFile, options) => {
  if (!selectedFile) return;
  try {
    //request presigned url from backend
    const res = await api.post(
      "/media/upload/ads-media",
      { fileName: selectedFile.name, contentType: selectedFile.type },
      { signal: options.signal }
    );

    const { url } = res.data;
    console.log(selectedFile.type);

    await axios.put(`${url}`, selectedFile, {
      headers: { "Content-Type": selectedFile.type },
      signal: options.signal,
    });

    return url.split("?")[0]; // Return clean S3 URL
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Failed to upload media");
  }
};
