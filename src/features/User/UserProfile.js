import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { UserPosts } from "../posts/UserPosts";
import { Navigation } from "../../Nav/Navigation";
import { unFollowUser, loadSingleUser } from './usersSlice';
import "./user.css";
import { useParams } from 'react-router';

export const UserProfile = () => {
    const { singleUser, LoadingunFollow } = useSelector(state => state.users);
    const {singleUserId} = useParams();
    const { userPosts } = useSelector(state => state.posts);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();

    const onUnfollowButtonClicked = ({userId,singleUserId, token}) => {
        dispatch(unFollowUser({userId, singleUserId, token}))        
    }

    useEffect(() => {
      dispatch(loadSingleUser({singleUserId, token})) 
    }, [LoadingunFollow, token, dispatch])

    return (
        <div>
        <Navigation />
        {singleUser && userPosts ? (
          <div className = "profile-page">
          <div className = "profile">
            <img alt="avatar" className = "avatar" src = {singleUser.avatar} />
            <div className = "profile-info">
                <div className = "profile-name">{singleUser.username}</div>
                <div className = "followingNumbers">
                    <div className = "postslength"><span>{userPosts.length}</span>Posts</div>
                    <div className = "followers"> <span>{singleUser.followers.length}</span> Followers</div>
                    <div className = "following"> <span>{singleUser.following.length}</span> Following</div>
                </div>
                {singleUser.userId !==userId ? (
                    <button className="follow-btn" onClick = {() => onUnfollowButtonClicked({userId, singleUserId:singleUser._id, token})}>{LoadingunFollow ? <i className="fa fa-spinner" aria-hidden="true"></i> : (singleUser.followers.includes(userId)?"Unfollow":"Unfollowed")}</button>
                ):(<div></div>) }
            </div>
          </div>  
          <UserPosts singleUser = {singleUser} />
        </div>
        ) : (
          <div>Loading...</div>
        )
        }
        </div>
    )
}

