import ProfileForm from "@/components/profile/ProfileForm";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import useProfile from "@/hooks/useProfile";
import ProfileCard from "@/components/profile/profileCard";

const ViewProfile = () => {
  const { user, loading } = useProfile();

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="">
      <ProfileCard user={user} />
    </div>
  );
};

export default ViewProfile;
