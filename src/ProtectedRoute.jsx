import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import LoginModal from "./ui/LoginModal";
import { useState } from "react";

const isAuthenticated = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() > exp * 1000) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      return false;
    }
  } catch (error) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
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
