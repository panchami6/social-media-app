import React, { useEffect} from 'react';
import { RightSideBar } from "../RightSideBar";
import { PostsPage } from '../../features/posts/PostsPage';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation } from '../../Nav/Navigation';
import { getCurrentUser } from '../../features/Auth/authSlice';
import "./home.css"
import { loadPosts, loadMyPosts } from '../../features/posts/postsSlice';
import { loadSuggestedUsers } from '../../features/User/usersSlice';

export const Home = () => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const { likeLoading } = useSelector(state => state.posts);
    const {loadingFollow} = useSelector(state => state.users);

    useEffect(() => {
      dispatch(getCurrentUser({userId, token }));
    }, [dispatch, userId, token]);

    useEffect(() => {
        dispatch(loadPosts({userId, token}))
      }, [likeLoading, loadingFollow, dispatch, userId, token]);

    useEffect(() => {
        dispatch(loadSuggestedUsers({userId, token}))
      }, [loadingFollow, dispatch, userId, token]);

    useEffect(() => {
      dispatch(loadMyPosts({userId, token}));
    }, [dispatch, userId, token]);

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

