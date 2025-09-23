import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function FullScreenAd({ ad, visible, closeAd }) {
  return (
    <AnimatePresence>
      {visible && ad && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key="ad"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="relative max-w-lg w-[90%] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={closeAd}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={24} />
            </button>

            {/* Ad Content */}
            <div className="p-6 text-center">
              {ad.mediaUrl ? (
                <motion.img
                  src={ad.mediaUrl}
                  alt="ad"
                  className="w-full rounded-lg shadow-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
              ) : (
                <motion.p
                  className="text-lg text-gray-800 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {ad.content}
                </motion.p>
              )}

              {ad.webUrl && (
                <motion.a
                  href={ad.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full shadow-md hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Learn More
                </motion.a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
