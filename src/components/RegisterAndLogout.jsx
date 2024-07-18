import Register from '../pages/Register';

const RegisterAndLogout = () => {
  // Make sure there are no old access tokens sent to the backend
  localStorage.clear();
  return <Register />;
};

export default RegisterAndLogout;
