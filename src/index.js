import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthProvider';
import { ContactsProvider } from './context/ContactsProvider';
import { ConversationsProvider } from './context/ConversationsProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContactsProvider>
          <ConversationsProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </ConversationsProvider>
        </ContactsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

