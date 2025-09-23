import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // helper: update token
  const setToken = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
          localStorage.removeItem("token");
          setAuthUser(null);
        } else {
          setAuthUser({ token, ...decoded });
        }
      } catch {
        localStorage.removeItem("token");
        setAuthUser(null);
      }
    } else {
      localStorage.removeItem("token");
      setAuthUser(null);
    }
  };

  // on mount: read from localStorage once
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      setAuthUser(null);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, setToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
