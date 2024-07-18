import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import api from '../../utils/api';
import CharacterDetailsModal from './CharacterDetailsModal';
import useToastNotification from '../hooks/useToastNotification';
import LogoutNavigation from '../LogoutNavigation';

const Characters = ({ characters }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toastNotification = useToastNotification();

  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = (e) => {
    e.preventDefault();
    setShowDetails(true);
  };

  const handleDetails = (id) => {
    setIsLoading(true);
    api
      .get(`/api/characters/${id}/`)
      .then((response) => {
        if (response.status === 200) {
          setCharacter(response.data);
          setIsLoading(false);
        } else {
          toastNotification('Failed to fetch details', 'error');
          setIsLoading(false);
        }
      })
      .catch((error) => console.error('Error while fetching details', error));
  };

  return (
    <Box sx={{ width: '100%', margin: '1rem' }}>
      <LogoutNavigation />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {characters.map((char) => (
          <Grid item xs={4} key={char.id}>
            <Card sx={{ maxWidth: 300 }}>
              <CardContent>
                <CardMedia
                  sx={{ height: 140 }}
                  image={char.image}
                  alt={char.name}
                  style={{ backgroundSize: 'contain' }}
                />
                <Typography
                  gutterBottom
                  variant='body'
                  component='div'
                  style={{ textAlign: 'center' }}
                >
                  {char.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={(e) => {
                    handleShowDetails(e);
                    handleDetails(char.id);
                  }}
                  size='small'
                >
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <CharacterDetailsModal
        open={showDetails}
        handleClose={handleCloseDetails}
        character={character}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Characters;
