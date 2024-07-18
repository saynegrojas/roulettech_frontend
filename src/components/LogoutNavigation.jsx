import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LogoutIcon from '@mui/icons-material/Logout';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';

const LogoutNavigation = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
      <BottomNavigation showLabels size='small'>
        <BottomNavigationAction label='Logout' icon={<LogoutIcon />} onClick={handleLogout} />
      </BottomNavigation>
    </Box>
  );
};

export default LogoutNavigation;
