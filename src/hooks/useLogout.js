import { useCallback } from 'react';
import useAuth from './useAuth';

const useLogout = () => {
  const { logout } = useAuth();

  const handleLogout = useCallback(async () => {
    try {
      logout();
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }, [logout]);

  return { logout: handleLogout };
};

export default useLogout;
