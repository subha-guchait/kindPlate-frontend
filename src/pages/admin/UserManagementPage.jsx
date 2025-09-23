import React, { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import useUsersManagement from "@/hooks/admin/useUserManagement";
import SearchInput from "@/components/SearchInput";
import UserCard from "@/components/adminDashboard/UserCard";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const UserManagementPage = () => {
  const {
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
    blockUser,
    unblockUser,
  } = useUsersManagement();

  const listToRender = query ? searchResults : users;
  const printRef = useRef();

  const handleExportPDF = () => {
    const printContents = printRef.current.innerHTML;
    const newWin = window.open("", "", "width=800,height=600");
    newWin.document.write(`
      <html>
        <head>
          <title>User Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #f5f5f5; }
            h2 { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h2>User Management Report</h2>
          ${printContents}
        </body>
      </html>
    `);
    newWin.document.close();
    newWin.print();
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header with title + export button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">User Management</h1>
        <Button
          onClick={handleExportPDF}
          className="w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export as PDF</span>
          <span className="sm:hidden">Export</span>
        </Button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <SearchInput query={query} setQuery={setQuery} status={status} />
      </div>

      {/* User Cards */}
      {query ? (
        <div className="mb-8">
          <h2 className="font-semibold mb-3 text-gray-800">Search Results</h2>
          <AnimatePresence>
            {listToRender.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onBlock={blockUser}
                onUnblock={unblockUser}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div>
          <h2 className="font-semibold mb-3 text-gray-800">All Users</h2>
          <div className="relative">
            <AnimatePresence>
              {listToRender.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  onBlock={blockUser}
                  onUnblock={unblockUser}
                />
              ))}
            </AnimatePresence>

            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-lg">
                <button className="btn btn-circle loading"></button>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <Button
              className={
                hasPreviousPage
                  ? "cursor-pointer w-full sm:w-auto"
                  : "w-full sm:w-auto"
              }
              variant="outline"
              disabled={!hasPreviousPage}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>

            <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-gray-600">
              <span>
                Page {page} • {totalUsers} users
              </span>
              <div className="flex items-center gap-2">
                <label htmlFor="limit" className="text-gray-700">
                  Per page:
                </label>
                <select
                  id="limit"
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {[5, 10, 20, 50].map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              className={
                hasNextPage
                  ? "cursor-pointer w-full sm:w-auto"
                  : "w-full sm:w-auto"
              }
              variant="outline"
              disabled={!hasNextPage}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Hidden Printable Table */}
      <div ref={printRef} style={{ display: "none" }}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Registered</th>
              <th>Points</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {listToRender.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.firstName + " " + user.lastName || "N/A"}</td>
                <td>{user.email}</td>
                <td>{user.phone || "N/A"}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>{user.points ?? 0}</td>
                <td>{user.isBlocked ? "Blocked" : "Active"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;
