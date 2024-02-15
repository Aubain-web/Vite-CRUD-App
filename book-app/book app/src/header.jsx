import { Link } from 'react-router-dom';
import './header.css';

const Head = () =>{

    return(
        <>
        <div className="header">
            <Link to="/">Accueil</Link>
            <Link to="/addBook">Add Book</Link>
            <Link to="/listbook">Our Books</Link>
            <Link to="/search">Search</Link>
        </div>
        </>
    )
}
export default Head;