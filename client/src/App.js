import React from "react";
import { Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css';
 
import SignUp from "./components/Forms/SignUp";
import Login from './components/Forms/Login';
import Navbar from "./components/navbar";
import FrontPage from "./components/frontpage";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
        <Route exact path='/' element={<FrontPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
     </Routes>
   </div>
 );
};
 
export default App;