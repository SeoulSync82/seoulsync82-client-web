import { useEffect, useState } from 'react';

export const useCheckLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, [isLoggedIn]);

  return { isLoggedIn };
};
