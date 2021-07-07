import React, { useEffect} from 'react';
import { RightSideBar } from "../RightSideBar";
import { PostsPage } from '../../features/posts/PostsPage';
import { useDispatch } from 'react-redux';
import { Navigation } from '../../Nav/Navigation';
import { getCurrentUser } from '../../features/Auth/authSlice';
import "./home.css"
import { loadPosts, loadMyPosts } from '../../features/posts/postsSlice';
import { loadSuggestedUsers } from '../../features/User/usersSlice';

export const Home = () => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
      dispatch(getCurrentUser({userId, token }));
    }, []);

    useEffect(() => {
        dispatch(loadPosts({userId, token}))
      }, []);

    useEffect(() => {
        dispatch(loadSuggestedUsers({userId, token}))
      }, []);

    useEffect(() => {
      dispatch(loadMyPosts({userId, token}));
    }, []);

    return (
        <div >
            <Navigation />
            <div className = "home">
            <PostsPage />
            <RightSideBar />
            </div>
        </div>
    )
}

