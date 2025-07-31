import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
          localStorage.removeItem("token");
          setAuthUser(null);
        } else {
          setAuthUser({ token, ...decoded });
        }
      } catch (err) {
        localStorage.removeItem("token");
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
