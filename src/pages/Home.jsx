import React, { useEffect, useState } from 'react';
import Logout from '../components/Logout';
import api from '../utils/api';
import Note from '../components/Note';
import '../styles/home.css';
import useToastNotification2 from '../components/hooks/useToastNotification';
import Characters from '../components/characters';
import Loading from '../components/Loading';
import LogoutNavigation from '../components/LogoutNavigation';

const Home = ({ token }) => {
  console.log(token, 'token');
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [characters, setCharacters] = useState([]);
  const { toastNotification } = useToastNotification2();
  const [isLoading, setIsLoading] = useState(token ? false : true);

  // send request to backend to get all notes
  const getNotes = () => {
    api
      .get('/api/notes/')
      .then((response) => response.data)
      .then((data) => {
        setNotes(data);
      })
      .catch((error) => console.log(error));
  };

  const getCharacters = () => {
    api
      .get('/api/characters/')
      .then((response) => response.data)
      .then((data) => {
        setCharacters(data.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((response) => {
        if (response.status === 204) toastNotification('Note deleted', success);
        else toastNotification('Failed to delete note', 'error');
        getNotes();
      })
      .catch((error) => console.log(error));
    // Instead of calling getNotes again, we can filter out the notes that was delete
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post('/api/notes/', { title, content })
      .then((response) => {
        if (response.status === 201) toastNotification('Note created', 'success');
        else toastNotification('Failed to create note', 'error');
        getNotes();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => getCharacters(), []);
  if (isLoading) return <Loading />;
  console.log(isLoading);
  return (
    <div>
      <Characters characters={characters} />
    </div>
  );
};

export default Home;
