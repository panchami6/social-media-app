import React from 'react';
import {Routes, Route } from 'react-router-dom';
import { PrivateRoute } from "./features/Auth/PrivateRoute";
import { Home } from "./components/Home/Home";
import { Login } from "./features/Auth/Login";
import { SignUp } from "./features/Auth/SignUp";
import { Profile } from "./features/User/Profile";
import { UserProfile } from './features/User/UserProfile';
import './App.css';

function App() {
  return (
    <div className="App">
    <Routes>
      <PrivateRoute path='/' exact element = {<Home />} />
      <PrivateRoute path='/:userId' element={<Profile />} />
      <PrivateRoute path='/user/:singleUserId' element={<UserProfile />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
    </div>
  );
}

export default App;
