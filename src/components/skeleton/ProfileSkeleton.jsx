const ProfileSkeleton = () => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-background border border-primary/10 rounded-4xl shadow-2xl/10 animate-pulse space-y-6">
      {/* Avatar Skeleton */}
      <div className="flex justify-center">
        <div className="skeleton w-28 h-28 rounded-full"></div>
      </div>

      {/* Form Fields Skeleton */}
      <div className="space-y-4">
        {/* Email */}
        <div className="space-y-2">
          <div className="skeleton h-4 w-16 rounded"></div>
          <div className="skeleton h-10 w-full rounded-lg"></div>
        </div>

        {/* First Name */}
        <div className="space-y-2">
          <div className="skeleton h-4 w-20 rounded"></div>
          <div className="skeleton h-10 w-full rounded-lg"></div>
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <div className="skeleton h-4 w-20 rounded"></div>
          <div className="skeleton h-10 w-full rounded-lg"></div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <div className="skeleton h-4 w-16 rounded"></div>
          <div className="skeleton h-10 w-full rounded-lg"></div>
        </div>

        {/* Submit Button */}
        <div className="skeleton h-12 w-full rounded-xl"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
