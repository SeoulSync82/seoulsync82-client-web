import { useBoundStore } from '@/stores';
import { useEffect } from 'react';

export const useCheckLoginStatus = () => {
  const { isLoggedIn } = useBoundStore((state) => state);
  const { setLoggedIn } = useBoundStore((state) => state);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setLoggedIn(!!token);
  }, [isLoggedIn]);

  return { isLoggedIn };
};
