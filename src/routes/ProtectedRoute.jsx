import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authUser, loading } = useAuthContext();
  console.log(authUser);
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-xl text-primary"></span>
      </div>
    );
  }
  if (!authUser) return <Navigate to="/login" />;
  if (!allowedRoles.includes(authUser.role)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
