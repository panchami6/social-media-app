import React from 'react';
import { useSelector } from 'react-redux';
import "./posts.css"

export const MyPosts = ({currentUser}) => {
    const { myPosts } = useSelector(state => state.posts);
    return (
        <div>
        {myPosts ? (
        <div>
            {myPosts.map( post => (
                <div key={post._id} className = "myposts-card">
                    <div className = "post-header">
                        <img alt= "avatar" className ="post-avatar" src = {currentUser.avatar} />
                        <h4>{currentUser.name}</h4>
                    </div>
                    <div className = "divider"></div>
                    <div className="post-content-image">
                        <div className = "post-content">{post.content}</div>
                        {/* <img alt="post" src = {post.image} /> */}
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

