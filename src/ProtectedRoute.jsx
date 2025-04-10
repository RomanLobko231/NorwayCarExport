import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import LoginModal from "./ui/LoginModal";
import { useState } from "react";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() > exp * 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      return false;
    }
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    return false;
  }

  return true;
};

const ProtectedRoute = () => {
  const [open, setOpen] = useState(true);

  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <LoginModal open={open} setOpen={setOpen} />
  );
};
export default ProtectedRoute;
