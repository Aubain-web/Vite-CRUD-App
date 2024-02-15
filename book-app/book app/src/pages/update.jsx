import { useState } from 'react';
import './update.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
  const [updateBook, setUpdateBook] = useState({
    title: '',
    author: '',
    description: ''
  });

  const navigate = useNavigate(); 

  const location = useLocation();
  const id = location.pathname.split('/')[3];

  const updateInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/maj/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateBook)
      });

      if (response.ok) {
        console.log('Livre mis à jour avec succès');
        navigate('/listbook'); 
      } else {
        console.error('Échec de la mise à jour du livre');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du livre:', error);
    }
  };

  return (
   <form id="addBookForm">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={updateBook.title}
          onChange={(e) => setUpdateBook({ ...updateBook, title: e.target.value })}
          required
        />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={updateBook.author}
          onChange={(e) => setUpdateBook({ ...updateBook, author: e.target.value })}
          required
        />
        <label htmlFor="author">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={updateBook.description}
          onChange={(e) => setUpdateBook({ ...updateBook, description: e.target.value })}
          required
        />

        <button type="submit" onClick={updateInfo}>Update</button>
      </form>
  );
};

export default Update;
