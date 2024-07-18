import Container from '@mui/material/Container';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  return (
    <Container>
      {children}
      <ToastContainer />
    </Container>
  );
};

export default Layout;
