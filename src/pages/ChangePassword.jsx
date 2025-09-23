import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { changePassword } from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

export default function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({ old: false, new: false });
  const navigate = useNavigate();
  const { setToken } = useAuthContext();

  const rules = useMemo(
    () => [
      {
        id: "length",
        label: "At least 8 characters",
        ok: newPassword.length >= 8,
      },
      {
        id: "uppercase",
        label: "Contains an uppercase letter",
        ok: /[A-Z]/.test(newPassword),
      },
      {
        id: "special",
        label: "Contains a special character",
        ok: /[^a-zA-Z0-9]/.test(newPassword),
      },
      {
        id: "different",
        label: "Different from old password",
        ok: !!newPassword && newPassword !== oldPassword,
      },
    ],
    [newPassword, oldPassword]
  );

  const oldError =
    touched.old && !oldPassword ? "Old password is required" : "";
  const newError = useMemo(() => {
    if (!newPassword) return "New password is required";
    if (newPassword === oldPassword)
      return "New password must differ from old password";
    if (!/[A-Z]/.test(newPassword)) return "Must include an uppercase letter";
    if (!/[^a-zA-Z0-9]/.test(newPassword))
      return "Must include a special character";
    if (newPassword.length < 8) return "Must be at least 8 characters";
    return "";
  }, [newPassword, oldPassword]);

  const formValid = !oldError && !newError;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) {
      toast.error("Please fix the form errors");
      return;
    }
    try {
      setSubmitting(true);
      const res = await changePassword({ oldPassword, newPassword });
      toast.success("Password updated successfully Please log in again");
      setOldPassword("");
      setNewPassword("");
      setToken(res.token);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Failed to change password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-md shadow-xl rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur"
      >
        <div className="card-body p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Change Password
            </h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            For your security, choose a strong password that meets the rules
            below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Old Password */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Old Password</span>
              </div>
              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  className={`input input-bordered w-full rounded-xl pr-12 ${
                    touched.old && oldError && "input-error"
                  }`}
                  onBlur={() => setTouched((t) => ({ ...t, old: true }))}
                  placeholder="Enter old password"
                  autoComplete="current-password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  aria-invalid={!!oldError}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowOld((s) => !s)}
                  aria-label={
                    showOld ? "Hide old password" : "Show old password"
                  }
                >
                  {showOld ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {touched.old && oldError && (
                <span className="text-xs text-error mt-1">{oldError}</span>
              )}
            </label>

            {/* New Password */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">New Password</span>
              </div>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  className={`input input-bordered w-full rounded-xl pr-12 ${
                    touched.new && newError && "input-error"
                  }`}
                  onBlur={() => setTouched((t) => ({ ...t, new: true }))}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  aria-invalid={!!newError}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowNew((s) => !s)}
                  aria-label={
                    showNew ? "Hide new password" : "Show new password"
                  }
                >
                  {showNew ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {touched.new && newError && (
                <span className="text-xs text-error mt-1">{newError}</span>
              )}
            </label>

            {/* Live Rules */}
            <div className="rounded-xl border border-gray-200 dark:border-zinc-800 p-3">
              <div className="flex items-center gap-2 mb-2 text-gray-700 dark:text-gray-200">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Password must include:
                </span>
              </div>
              <ul className="space-y-1 text-sm">
                {rules.map((r) => (
                  <li key={r.id} className="flex items-center gap-2">
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${
                        r.ok ? "bg-green-500" : "bg-gray-300 dark:bg-zinc-700"
                      }`}
                    />
                    <span className={r.ok ? "text-green-600" : "text-gray-500"}>
                      {r.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              disabled={!formValid || submitting}
              className="btn btn-primary w-full rounded-xl mt-2 disabled:opacity-60"
            >
              {submitting ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
