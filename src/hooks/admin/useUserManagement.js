import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import {
  queryUser,
  getUser,
  blockUserApi,
  unBlockUserApi,
} from "@/api/admin/userApi";
import toast from "react-hot-toast";

function validateInput(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  return emailRegex.test(value) || phoneRegex.test(value);
}

const useUsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | invalid | empty | error | success
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  // Fetch paginated users
  const loadUsers = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      console.log(page);
      const res = await getUser({ page, limit });
      setUsers(res.users);
      setTotalUsers(res.totalUsers);
      setHasNextPage(res.hasNextPage);
      setHasPreviousPage(res.hasPreviousPage);
      setPage(page);
    } catch (err) {
      toast.error(err.message || "Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
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

      const doSearch = async () => {
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
          console.error(err);
          setStatus("error");
        }
      };
      doSearch();
    },
    500,
    [query]
  );

  // Block user
  const blockUser = async (id) => {
    try {
      const res = await blockUserApi(id);
      setUsers((prev) => prev.map((u) => (u._id === id ? res.user : u)));
      setSearchResults((prev) =>
        prev.map((u) => (u._id === id ? res.user : u))
      );
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to block user");
    }
  };

  // Unblock user
  const unblockUser = async (id) => {
    try {
      const res = await unBlockUserApi(id);
      setUsers((prev) => prev.map((u) => (u._id === id ? res.user : u)));
      setSearchResults((prev) =>
        prev.map((u) => (u._id === id ? res.user : u))
      );
    } catch (err) {
      toast.error(err.message || "Failed to blocke user");
      console.error(err);
    }
  };

  useEffect(() => {
    loadUsers(page, limit);
  }, [page, limit]);

  return {
    users,
    searchResults,
    query,
    setQuery,
    status,
    loading,
    page,
    setPage,
    limit,
    setLimit,
    totalUsers,
    hasNextPage,
    hasPreviousPage,
    loadUsers,
    blockUser,
    unblockUser,
  };
};

export default useUsersManagement;
