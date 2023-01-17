import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Cookie from 'cookie-universal';
const cookies = Cookie();

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setShowError(true);
        throw new Error(data.message);
      }

      setShowSuccess(true);
      setLogin(true);

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);

      navigate('/home');
      window.location.reload();

    } catch (err) {
      setShowError(true);
      console.error(err);
    }
  };

  return (
    <>
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