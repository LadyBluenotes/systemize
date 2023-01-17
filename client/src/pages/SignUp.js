import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

// errors for when password or username is too short to prevent from submitting

export default function SignUp() {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          name: name,
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
      setSignUp(true);

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);

      navigate('/home');

    } catch (err) {
      setShowError(true);
      console.error(err);
    }
  };

    return (
      <>
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
    </>
    )
}