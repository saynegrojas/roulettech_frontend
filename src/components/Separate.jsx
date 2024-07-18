import React from 'react';
import Divider from '@mui/material/Divider';

const Separate = (marginType, marginSize = '1rem') => (
  <Divider sx={{ width: '100%', margin: 'revert', [marginType]: marginSize }} />
);

export default Separate;
