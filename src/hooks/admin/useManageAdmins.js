import { useState, useEffect } from "react";
import { queryUser } from "@/api/admin/userApi";
import { getAdmins, makeAdminApi, removeAdminApi } from "@/api/admin/adminApi";
import { useDebounce } from "react-use";
import toast from "react-hot-toast";

const useManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("idle");

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await getAdmins();

      setAdmins(res.admins);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to get admins list");
    } finally {
      setLoading(false);
    }
  };

  useDebounce(
    () => {
      if (!query) {
        setSearchResults([]);
        setStatus("idle");
        return;
      }
      if (!validateInput(query)) {
        setSearchResults([]);
        setStatus("invalid");
        return;
      }

      const searchUsers = async (query) => {
        try {
          setStatus("loading");
          const res = await queryUser(query);

          if (res.users.length > 0) {
            setSearchResults(res.users);
            setStatus("success");
          } else {
            setSearchResults([]);
            setStatus("empty");
          }
        } catch (err) {
          toast.error(err.message || "failed to search user");
          setStatus("error");
        }
      };
      searchUsers(query);
    },
    500,
    [query]
  );

  const makeAdmin = async (userId) => {
    try {
      const updatedUser = await makeAdminApi(userId);

      // Update admins list
      setAdmins((prev) => [...prev, updatedUser.user]);

      // Update search results if that user was there
      setSearchResults((prev) =>
        prev.map((u) => (u._id === updatedUser.user._id ? updatedUser.user : u))
      );

      toast.success("User promoted to admin");
    } catch (err) {
      toast.error(err.message || "Failed to make admin");
    }
  };

  const removeAdmin = async (userId) => {
    try {
      const updatedUser = await removeAdminApi(userId);

      // Remove from admins list
      setAdmins((prev) => prev.filter((u) => u._id !== updatedUser.user._id));

      // Update search results if that user was there
      setSearchResults((prev) =>
        prev.map((u) => (u._id === updatedUser.user._id ? updatedUser.user : u))
      );

      toast.success("Admin rights removed");
    } catch (err) {
      toast.error(err.message || "Failed to remove admin");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return {
    admins,
    searchResults,
    loading,
    makeAdmin,
    removeAdmin,
    query,
    setQuery,
    status,
  };
};

export default useManageAdmins;

function validateInput(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  return emailRegex.test(value) || phoneRegex.test(value);
}
