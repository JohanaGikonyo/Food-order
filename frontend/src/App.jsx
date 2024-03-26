
import './App.css'
import Products from './Components/Products'
import Upload from './Components/Upload'
import Navbar from './Components/Navigate/Navbar'
import Cart from './Components/Cart'
import { Route, Routes } from 'react-router-dom'
function App() {


  return (
    <>
      <Navbar />
      <Routes>

        <Route path='/' element={<Products />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/cart' element={<Cart />} />

      </Routes>

    </>
  )
}

export default App
