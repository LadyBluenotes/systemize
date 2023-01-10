import React, { useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Login() {


    return (
        <form className='auth-wrapper auth-inner'>
          <h3>Log In</h3>
          <div className="mb-3">
            <label>Username</label>
            <input type="text" className="form-control" placeholder="Username" />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid">
            <Button type="submit">
              Log In
            </Button>
          </div>
          <p className="small-text text-right">
            <a href="/sign-in">Don't have an account?</a>
          </p>
      </form>
    )
}