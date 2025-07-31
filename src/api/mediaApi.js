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
