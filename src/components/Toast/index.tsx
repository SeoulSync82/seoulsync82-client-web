import React from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-24 left-0 right-0 mx-auto line-clamp-2 w-[390px] rounded bg-gray-900 px-4 py-3 text-center text-sm font-normal leading-5 text-white">
      {message}
    </div>
  );
};

export default Toast;
