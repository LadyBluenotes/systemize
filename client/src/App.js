import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css';
 
import SignUp from "./pages/SignUp";
import Login from './pages/Login';
import Navbar from "./components/Navbar";
import FrontPage from "./pages/FrontPage";
import Tasks from './pages/Tasks';
import Home from './pages/Home';
import Protected from './components/Protected';
 
const App = () => {

  const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem("token") ? true : false);

 return (
   <div>
     <Navbar isSignedIn={isSignedIn} />
     <Routes>
        <Route exact path='/' element={<FrontPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={
          <Protected isSignedIn={isSignedIn} >
              <Home />
          </Protected>} />
        <Route path="/tasks" element={
          <Protected isSignedIn={isSignedIn} >
              <Tasks />
          </Protected>} />
     </Routes>
   </div>
 );
};
 
export default App;