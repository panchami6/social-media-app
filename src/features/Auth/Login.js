import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { clearState , loginUser} from './authSlice';
import "./auth.css";

export function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { token, errorMessage } = useSelector(state => state.auth)

  const onUserInputChanged = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

  const loginHandler = (user) => {
    dispatch(loginUser({email: user.email, password: user.password }));
    token && navigate(state?.from ? state.from : "/") 
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  return (
    <>
      <div className="loginBox">
        <h1>Login</h1>   
            <form method="" action="">
                <div className="loginForm">
                    <input name = "email" onChange={(e) => onUserInputChanged(e) } autoComplete="off" placeholder="email" type="username"/>
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
                <div className="loginForm">
                    <input name = "password" onChange={(e) => onUserInputChanged(e)} autoComplete="off" placeholder="password"  type="Password" />
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
                <button type = "button" className = "btn-login" onClick={() => loginHandler(user)}>Login</button>
            </form>
            <div style = {{color:"white", paddingTop:"1rem"}}>Not a user? <Link to ="/signup" className = "login-link">Sign up</Link></div>
      </div>
    </>
  );

}




