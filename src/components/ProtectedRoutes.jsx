// Represent a wrapper for a protected route that must have an authorization token before accessing the endpoint
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../utils/api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

// wrapper functions for protected routes
const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    // As soon as this component is mounted, we call auth function and catch any errors, settting the isAuthorized state to false
    auth().catch(() => setIsAuthorized(false));
  }, []);

  // Automatically refresh access token
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      // Send request to backend with refresh token to get a New access token
      const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  // Check if we need to refresh the token
  const auth = async () => {
    // 1. Check to see if we have an access token
    // 2. If we do, check if expired
    // 3. If expired, check if we can refresh the token
    // 4. If we cannot refresh the token or expired, redirect to login

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken) {
      setIsAuthorized(false);
      return;
    }
    // If we do have the token, we let jwtDecode to decode the token and get the expiration date
    const decoded = jwtDecode(accessToken);
    const accessTokenExpiration = decoded.exp;
    const now = Date.now() / 1000; // get in secs

    if (accessTokenExpiration < now) {
      await refreshToken();
      return;
    } else setIsAuthorized(true);
  };

  // Check if the user is authorized
  if (isAuthorized === null) return <div>Loading ...</div>;

  return isAuthorized ? children : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
