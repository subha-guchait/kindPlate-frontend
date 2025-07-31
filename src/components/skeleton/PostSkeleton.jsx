const PostSkeleton = () => {
  return (
    <div className="m-4 max-w-[30rem] w-full rounded-4xl bg-background border border-primary/10 shadow-2xl/10 p-4 animate-pulse flex flex-col gap-4">
      {/* Header skeleton */}
      <div className="flex items-center gap-4">
        <div className="skeleton h-10 w-10 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-24 rounded"></div>
          <div className="skeleton h-3 w-16 rounded"></div>
        </div>
      </div>

      {/* Text content */}
      <div className="skeleton h-4 w-32 rounded"></div>
      <div className="skeleton h-4 w-full rounded"></div>
      <div className="skeleton h-4 w-5/6 rounded"></div>

      {/* Image skeleton */}
      <div className="skeleton h-48 w-full rounded-lg"></div>

      {/* Action buttons */}
      <div className="flex justify-evenly gap-2 mt-2">
        <div className="skeleton h-8 w-20 rounded-xl"></div>
        <div className="skeleton h-8 w-20 rounded-xl"></div>
        <div className="skeleton h-8 w-20 rounded-xl"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
