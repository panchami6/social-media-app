import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../features/Auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { loadMyPosts } from '../features/posts/postsSlice';
import "./nav.css";

export const Navigation = () =>{
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.auth);
    const { myPosts } = useSelector(state => state.posts);

    const profileHandler = ({userId, token}) => {
      dispatch(getCurrentUser({userId, token}));
      dispatch(loadMyPosts({userId, token}));
  }
    
    const onLogOut = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/login');
    };
    return (
    <nav className="navigation">
        <div className="nav-Header" >
        <Link className="nav-link nav-header" to="/"><span><i className="fas fa-spa"></i></span> HolisticGram</Link>
        </div>
        <div className="nav-links">
        {(currentUser && myPosts) && (
          <Link to = {`/${userId}`} onClick = {() => profileHandler({userId, token})}><i className="fas fa-user"></i></Link>
        )}
          <button className="nav-link" onClick={onLogOut}><i className="fas fa-sign-out-alt"></i></button>
        </div>
    </nav> 
    )
}