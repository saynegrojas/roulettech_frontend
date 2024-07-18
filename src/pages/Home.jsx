import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import '../styles/home.css';
import useToastNotification from '../components/hooks/useToastNotification';
import Characters from '../components/characters';
import Loading from '../components/Loading';

const Home = ({ token }) => {
  const [characters, setCharacters] = useState([]);
  const { toastNotification } = useToastNotification();
  const [isLoading, setIsLoading] = useState(token ? false : true);

  const getCharacters = () => {
    api
      .get('/api/characters/')
      .then((response) => response.data)
      .then((data) => {
        setCharacters(data.results);
        setIsLoading(false);
      })
      .catch((error) => toastNotification(error, 'error'));
  };

  useEffect(() => getCharacters(), []);

  if (isLoading) return <Loading />;

  return (
    <div>
      <Characters characters={characters} />
    </div>
  );
};

export default Home;
