import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import Cookie from 'cookie-universal';
const cookies = Cookie();

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      method: "post",
      url: "http://localhost:5000/login",
      data: {
        username,
        password,
      },
    };

    axios(config)
      .then((res) => {
        cookies.set("TOKEN", res.data.TOKEN, {
          path: '/',
          maxAge: 60 * 60 * 24
        })
        setShowSuccess(true);
        setLogin(true);
        navigate('/home');
      })
      .catch((err) => {
        setShowError(true)
        err = new Error();
      });
  };

  return (
    <>
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
              <strong className="me-auto">Error logging in.</strong>
            </Toast.Header>
            <Toast.Body>
              {/* put error message here (ex. username already in use, password / username too short, something left empty*/}
              Please try again.
            </Toast.Body>
          </Toast>

          <Toast
            className="d-inline-block m-1 toast"
            onClose={() => setShowSuccess(false)} 
            show={showSuccess} 
            bg={'success'}
            delay={3000} 
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Successfully logged in!</strong>
            </Toast.Header>
          </Toast>
        </ToastContainer>

      <form className='auth-wrapper auth-inner'>
        <h3>Log In</h3>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <Button 
              type="submit"
              onClick={(e) => handleSubmit(e)}
              >
              Log In
            </Button>
        </div>
        <p className="small-text text-right">
          <a href="/signup">Don't have an account?</a>
        </p>
    </form>
    </>
  )
}