import { motion } from "framer-motion";

const PointHistoryCard = ({ history, index }) => {
  const isCredit = history.points > 0;

  // Format date nicely
  const formattedDate = new Date(history.createdAt).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
    >
      {/* Left side → description & date */}
      <div>
        <p className="font-semibold text-gray-800">{history.description}</p>
        <p className="text-xs text-gray-500 mt-1">
          {isCredit ? "Credited" : "Debited"} on {formattedDate}
        </p>
      </div>

      {/* Right side → points */}
      <span
        className={`font-bold text-lg ${
          isCredit ? "text-green-500" : "text-red-500"
        }`}
      >
        {isCredit ? `+${history.points}` : `${history.points}`}
      </span>
    </motion.div>
  );
};

export default PointHistoryCard;
