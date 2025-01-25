import { setAccessToken } from '@/utils/auth';
import { useEffect, useLayoutEffect } from 'react';

export const useAuthHandler = () => {
  useEffect(() => {
    const token = window.location.search.substring(1).split('=')[1];
    console.log('token from url parameter: ', token);
    if (!token) return;
    setAccessToken(token);
    window.location.href = '/';
  }, []);
};
