import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const ProtectedRoutes = () => {
  const { user, loading } = useAuthStore();

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
