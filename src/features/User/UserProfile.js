import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { UserPosts } from "../posts/UserPosts";
import { Navigation } from "../../Nav/Navigation";
import { unFollowUser, loadSingleUser } from './usersSlice';
import "./user.css";

export const UserProfile = () => {
    const { singleUser, LoadingunFollow } = useSelector(state => state.users);
    const singleUserId = singleUser._id;
    const { userPosts } = useSelector(state => state.posts);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();

    const onUnfollowButtonClicked = ({userId, token}) => {
        dispatch(unFollowUser({userId, singleUserId, token}))
        dispatch(loadSingleUser({singleUserId, token}))
    }

    useEffect(() => {
      dispatch(loadSingleUser({singleUserId, token}))
    }, [LoadingunFollow, singleUserId, token, dispatch])

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
                <div>{singleUser.bio}</div>
                <div className = "profile-name">{singleUser.name}</div>
                {console.log(singleUser)}
                {singleUser.userId !==userId ? (
                    <button onClick = {() => onUnfollowButtonClicked({userId, singleUserId:singleUser._id, token})}>{LoadingunFollow ? <i className="fa fa-spinner" aria-hidden="true"></i> : (singleUser.followers.includes(userId)?"Unfollow":"Follow")}</button>
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

