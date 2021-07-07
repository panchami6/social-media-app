import React from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { likeUnlikePost, loadPosts, loadUserPosts } from './postsSlice';
import "./posts.css";
import { loadSingleUser } from '../User/usersSlice';

export const PostsList = () => {
    const {posts} = useSelector(state => state.posts)
    const { currentUser } = useSelector(state => state.auth);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();

    const onLikeButtonClicked = ({post, userId, postId, token}) => {
        dispatch(likeUnlikePost({userId, postId, token}))
        dispatch(loadPosts({userId, token}))
    }

    const onUserProfileClicked = ({singleUserId, token}) => {
        dispatch(loadSingleUser({singleUserId, token}))
        dispatch(loadUserPosts({singleUserId, token}))
    }

    return (
        <div>
        {posts && currentUser ? (
            <div>
            {posts.map(post => {
                const postId = post._id;
                const singleUserId = post.userId;
                return(
                <div key={post._id} className = "myposts-card">
                    <Link to= {`/user/${singleUserId}`} className = "user-profile-link" onClick = {() => onUserProfileClicked({singleUserId, token})}>
                        <div className = "post-header">
                            <img alt= "avatar" className ="post-avatar" src = {post.avatar} />
                            <h4>{post.name}</h4>
                        </div>
                    </Link>
                    <div className = "divider"></div>
                    <div className = "post-content-image">
                        <div className = "post-content">{post.content}</div>
                        {post.image  && (<img className = "post-img" alt="post" src = {post.image} />) }
                    </div>
                    <div className = "divider"></div>
                    <div className = "post-footer">
                    <button onClick = {() => onLikeButtonClicked({post, userId, postId, token})} className = {post.likes.includes(userId) ? "like-btn-active": "like-btn"}><i className="fas fa-heart"></i><span>{post.likes.length}</span></button>
                    </div>
                </div>
                )
            })}
            </div>
            ): (
                <div>No Posts to Show</div>
            )
        }
        </div>
    )
}


