import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() > exp * 1000) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoginModalOpen,
        setIsLoginModalOpen,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
