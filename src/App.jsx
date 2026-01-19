import React, { useState, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { jwtDecode } from 'jwt-decode';
import ReactPixel from "react-facebook-pixel";

import { clearToken } from './utils';
import config from './config';

const AppContent = ({
  isSubscribed,
  isLoggedIn,
  userId,
  isAdmin,
  clearTokenFn
}) => {
  const location = useLocation();

  // ✅ Track page views on route change
  useEffect(() => {
    ReactPixel.pageView();
  }, [location]);

  return (
    <AppRoutes
      isSubscribed={isSubscribed}
      isLoggedIn={isLoggedIn}
      userId={userId}
      isAdmin={isAdmin}
      clearToken={clearTokenFn}
    />
  );
};

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  // 🔐 Decode JWT
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const [userId, isAdmin] = decodedToken.payload;

        setUserId(userId);
        setIsLoggedIn(true);
        setIsAdmin(isAdmin === "1" || isAdmin === true);
      } catch (error) {
        console.error('Error decoding token:', error);
        clearToken(setIsLoggedIn, setUserId, setIsSubscribed);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // 🔍 Fetch admin status
  useEffect(() => {
    const fetchAdministrationStatus = async () => {
      if (!userId) return;

      try {
        const url = `${config.API_BASE_URL}/api/subscriptions/admin/status/${userId}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setIsAdmin(data.isAdmin > 0);
        }
      } catch (error) {
        console.error('Error fetching admin:', error);
      }
    };

    fetchAdministrationStatus();
  }, [userId]);

  return (
    <BrowserRouter>
      <AppContent
        isSubscribed={isSubscribed}
        isLoggedIn={isLoggedIn}
        userId={userId}
        isAdmin={isAdmin}
        clearTokenFn={() =>
          clearToken(setIsLoggedIn, setUserId, setIsSubscribed)
        }
      />
    </BrowserRouter>
  );
};

export default App;
