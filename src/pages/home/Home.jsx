import { PostCard } from "@/components/PostCard";
import { usePosts } from "@/hooks/usePosts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import indiaData from "@/data/indiaStatesAndCities";
import PostSkeleton from "@/components/skeleton/PostSkeleton";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const {
    posts,
    setPosts,
    loading,
    hasPreviousPage,
    hasNextPage,
    previousPage,
    nextPage,
    lastPage,
  } = usePosts({ currentPage, limit, selectedState, selectedCity });

  const states = indiaData.states.map((state) => state.name);
  const cities =
    indiaData.states.find((state) => state.name === selectedState)?.cities ||
    [];

  const handlePrev = () => {
    if (hasPreviousPage) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (hasNextPage) setCurrentPage((prev) => prev + 1);
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1); // reset to first page on limit change
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity(""); // reset city
    setCurrentPage(1);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setCurrentPage(1);
  };

  const handleRemovePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      {/* Filters */}
      <div className="flex flex-wrap justify-center items-center gap-4 my-6">
        {/* State dropdown */}
        <select
          className="select select-bordered select-sm"
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

        {/* City dropdown */}
        <select
          className="select select-bordered select-sm"
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
      </div>
      {loading ? (
        <div className="flex flex-col items-center">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <PostSkeleton key={index} />
              ))
            : posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      ) : posts.length === 0 || !posts ? (
        <div className="text-center text-gray-500">No posts available</div>
      ) : (
        <>
          <div>
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onDelete={handleRemovePost}
              />
            ))}
          </div>
          {/* Pagination */}
          <div className="join mt-6 flex  items-center gap-2">
            <button
              className="join-item btn btn-sm"
              onClick={handlePrev}
              disabled={!hasPreviousPage}
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>

            <button className="join-item btn btn-sm no-animation cursor-default">
              Page {currentPage} of {lastPage}
            </button>

            <button
              className="join-item btn btn-sm"
              onClick={handleNext}
              disabled={!hasNextPage}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Limit dropdown */}

            <select
              className="select select-bordered select-sm"
              value={limit}
              onChange={handleLimitChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
