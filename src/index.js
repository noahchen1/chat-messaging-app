import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Register from './components/Register';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthProvider';

const loginRouter = createBrowserRouter([
  {
    path: "/login",
    element: <App />
  }
])

const registerRouter = createBrowserRouter([
  {
    path: "/register",
    element: <Register />
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={loginRouter} />
      <RouterProvider router={registerRouter} />
    </AuthProvider>
  </React.StrictMode>
);

