import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log("Token:", token);
  return !!token;
};

const ProtectedRoute = ({ children }) => {
  const auth = isAuthenticated();
  console.log("isAuthenticated:", auth);

  if (!auth) {
    return <Navigate to="/notfound" replace />;
  }
  return children;
};

export default ProtectedRoute;

