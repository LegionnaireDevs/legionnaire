import axios from 'axios';
import React from 'react';

const ApiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default ApiClient;