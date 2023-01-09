import React, { useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {


    return (
        <form className='auth-wrapper auth-inner'>
          <h3>Sign Up</h3>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"

            />
          </div>
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
            <small id="passwordHelpInline" class="text-muted">
              Must be 8-20 characters long.
            </small>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="small-text text-right">
            <a href="/sign-in">Already have an account?</a>
          </p>
      </form>
    )
}