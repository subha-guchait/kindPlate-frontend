import { motion, AnimatePresence } from "framer-motion";

const SearchInput = ({ query, setQuery, status }) => {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const getMessage = () => {
    switch (status) {
      case "invalid":
        return {
          text: "Enter a valid email or phone number",
          color: "text-red-500",
        };
      case "loading":
        return { text: "Searching...", color: "text-indigo-500" };
      case "empty":
        return { text: "No user found", color: "text-gray-500" };
      case "error":
        return {
          text: "Something went wrong. Please try again.",
          color: "text-red-500",
        };
      default:
        return null;
    }
  };

  const message = getMessage();

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-lg mx-auto my-6"
    >
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by Email or Mobile..."
        className="w-full px-5 py-3 rounded-xl shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
      />

      {/* Status Message */}
      <AnimatePresence>
        {message && (
          <motion.p
            key={status}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={`mt-2 text-sm ${message.color}`}
          >
            {message.text}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchInput;
