import { use, useState } from "react";
import { ImagePlus, X, Loader } from "lucide-react";
import useCreatePost from "@/hooks/useCreatePost";

export const CreatePostModal = ({
  isOpen,
  onClose,
  onPostCreated,
  indiaData,
}) => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  // const [loading, setLoading] = useState(false);

  const { uploadPost, loading, abortController } = useCreatePost();

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    servings: "",
    expiryTime: "",
    location: {
      street: "",
      city: "",
      state: "",
    },
  });

  const states = indiaData.states.map((state) => state.name);
  const cities =
    indiaData.states.find((state) => state.name === postData.location.state)
      ?.cities || [];

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      console.log(postData);
      await uploadPost(postData, imageFile);
      onPostCreated();
      onClose();
      setPostData({
        title: "",
        description: "",
        servings: "",
        expiryTime: "",
        location: {
          street: "",
          city: "",
          state: "",
        },
      });
      setImageFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
          <span className="loading loading-dots loading-xl text-primary"></span>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
        <button
          className="absolute top-3 right-3 btn btn-sm btn-circle"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Create Post</h2>

        <div className="space-y-3">
          <div className="tooltip w-full" data-tip="Enter a descriptive title">
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
          </div>

          <div className="tooltip w-full" data-tip="Describe the food item">
            <textarea
              placeholder="Description"
              className="textarea textarea-bordered w-full"
              value={postData.description}
              onChange={(e) =>
                setPostData({ ...postData, description: e.target.value })
              }
            />
          </div>

          <div className="flex gap-2">
            <div className="tooltip w-full" data-tip="Servings">
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Servings"
                min={1}
                value={postData.servings}
                onChange={(e) =>
                  setPostData({ ...postData, servings: e.target.value })
                }
              />
            </div>
            <div className="tooltip w-full" data-tip="Expiry in hours">
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Expiry (hrs)"
                min={1}
                value={postData.expiryTime}
                onChange={(e) =>
                  setPostData({ ...postData, expiryTime: e.target.value })
                }
              />
            </div>
          </div>

          <div className="tooltip w-full" data-tip="Street address">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Street"
              value={postData.location.street}
              onChange={(e) =>
                setPostData({
                  ...postData,
                  location: { ...postData.location, street: e.target.value },
                })
              }
            />
          </div>

          <div className="tooltip w-full" data-tip="Select state">
            <select
              className="select select-bordered w-full"
              value={postData.location.state}
              onChange={(e) =>
                setPostData({
                  ...postData,
                  location: {
                    ...postData.location,
                    state: e.target.value,
                    city: "",
                  },
                })
              }
            >
              <option disabled value="">
                Select State
              </option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="tooltip w-full" data-tip="Select city">
            <select
              className="select select-bordered w-full"
              value={postData.location.city}
              onChange={(e) =>
                setPostData({
                  ...postData,
                  location: { ...postData.location, city: e.target.value },
                })
              }
              disabled={!postData.location.state}
            >
              <option disabled value="">
                Select City
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div
            className="tooltip w-full mb-2"
            data-tip="Upload a picture of the food"
          >
            {!previewUrl ? (
              <label className="flex items-center justify-center gap-2 border border-dashed border-gray-400 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition">
                <ImagePlus className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">
                  {imageFile?.name || "Click to upload food image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImageFile(file);
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative mt-2 w-32 h-32 rounded-lg overflow-hidden border shadow-sm">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    if (abortController) {
                      abortController.abort(); // Abort ongoing upload
                    }
                    setPreviewUrl(null);
                    setImageFile(null);
                  }}
                  className="btn btn-xs btn-circle absolute top-1 right-1 bg-white shadow hover:bg-gray-200"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleCreatePost}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="animate-spin w-4 h-4 mr-2" /> Posting...
              </>
            ) : (
              "Post"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
