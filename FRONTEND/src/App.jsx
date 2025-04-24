import React from 'react'
import Login from './pages/login'
import Home from './pages/home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './pages/signup';
import Profile from './pages/Profile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App