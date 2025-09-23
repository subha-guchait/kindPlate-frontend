import { useEffect, useRef, useState } from "react";
import { PostCard } from "@/components/PostCard";
import { usePosts } from "@/hooks/usePosts";
import indiaData from "@/data/indiaStatesAndCities";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [limit, setLimit] = useState(5);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { posts, setPosts, loading, hasNextPage, isFetchingMore } = usePosts({
    currentPage,
    limit,
    selectedState,
    selectedCity,
  });

  const states = indiaData.states.map((state) => state.name);
  const cities =
    indiaData.states.find((state) => state.name === selectedState)?.cities ||
    [];

  const loadMoreRef = useRef(null);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!hasNextPage || isFetchingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, isFetchingMore]);

  const handleRemovePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
    setCurrentPage(1);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-svh flex-col items-center">
      {/* Filters */}
      <AnimatePresence>
        {(posts.length > 0 || selectedState || selectedCity) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 my-6 px-4"
          >
            <select
              className="select select-bordered select-sm w-full sm:w-auto"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">All States</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered select-sm w-full sm:w-auto"
              value={selectedCity}
              onChange={handleCityChange}
              disabled={!selectedState}
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts */}
      {loading && posts.length === 0 ? (
        Array.from({ length: 3 }).map((_, index) => (
          <PostSkeleton key={index} />
        ))
      ) : posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center text-gray-500 py-10"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            🍽️
          </motion.div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Whoa! It seems like no one is donating food right now
          </h2>
          <p className="mt-2 text-gray-400">
            Be the first to share a meal and make someone's day! ✨
          </p>
        </motion.div>
      ) : (
        <>
          {posts.map((post) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <PostCard post={post} onDelete={handleRemovePost} />
            </motion.div>
          ))}

          {/* Infinite Scroll Loader */}
          <div
            ref={loadMoreRef}
            className="h-10 flex justify-center items-center"
          >
            {isFetchingMore && (
              <span className="loading loading-spinner text-primary"></span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
