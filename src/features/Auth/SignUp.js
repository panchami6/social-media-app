import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signupUser} from './authSlice';
import { validation } from "./validation";
import "./auth.css";

export function SignUp() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const onUserInputChanged = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

  const signUpHandler = (user) => {
    setErrors(validation(user))
    dispatch(signupUser({username: user.username,  email: user.email, password: user.password }));
  }


  return (
    <>
      <div className="loginBox">
        <h1>SignUp</h1>   
            <form>
                <div className="loginForm">
                    <input 
                    name = "username"
                    value = {user.username}
                    onChange = {(e) => onUserInputChanged(e)} autoComplete="off" placeholder="username"/>
                    {errors.username && <p className = "error">{errors.username}</p>}
                </div>
                <div className="loginForm">
                    <input 
                     value = {user.email}
                    name = "email"
                    onChange = {(e) => onUserInputChanged(e)} autoComplete="off" placeholder="email"/>
                    {errors.email && <p className = "error">{errors.email}</p>}
                </div>
                <div className="loginForm">
                    <input 
                    value = {user.password}
                     name = "password"
                     onChange = {(e) => onUserInputChanged(e)} autoComplete="off" placeholder="password"  type="Password" />
                     {errors.password && <p className = "error">{errors.password}</p>}
                </div>
                <button onClick = {() => signUpHandler(user)} type="button" className = "btn-login">SignUp</button>
            </form>
            <div style = {{color:"white", paddingTop:"1rem"}}>Already have an account? <Link to ="/login" className = "login-link">Login</Link></div>
      </div>
    </>
  );
}


