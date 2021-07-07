import React from 'react';
import { useSelector } from 'react-redux';
import "./posts.css"

export const UserPosts = ({singleUser}) => {
    const { userPosts } = useSelector(state => state.posts);
    return (
        <div>
        {userPosts ? (
        <div className = "user-posts">
        {console.log(userPosts)}
            {userPosts.map( post => (
                <div key={post._id} className = "myposts-card">
                    <div className = "post-header">
                        <img alt="avatar" className ="post-avatar" src = {singleUser.avatar} />
                        <h4>{singleUser.name}</h4>
                    </div>
                    <div className = "divider"></div>
                    <div className="post-content-image">
                        <div className = "post-content">{post.content}</div>
                        {post.image  && (<img className = "post-img" alt="post" src = {post.image} />) }
                    </div>
                    <div className = "divider"></div>
                    <div className = "post-footer">
                    <button className = "like-btn">{post.likes.length} Likes</button>
                    </div>
                </div>
            ))}
        </div>
        ): (
            <div>No Posts Yet</div>
        )}
        </div>
    )
}


