import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { useEffect, useState } from 'react'
import BookDetail from './pages/BookDetail'
import AddBook from './pages/AddBook'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);


  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path='/add-book' element={<AddBook/>} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </>
  ) 
}
 
export default App
 