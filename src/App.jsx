import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import { useSelector } from 'react-redux'
import LandingPage from './pages/LandingPage'

function App() {
  const user = useSelector((state) => state.auth.user)


  const ProtectedRoutes = ({children})=>{
    if(!user){
     return <Login />
    }
    return children
  }

  return (
    <div>
      <BrowserRouter>
      <Routes>
    
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/" element={<LandingPage />} />
      {/* Protected Route for Home */}
      <Route path="/home" element={<ProtectedRoutes><h1 className='text-3xl text-center'>Welcome to the Dashboard</h1></ProtectedRoutes>} />
  
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App