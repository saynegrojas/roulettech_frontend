import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import WarningIcon from '@mui/icons-material/Warning';
import Separate from '../components/Separate';

const NotFound = () => (
  <Card
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
    }}
  >
    <CardContent>
      <Typography gutterBottom variant='h5' component='div'>
        404 <WarningIcon />
        <Separate marginType='m' />
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        Page Not Found
      </Typography>
    </CardContent>
  </Card>
);


export default NotFound;
