import { useEffect, useState } from 'react'
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import API_Status from './pages/api_status.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/home.jsx';
import Statistics from './pages/statistics.jsx';
import Endpoints from './pages/endpoints.jsx';
import Manage_Client from './pages/manage_client.jsx';
import Dashboard from './pages/dashboard.jsx';
import NewClient from './pages/new_client.jsx';

const App = () => {

  return (
    <div>
      <Navbar />
        <Routes>
          <Route path ="/" element = {<Home />} />
          <Route path ="/dashboard" element = {<Dashboard />} />
          <Route path ="/api_status" element = {<API_Status />} />
          <Route path ="/statistics" element = {<Statistics />} />
          <Route path ="/endpoints" element = {<Endpoints />} />
          <Route path ="/manage_client/:clientID" element = {<Manage_Client />} />
          <Route path ="/new_client" element = {<NewClient />} />
        </Routes>
    </div>
    
  )
}

export default App;