import React from "react";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setAuthUser(null);
      toast.success("Logged out sucessfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <button className="mt-auto" onClick={handleLogout}>
      <IoLogOutOutline className="w-6 h-6 cursor-pointer" />
    </button>
  );
};

export default LogoutButton;
