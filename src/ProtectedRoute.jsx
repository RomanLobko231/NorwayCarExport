import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() > exp * 1000) {
      localStorage.removeItem("token");
      return false;
    }
  } catch (error) {
    localStorage.removeItem("token");
    return false;
  }

  return true;
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
