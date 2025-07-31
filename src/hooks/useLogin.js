import React, { useState } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../context/AuthContext";
import { logIn } from "../api/authApi";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ email, password }) => {
    const sucess = handleInputErrors({ email, password });

    if (!sucess) return;
    setLoading(true);

    try {
      const token = await logIn(email, password);
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setAuthUser({ token, ...decoded });
      toast.success("Login successful");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors({ email, password }) {
  if (!email || !password) {
    toast.error("Please fill all fields");
    return false;
  }
  if (!email.includes("@") || !email.includes(".")) {
    toast.error("Please enter a valid email");
    return false;
  }
  return true;
}
