// import { Navigate } from 'react-router-dom';
// import React from 'react'

// const ProtectedRoute = ({ children, isAuthenticated }) => {
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

const ProtectedRoute = ({ children }) => {
  return children;
};

export default ProtectedRoute;
