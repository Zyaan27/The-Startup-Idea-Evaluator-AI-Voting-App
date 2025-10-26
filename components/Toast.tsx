
import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const toastStyles = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white',
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 max-w-md w-11/12 z-50 animate-toast-in">
      <div className={`flex items-center justify-between p-4 rounded-lg shadow-lg ${toastStyles[type]}`}>
        <p className="font-medium">{message}</p>
        <button onClick={onClose} className="ml-4 text-xl font-light leading-none">&times;</button>
      </div>
    </div>
  );
};

export default Toast;
