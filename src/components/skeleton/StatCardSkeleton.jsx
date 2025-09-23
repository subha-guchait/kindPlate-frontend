function StatCardSkeleton() {
  return (
    <div className="shadow-md rounded-2xl p-6 flex items-center gap-4 animate-pulse bg-white">
      <div className="p-3 bg-gray-200 rounded-xl w-12 h-12" />
      <div>
        <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
        <div className="h-5 w-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default StatCardSkeleton;
