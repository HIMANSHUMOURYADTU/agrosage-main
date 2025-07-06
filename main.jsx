// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// --- 1. IMPORT THE NEW GLOBAL STATE PROVIDER ---
// This provider will manage the theme and sustainability score for the whole app.
import { AppStateProvider } from '/ThemeContext.jsx';

// --- 2. IMPORT ALL NECESSARY CSS FILES ---
// It's crucial that these are imported here in the main entry point.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '/App.css'; // Your custom, "next-level" stylesheet

// --- 3. RENDER THE APPLICATION ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* The BrowserRouter enables page navigation (routing) */}
    <BrowserRouter>
      {/* 
        The AppStateProvider wraps your entire App. 
        This means every component inside <App /> can now access the shared state 
        (like the current theme and sustainability score) using the `useAppState` hook.
      */}
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </BrowserRouter>
  </React.StrictMode>
);
