import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CharacterDetail = ({ character }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={character.image}
        title={character.name}
        alt={character.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {character.name}
        </Typography>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {character.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Location: {character.location.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Origin: {character.origin.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Status: {character.status}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Species: {character.species}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Share</Button>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default CharacterDetail;
