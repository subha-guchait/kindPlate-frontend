import React from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

const getRankStyle = (rank, isCurrentUser) => {
  if (rank === 1) return "bg-yellow-400 text-white font-bold shadow-lg";
  if (rank === 2) return "bg-gray-300 text-white font-bold shadow-md";
  if (rank === 3) return "bg-orange-400 text-white font-bold shadow-md";
  return "bg-white";
};

const Leaderboard = ({ leaderboardData, currentUserId }) => {
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-3xl font-extrabold text-center mb-6">
        🍲 Top Donors
      </h2>
      <ul className="space-y-4">
        {leaderboardData.map((player, index) => {
          const isCurrentUser = player._id === currentUserId;
          return (
            <motion.li
              key={player._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-xl border ${getRankStyle(
                index + 1,
                isCurrentUser
              )}`}
            >
              {/* Rank */}
              <div className="flex items-center gap-2 w-12 justify-center">
                <span className="text-lg font-bold">{index + 1}</span>
                {index + 1 === 1 && (
                  <Crown className="w-5 h-5 text-yellow-500" />
                )}
              </div>

              {/* Avatar + Name */}
              <div className="flex items-center gap-3 flex-1">
                <motion.img
                  src={
                    player?.imgUrl ??
                    `https://placehold.co/40x40?text=${player.firstName[0]}${player.lastName[0]}`
                  }
                  alt={player.firstName}
                  className={`w-10 h-10 rounded-full border-2 ${
                    isCurrentUser ? "border-blue-500" : ""
                  }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                />
                <span className="font-medium text-lg flex items-center gap-1">
                  {player.firstName} {player.lastName}
                  {isCurrentUser && (
                    <span className="text-sm text-blue-600 font-bold">
                      (You)
                    </span>
                  )}
                </span>
              </div>

              {/* Points */}
              <span className="font-semibold text-base">
                {player?.points ?? 0} pts
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;
