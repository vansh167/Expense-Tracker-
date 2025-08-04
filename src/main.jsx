import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../src/components/UserContext';
import { NotificationProvider } from '../src/components/NotificationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <UserProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
