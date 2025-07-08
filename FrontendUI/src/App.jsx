import React from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import Vendorform from './pages/Vendorform'
import Ticketform from './pages/Ticketform'

function App() {

  return (
    <>
     <Navbar/>
     {/* <Home/> */}
     {/* <Vendorform/> */}
     <Ticketform/>
    </>
  )
}

export default App
