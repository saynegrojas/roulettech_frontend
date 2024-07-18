import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../utils/api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

// Wrapper functions for protected routes
const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    // As soon as this component is mounted, we call auth function and catch any errors, settting the isAuthorized state to false
    auth().catch(() => setIsAuthorized(false));
  }, []);

  // Automatically refresh access token
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      const response = await api.post('/api/token/refresh/', { refresh: refreshToken });

      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      setIsAuthorized(false);
    }
  };

  // Check if we need to refresh the token
  const auth = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (!accessToken) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decoded = jwtDecode(accessToken);
      const accessTokenExpiration = decoded.exp;
      const currentTime = Date.now() / 1000;

      if (accessTokenExpiration < currentTime) {
        await refreshToken();
        return;
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error('Error decoding access token:', error);
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) return <div>Loading ...</div>;

  return isAuthorized ? children : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
