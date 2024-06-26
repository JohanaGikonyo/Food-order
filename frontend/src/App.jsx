
import './App.css'
import Menu from './Components/Pages/Menu'
import Upload from './Components/Pages/Upload'
// import Navbar from './Components/Navigate/Navbar'
import Cart from './Components/Pages/Cart'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home'
import SignIn from './Components/Authorization/SignIn'
import Login from './Components/Authorization/Login'
import Footer from './Components/Pages/Footer'
import Items from './Components/Pages/Items'

function App() {


  return (
    <>
      { }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/items' element={<Items />} />




      </Routes >
      <Footer />

    </>
  )
}

export default App
