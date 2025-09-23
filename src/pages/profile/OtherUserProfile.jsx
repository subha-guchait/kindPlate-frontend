import { useParams } from "react-router-dom";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import useOtherUserProfile from "@/hooks/useOtherUserProfile";
import ProfileCard from "@/components/profile/profileCard";

const OtherUserProfile = () => {
  const { userId } = useParams();
  const { otherUser, loading } = useOtherUserProfile(userId);

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="">
      <ProfileCard user={otherUser} />
    </div>
  );
};

export default OtherUserProfile;
