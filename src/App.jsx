import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoutes';
import Logout from './components/Logout';
import RegisterAndLogout from './components/RegisterAndLogout';
import Layout from './components/Layout';

function App() {
  const access_token = localStorage.getItem('access_token');
  console.log(access_token, 'access');
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              // Wrapper around Home component that checks for access token and checks if valid
              <ProtectedRoute>
                <Layout>
                  <Home token={access_token} />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<RegisterAndLogout />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
