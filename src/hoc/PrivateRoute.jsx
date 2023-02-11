import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem('token');

  if (!auth) {
    {
      alert('You are not authorized to access this page.');
    }
    return <Navigate to="/" />;
  }
  return children;
};
