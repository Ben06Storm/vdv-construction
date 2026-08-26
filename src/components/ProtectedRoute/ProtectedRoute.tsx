import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;