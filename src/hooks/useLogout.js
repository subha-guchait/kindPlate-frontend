import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    try {
      localStorage.removeItem("token");
      setAuthUser(null);
      toast.success("Logged out sucessfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return { logout };
};

export default useLogout;
