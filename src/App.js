import React from "react";
import './App.css';
import {Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import AuthProvider from './context/auth';
import PrivateRoute from './components/PrivateRoute'
import Home from "./components/Home";
import Profile from "./components/Profile";

function App() {

  return (
    <AuthProvider>
    <div>
    <Navbar />
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path="/" element={
      <PrivateRoute>
        <Home />
      </PrivateRoute>} />
      <Route path="/profile" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>} />
    </Routes>
    </div>
    </AuthProvider> 
  );
}

export default App;
