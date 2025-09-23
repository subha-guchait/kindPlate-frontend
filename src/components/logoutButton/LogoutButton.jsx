import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import useLogout from "@/hooks/useLogout";

const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <button className="mt-auto" onClick={logout}>
      <IoLogOutOutline className="w-5 h-5 cursor-pointer" />{" "}
      <span>Log out</span>
    </button>
  );
};

export default LogoutButton;
