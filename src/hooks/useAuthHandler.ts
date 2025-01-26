import { setAccessToken } from '@/utils/auth';
import { useEffect, useLayoutEffect } from 'react';

export const useAuthHandler = () => {
  useEffect(() => {
    const token = window.location.search.substring(1).split('=')[1];
    if (!token) return;
    console.log('token from url parameter: ', token);
    setAccessToken(token);
    window.location.href = '/';
  }, []);
};
