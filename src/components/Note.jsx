import React from 'react';
import '../styles/note.css';

const Note = ({ note, onDelete }) => {
  const formattedDate = new Date(note.created_at).toLocaleDateString('en-us');
  return (
    <div className='note-container'>
      <p className='note-title'>{note.title}</p>
      <p className='note-content'>{note.content}</p>
      <p className='note-date'>{formattedDate}</p>
      <button className='delete-button' onClick={() => onDelete(note.id)}>
        Remove
      </button>
    </div>
  );
};

export default Note;
