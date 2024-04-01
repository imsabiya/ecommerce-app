import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ path, element }) => {
  const token = sessionStorage.getItem("token");

  return token ? (
    ["/", "/login", "/register", "/resetPwd"].includes(path) ? (
      <Navigate to="/products" />
    ) : (
      element
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;