
import './App.css'
import Menu from './Components/Menu'
import Upload from './Components/Upload'
// import Navbar from './Components/Navigate/Navbar'
import Cart from './Components/Cart'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import SignIn from './Components/Authorization/SignIn'
import Login from './Components/Authorization/Login'
import Footer from './Components/Footer'
import Items from './Components/Items'
import Update from './Components/Update'
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
        <Route path='/update' element={<Update 
        />} />



      </Routes >
      <Footer />

    </>
  )
}

export default App
