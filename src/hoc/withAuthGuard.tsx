import { useCheckLoginStatus } from '@/hooks/useCheckLoginStatus';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function withAuthGuard(WrappedComponent: React.ComponentType<any>) {
  return function AuthGuard(props: unknown) {
    const { isLoggedIn } = useCheckLoginStatus();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoggedIn) {
        navigate('/login');
      }
    }, [isLoggedIn]);

    return !isLoggedIn ? null : <WrappedComponent {...props} />;
  };
}