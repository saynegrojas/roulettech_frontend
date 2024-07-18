import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Loading from '../Loading';
import '../../styles/characters.css';
import Separate from '../Separate';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '5px',
};

const CharacterDetailsModal = ({ open, handleClose, character, isLoading }) => (
  <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        {!isLoading ? (
          <>
            <span className='avatar-title'>
              <Avatar
                alt={character?.name}
                src={character?.image}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              />
              <Typography variant='h6' component='h2'>
                {character?.name}
              </Typography>
            </span>
            <Separate marginType='m' />
            <Typography sx={{ mt: 2 }}>Location: {character?.location?.name}</Typography>
            <Typography sx={{ mt: 2 }}>Origin: {character?.origin?.name}</Typography>
            <Typography sx={{ mt: 2 }}>Status: {character?.status}</Typography>
            <Typography sx={{ mt: 2 }}>Species: {character?.species}</Typography>
          </>
        ) : (
          <Loading />
        )}
      </Box>
    </Modal>
  </div>
);

export default CharacterDetailsModal;
