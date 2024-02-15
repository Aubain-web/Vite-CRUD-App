import { useState } from 'react';
import Head from '../header';
import './addBook.css';



function AddBook() {
  //const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');


  const addBook = (e) =>{
    e.preventDefault();

   const bookData = {
  title: title,
  description: description,
  author: author
};

    fetch("http://localhost:3000/ajouter/books", {
      method : 'POST',
      mode : 'cors',
      headers: {
        'content-Type' : 'application/json',
      },
      body: JSON.stringify(bookData),
    } )
    .then(response => response.json())
    .then(data =>{
      console.log(data);
    })
    .catch(error =>{
      console.error('Error :', error);
    });

    setAuthor(''),
    setTitle(''),
    setDescription('')
  }

  

  return (
    <>
    <Head/>
    <div id="app">
      <h1>My Boo App</h1>

      <form id="addBookForm">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
        <label htmlFor="author">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />

        <button type="submit" onClick={addBook}>Add Book</button>
      </form>
    </div>
    </>
  );
}

export default AddBook;