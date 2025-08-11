import { useState, useEffect, useRef } from "react";
import { Upload, Camera } from "lucide-react";
import { uploadProfilePicture } from "@/api/mediaApi"; // your AWS upload fn

const ProfileForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    imgUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      imgUrl: user.imgUrl || "",
    });
    setPreviewUrl(user.imgUrl || "");
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploadedUrl = formData.imgUrl;

      if (imageFile) {
        uploadedUrl = await uploadProfilePicture(imageFile);
      }

      onSubmit({ ...formData, imgUrl: uploadedUrl });
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      {/* Centered Avatar with Hover Upload */}
      <div className="flex justify-center">
        <div className="relative group w-28 h-28">
          <div className="avatar w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
            <img
              src={
                previewUrl
                  ? previewUrl
                  : `https://placehold.co/35x35?text=${user.firstName[0]}${user.lastName[0]}`
              }
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Hover Overlay */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer rounded-full"
          >
            <Camera className="text-white w-6 h-6" />
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-4">
        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input
            className="input input-bordered w-full bg-gray-100 text-gray-700"
            type="email"
            value={user.email}
            readOnly
          />
        </div>

        {/* First Name */}
        <div>
          <label className="label">First Name</label>
          <input
            className="input input-bordered w-full"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="label">Last Name</label>
          <input
            className="input input-bordered w-full"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="label">Phone</label>
          <input
            className="input input-bordered w-full"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="btn btn-primary w-full">
            Update Profile
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
