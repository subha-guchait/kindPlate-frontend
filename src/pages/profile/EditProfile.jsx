import ProfileForm from "@/components/profile/ProfileForm";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import useProfile from "@/hooks/useProfile";

const EditProfile = () => {
  const { user, loading, handleUpdate } = useProfile();

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      {user && <ProfileForm user={user} onSubmit={handleUpdate} />}
    </div>
  );
};

export default EditProfile;
