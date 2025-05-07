import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from '@/components/Toast';

interface ToastContextProps {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<string[]>([]);

  const showToast = (message: string) => {
    setToasts((prev) => [...prev, message]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((message, index) => (
        <Toast
          key={index}
          message={message}
          onClose={() => setToasts((prev) => prev.filter((_, i) => i !== index))}
        />
      ))}
    </ToastContext.Provider>
  );
};
