import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '~/hooks';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <>
      <Outlet />
      {children}
    </>
  ) : (
    <Navigate to='/unauthorized' replace />
  );
}
