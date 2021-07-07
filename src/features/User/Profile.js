import React from 'react';
import { useSelector } from "react-redux";
import { MyPosts } from "../posts/MyPosts";
import { Navigation } from "../../Nav/Navigation";
import "./user.css";

export const Profile = () => {
    const { currentUser } = useSelector(state => state.auth);
    const { myPosts } = useSelector(state => state.posts);
    return (
        <div>
        <Navigation />
        {currentUser ? (
          <div className = "profile-page">
          <div className = "profile">
            <img alt="avatar" className = "avatar" src = {currentUser.avatar} />
            <div className = "profile-info">
                <div className = "profile-name">{currentUser.username}</div>
                <div className = "followingNumbers">
                    <div className = "postslength"><span>{myPosts.length}</span>Posts</div>
                    <div onClick = {() => console.log(currentUser.followers)} className = "followers"> <span>{currentUser.followers.length}</span> Followers</div>
                    <div onClick = {() => console.log(currentUser.following)} className = "following"> <span>{currentUser.following.length}</span> Following</div>
                </div>
                <div>{currentUser.bio}</div>
                <div className = "profile-name">{currentUser.name}</div>
            </div>
          </div>  
          <MyPosts currentUser = {currentUser} />
        </div>
        ) : (
          <div>Loading...</div>
        )
        }
        </div>
    )
}

