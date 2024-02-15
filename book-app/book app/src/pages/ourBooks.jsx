import { useState, useEffect } from "react";
import "./ourbook.css";
import {Link} from "react-router-dom";
import Head from "../header";


const OurBooks = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    listBooks();
  }, []);

  const listBooks = () => {
    fetch("http://localhost:3000/list/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBookList(data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };
 

  const supprimer = async (id) => {
    console.log("ID à supprimer :", id); 
    try {
      const response = await fetch(`http://localhost:3000/sup/books/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Livre supprimé avec succès");
        window.location.reload();        
        listBooks();
      } else {
        console.error("Échec de la suppression du livre");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du livre:", error);
    }
  };

  return (
   <>
   <Head/>
    <div className="accueil">
      <h2>Our Books</h2>
      <div className="book-boxes">
        {bookList.map((book) => (
          <div key={book._id} className="book-box">
            <h2>{book.title}</h2>
            <p>
              <strong>Auteur:</strong> {book.author}
            </p>
            <p>
              <strong>Description:</strong> {book.description}
            </p>
            <div className="button">
              <button >
                <Link className="update" to={`update/${book._id}`} >
                  Update
                </Link>
              </button>
              <button onClick={() => supprimer(book._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
   </>
  );
};

export default OurBooks;
