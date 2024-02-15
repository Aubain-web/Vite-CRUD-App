import './App.css';
import OurBooks from './pages/ourBooks';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Accueil from './pages/accueil';
import AddBook from './pages/addBook';
import SearchBook from './pages/searchbook';
import Update from './pages/update'


function App() {
  return (
    <div className='app'>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Accueil/>}></Route>
      <Route path='/addBook' element={<AddBook/>}></Route>
      <Route path='/listbook' element={<OurBooks/>}></Route>
      <Route path='/search' element={<SearchBook/>}></Route>
      <Route path='/listbook/update/:id' element={<Update/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
