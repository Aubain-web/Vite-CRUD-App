import { useState } from "react";
import Head from "../header";
import "./search.css";

const SearchBook = () => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const findBooks = () => {
        fetch(`http://localhost:3000/search/books?title=${search}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        setSearchResults(data);
    })
    .catch(error => console.error('Error fetching books:', error));
    }

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        findBooks();
        setSearch('');
    }

    return (
        <>
            <Head/>
            <div className="search-container">
                <form onSubmit={handleSubmit}>
                    <input 
                        type='text' 
                        placeholder='Titre .....' 
                        value={search} 
                        onChange={handleChange} 
                    />
                    <button type='submit'>Search</button>
                </form>
                <ul className="search-results">
                    {searchResults.map(book => (
                        <li key={book._id}>
                            <div className="book-details">
                                <h3>{book.title}</h3>
                                <p>Author: {book.author}</p>
                                <p>Description: {book.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default SearchBook;
