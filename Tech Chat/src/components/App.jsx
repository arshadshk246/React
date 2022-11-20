import React from 'react';
import Home from './Home/Home';
import Login from './login/Login';
import Register from './register/Register';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function App() {
  const {currentUser} = useContext(AuthContext)
  
  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to = "/login" />
      }

    return children
  }

    return (
      // <Register />
        <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            } />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App;