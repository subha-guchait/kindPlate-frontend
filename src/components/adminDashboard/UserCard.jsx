import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Ban, Star, Phone, Users, AtSign } from "lucide-react";

const UserCard = ({ user, onBlock, onUnblock }) => {
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
  const createdAt = new Date(user.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 mb-4"
    >
      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-md shrink-0"
        >
          <img
            src={user.imgUrl}
            alt={fullName}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Name + Contact + Details */}
        <div className="flex flex-col">
          <p className="font-semibold text-gray-800 text-base sm:text-lg">
            {fullName}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
            <AtSign size={14} className="text-gray-500" />
            {user.email}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-1 text-xs sm:text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Phone size={14} className="text-gray-500" />
              {user.phone || "N/A"}
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} className="text-gray-500" />
              {user.userType || "N/A"}
            </span>
            <span className="flex items-center gap-1">
              <Star size={14} className="text-yellow-500" />
              {user.points ?? 0} pts
            </span>
            <span>Joined: {createdAt}</span>
          </div>

          {/* Badges */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {user.role === "admin" && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600 font-medium">
                <ShieldCheck size={14} /> Admin
              </span>
            )}
            {user.isBlocked && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-medium">
                <Ban size={14} /> Blocked
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Action Button */}
      <div className="mt-3 sm:mt-0 sm:ml-4 flex justify-end">
        {user.isBlocked ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUnblock(user._id)}
          >
            Unblock
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={() => onBlock(user._id)}>
            Block
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default UserCard;
