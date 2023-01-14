import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css';
 
import SignUp from "./pages/SignUp";
import Login from './pages/Login';
import Navbar from "./components/Navbar";
import FrontPage from "./pages/FrontPage";
import Home from './pages/Home';
import Protected from './components/Protected';
 
const App = () => {

  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, []);

  //for buttons to sign out:

  // const [isSignedIn, setIsSignedIn] = useState(null);
  // const signin = () => {
  //   setIsSignedIn(true)
  // };

  // const signout = () => {
  //   setIsSignedIn(false)
  // };

 return (
   <div>
     <Navbar />
     <Routes>
        <Route exact path='/' element={<FrontPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={
          <Protected isSignedIn={isSignedIn} >
              <Home />
          </Protected>} />
     </Routes>
   </div>
 );
};
 
export default App;