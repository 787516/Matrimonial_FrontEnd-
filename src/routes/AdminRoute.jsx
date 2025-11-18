import { Navigate } from 'react-router-dom';
import React from 'react'
const AdminRoute = ({ children, isAdmin }) => {
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
