// src/pages/CreateAds.jsx
import { motion } from "framer-motion";
import useCreateAds from "@/hooks/useCreateAds";

export default function CreateAds() {
  const { form, handleChange, price, loading, submitAndPay } = useCreateAds();

  const onSubmit = (e) => {
    e.preventDefault();
    submitAndPay();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <h1 className="text-2xl font-bold mb-4">Create New Ad</h1>

      <div className="card bg-base-100 shadow-xl p-4 sm:p-6 max-w-2xl mx-auto w-full">
        <form className="space-y-4" onSubmit={onSubmit}>
          {/* Content (optional) */}
          <div>
            <label className="label">
              <span className="label-text">
                Advertisement Content (optional)
              </span>
            </label>
            <textarea
              name="content"
              className="textarea textarea-bordered w-full"
              placeholder="Write ad content (optional)"
              value={form.content}
              onChange={handleChange}
            />
          </div>

          {/* Image (required) */}
          <div>
            <label className="label">
              <span className="label-text">Advertisement Image</span>
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handleChange}
              required
            />
          </div>

          {/* Website URL (optional) */}
          <div>
            <label className="label">
              <span className="label-text">Website URL (optional)</span>
            </label>
            <input
              type="url"
              name="websiteUrl"
              placeholder="https://example.com"
              className="input input-bordered w-full"
              value={form.websiteUrl}
              onChange={handleChange}
            />
          </div>

          {/* Duration (required) */}
          <div>
            <label className="label">
              <span className="label-text">Duration (in days)</span>
            </label>
            <input
              type="number"
              name="duration"
              min="1"
              placeholder="Enter number of days"
              className="input input-bordered w-full"
              value={form.duration}
              onChange={handleChange}
              required
            />
            {price !== null && (
              <p className="mt-2 text-sm">
                Estimated price: <span className="font-semibold">₹{price}</span>
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit & Pay"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
