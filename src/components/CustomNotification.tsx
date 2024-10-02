import React, { useState } from 'react';

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface NotificationProps {
  notifications: Notification[];
  removeNotification: (id: number) => void;
  clearNotifications: () => void; // Add clearNotifications to props
}

const CustomNotification: React.FC<NotificationProps> = ({ notifications, removeNotification, clearNotifications }) => {
  const [exiting, setExiting] = useState<number | null>(null); // Track which notification is exiting

  const handleRemove = (id: number) => {
    setExiting(id); // Set exiting ID for animation
    setTimeout(() => removeNotification(id), 500); // Delay removal to allow for exit animation
  };

  return (
    <div
      className="notification-container"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        maxWidth: '300px',
        zIndex: 1000,
      }}
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification ${notification.type} ${exiting === notification.id ? 'exit' : ''}`}
          style={{
            backgroundColor: notification.type === 'success' ? '#4CAF50' :
                             notification.type === 'error' ? '#f44336' :
                             notification.type === 'info' ? '#2196F3' : '#ff9800',
            color: 'white',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            opacity: 1,
            transform: 'translateY(0)', // Maintain original position
          }}
        >
          <span>{notification.message}</span>
          <button onClick={() => handleRemove(notification.id)} style={{
            marginLeft: '10px',
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}>✖</button>
        </div>
      ))}
      {notifications.length > 0 && (
        <button onClick={clearNotifications} style={{
          marginTop: '10px',
          background: '#f44336', // Red background for clear button
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          Clear All Notifications
        </button>
      )}
    </div>
  );
};

export default CustomNotification;
