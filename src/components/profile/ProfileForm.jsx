import { useState, useEffect } from "react";

const ProfileForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email (Read Only) */}
      <div>
        <label className="label">Email</label>
        <input
          className="input input-bordered w-full bg-gray-100 text-gray-700 cursor-not-allowed"
          type="email"
          value={user.email}
          readOnly
        />
      </div>

      {/* Name (Editable) */}
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
      <div>
        <label className="label"> Last Name</label>
        <input
          className="input input-bordered w-full"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Phone (Editable) */}
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

      <button type="submit" className="btn btn-primary w-full">
        Update Profile
      </button>
    </form>
  );
};

export default ProfileForm;
