import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App