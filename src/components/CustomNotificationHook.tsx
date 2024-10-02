import { useCallback } from 'react';

const useNotification = () => {
  const addNotification = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    alert(`${type.toUpperCase()}: ${message}`); // Display alert with the message and type
  }, []);

  return { addNotification };
};

export default useNotification;
