const SkeletonCard = () => {
  return (
    <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4 animate-pulse">
      <div>
        <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 w-20 bg-gray-300 rounded"></div>
      </div>
      <div className="h-5 w-10 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
