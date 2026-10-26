import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'
import { StudentProvider } from './context/StudentContext.jsx';
import { ErrorProvider } from './context/ErrorContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ErrorProvider>
    <StudentProvider>
      <App />
    </StudentProvider>
    </ErrorProvider>
    </BrowserRouter>
  </React.StrictMode>
);
