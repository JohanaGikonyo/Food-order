
import './App.css'
import Menu from './Components/Menu'
import Upload from './Components/Upload'
import Navbar from './Components/Navigate/Navbar'
import Cart from './Components/Cart'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import SignIn from './Components/Authorization/SignIn'
import Login from './Components/Authorization/Login'
function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/cart' element={<Cart />} />

      </Routes>

    </>
  )
}

export default App
