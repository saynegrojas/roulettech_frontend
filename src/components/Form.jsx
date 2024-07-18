import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import '../styles/form.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Loading from './Loading';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

// route: get token / register
// method: login / register
const Form = ({ route, method }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formTitle = method === 'login' ? 'Login' : 'Sign Up';

  const navigate = useNavigate();

  const toggleRoute = () => navigate(method === 'login' ? '/register' : '/login');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const handleSubmit = async (e) => {
    let hasError = false;

    e.preventDefault();
    setIsLoading(true);

    if (username.trim() === '') {
      setUsernameError(true);
      hasError = true;
    }

    if (password.trim() === '') {
      setPasswordError(true);
      hasError = true;
    }

    if (!hasError) {
      try {
        const response = await api.post(route, { username, password });
        const data = response.data;

        if (method === 'login') {
          localStorage.setItem(ACCESS_TOKEN, data.access);
          localStorage.setItem(REFRESH_TOKEN, data.refresh);
          navigate('/');
        } else navigate('/login');
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isFormValid = username.trim() !== '' && password.trim() !== '';

  if (isLoading) return <Loading />;

  return (
    <form
      onSubmit={handleSubmit}
      className='form-container'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 300,
        margin: '0 auto',
      }}
    >
      <h1 className='form-title'>{formTitle}</h1>
      <Divider sx={{ width: '100%', margin: 'revert', mb: 2 }} />

      <TextField
        label='Username'
        value={username}
        onChange={handleUsernameChange}
        required
        error={usernameError}
        helperText={usernameError ? 'Username is required' : ''}
        fullWidth
      />
      <TextField
        label='Password'
        type='password'
        value={password}
        onChange={handlePasswordChange}
        margin='normal'
        required
        error={passwordError}
        helperText={passwordError ? 'Password is required' : ''}
        fullWidth
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{ mt: 2, width: '100%' }}
        disabled={!isFormValid}
      >
        {formTitle}
      </Button>

      <Divider sx={{ width: '100%', margin: 'revert', marginTop: '1rem' }} />
      <div className='option-selection'>
        <Typography variant='body2' color='text.secondary'>
          {method === 'login' ? `Don't have an account?` : 'Already have a account?'}
        </Typography>{' '}
        <Link
          component='button'
          variant='body2'
          type='button'
          sx={{ textDecoration: 'none' }}
          onClick={toggleRoute}
        >
          {method === 'login' ? ' Create an Account' : ' Sign In'}
        </Link>
      </div>
    </form>
  );
};

export default Form;
