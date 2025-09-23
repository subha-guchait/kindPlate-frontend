import React from "react";
import { AnimatePresence } from "framer-motion";
import useManageAdmins from "@/hooks/admin/useManageAdmins";
import AdminCard from "@/components/adminDashboard/AdminCard";
import SearchInput from "@/components/SearchInput";

const ManageAdmins = () => {
  const {
    admins,
    searchResults,
    loading,
    makeAdmin,
    removeAdmin,
    query,
    setQuery,
    status,
  } = useManageAdmins();

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Manage Admins</h1>

      {/* Search Bar */}
      <SearchInput query={query} setQuery={setQuery} status={status} />

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Search Results</h2>
          <AnimatePresence>
            {searchResults.map((user) => (
              <AdminCard
                key={user._id}
                user={user}
                isAdmin={admins.some((a) => a._id === user._id)}
                onMakeAdmin={makeAdmin}
                onRemoveAdmin={removeAdmin}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* All Admins */}
      <div>
        <h2 className="font-semibold mb-2">Current Admins</h2>
        <AnimatePresence>
          {admins.map((admin) => (
            <AdminCard
              key={admin._id}
              user={admin}
              isAdmin={true}
              onRemoveAdmin={removeAdmin}
            />
          ))}
        </AnimatePresence>
      </div>

      {loading && <p className="text-gray-500 mt-2">Loading...</p>}
    </div>
  );
};

export default ManageAdmins;
