import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function withAuthGuard(WrappedComponent: React.ComponentType<any>) {
  return function AuthGuard(props: any) {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
      if (!token) {
        navigate('/login');
      }
    }, [token]);

    return !token ? null : <WrappedComponent {...props} />;
  };
}
