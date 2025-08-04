// NotificationContext.js
import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();
export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const addNotification = (msg, type = 'error') => {
    setNotifications(prev => [...prev, {
      msg,
      type,
      time: new Date().toLocaleTimeString(),
    }]);
  };

  const toggleDropdown = () => setOpen(prev => !prev);
  const clearNotifications = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      open,
      toggleDropdown,
      clearNotifications,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
