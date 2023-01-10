import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';

export default function Register() {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [register, setRegister] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      method: "post",
      url: "http://localhost:5000/signup",
      data: {
        name,
        username,
        password,
      },
    };

    axios(config)
      .then((res) => {
        console.log(res)
        setShowSuccess(true)
        setRegister(true);
        res.redirect('/home')
      })
      .catch((err) => {
        setShowError(true)
        err = new Error();
      });
  };
  


    return (
      <div>
        <ToastContainer>
          <Toast
            className="d-inline-block m-1 toast"
            onClose={() => setShowError(false)} 
            show={showError} 
            bg={'danger'}
            delay={3000} 
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Error creating user.</strong>
            </Toast.Header>
            <Toast.Body>
              Please try again.
            </Toast.Body>
          </Toast>
        </ToastContainer>

        <ToastContainer>
          <Toast
            className="d-inline-block m-1 toast"
            onClose={() => setShowSuccess(false)} 
            show={showSuccess} 
            bg={'success'}
            delay={3000} 
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">User successfully created!</strong>
            </Toast.Header>
          </Toast>
        </ToastContainer>

        <form className='auth-wrapper auth-inner'>
          <h3>Sign Up</h3>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              minLength={"8"}
              maxLength={"20"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small id="passwordHelpInline" className="text-muted">
              Must be 8-20 characters long.
            </small>
          </div>
          <div className="d-grid">
            <Button 
              type="submit"
              onClick={(e) => handleSubmit(e)}
              >
              Sign Up
            </Button>
          </div>
          <p className="small-text text-right">
            <a href="/login">Already have an account?</a>
          </p>
      </form>

    </div>
    )
}