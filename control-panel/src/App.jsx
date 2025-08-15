import { useEffect, useState } from 'react'
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import API_Status from './pages/api_status.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/home.jsx';

const App = () => {

  return (
    <div>
      <Navbar />
        <Routes>
          <Route path ="/" element = {<Home />} />
          <Route path ="/api_status" element = {<API_Status />} />
        </Routes>
    </div>
    
  )
}

export default App;