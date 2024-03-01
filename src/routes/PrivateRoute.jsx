import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../utils/hooks/useAuth";
import PrivateLayout from "../components/layout/PrivateLayout";

const PrivateRoute = ({ children }) => {
  const { auth, isAuthenticated, authLoading } = useAuth();
  useEffect(() => {
    isAuthenticated();
  }, []);
  if (authLoading) {
    return <div>Cargando...</div>;
  }
  return auth ? (
    <PrivateLayout>{children}</PrivateLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
