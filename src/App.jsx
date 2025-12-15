import { useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import { useSelector } from 'react-redux'
import LandingPage from './pages/LandingPage'
import api from './api/api'
import Navbar from './components/Navbar'
import { TokenProvider } from './utils/TokenContext'
import Expenses from './pages/Expenses'

function App() {

  const ProtectedRoutes = ({children})=>{
    if(localStorage.getItem("token")===null){
     return <Login />
    }
    return children
  }

  return (
    <div>
      <TokenProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/" element={<LandingPage />} />
      {/* Protected Route for Home */}
      <Route path="/home" element={<ProtectedRoutes><h1 className='text-3xl text-center'>Welcome to the Dashboard</h1></ProtectedRoutes>} />
      <Route path="/expenses" element = {<ProtectedRoutes><Expenses></Expenses></ProtectedRoutes>}> </Route>
      </Routes>
      </BrowserRouter>
      </TokenProvider>
    </div>
  )
}

export default App