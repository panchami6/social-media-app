import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { UserPosts } from "../posts/UserPosts";
import { Navigation } from "../../Nav/Navigation";
import { unFollowUser } from './usersSlice';
import "./user.css";

export const UserProfile = () => {
    const { singleUser } = useSelector(state => state.users);
    const { userPosts } = useSelector(state => state.posts);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();

    const onUnfollowButtonClicked = ({userId, singleUserId, token}) => {
        console.log({userId, singleUserId, token})
        dispatch(unFollowUser({userId, singleUserId, token}))
    }

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
                    <button onClick = {() => onUnfollowButtonClicked({userId, singleUserId:singleUser.userId, token})}>{singleUser.followers.includes(userId)?"Unfollow":"Follow"}</button>
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

