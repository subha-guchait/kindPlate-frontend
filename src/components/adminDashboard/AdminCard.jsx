import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Ban } from "lucide-react";

const AdminCard = ({ user, onMakeAdmin, onRemoveAdmin }) => {
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 mb-3"
    >
      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-12 h-12 rounded-full overflow-hidden shadow-md"
        >
          <img
            src={user.imgUrl}
            alt={fullName}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Name + Contact + Tags */}
        <div>
          <p className="font-semibold text-gray-800 text-lg">{fullName}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">{user.phone}</p>

          <div className="flex flex-wrap gap-2 mt-1">
            {user.role === "admin" && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                <ShieldCheck size={14} /> Admin
              </span>
            )}
            {user.isBlocked && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">
                <Ban size={14} /> Blocked
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Action Button */}
      <div className="flex sm:justify-end">
        {user.role === "admin" ? (
          <Button
            variant="destructive"
            onClick={() => onRemoveAdmin(user._id)}
            className="rounded-xl w-full sm:w-auto"
          >
            Remove Admin
          </Button>
        ) : (
          <Button
            onClick={() => onMakeAdmin(user._id)}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto"
          >
            Make Admin
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default AdminCard;
