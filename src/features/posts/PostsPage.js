import React from 'react'
import { NewPostForm } from './NewPostForm';
import { PostsList } from './PostsList';
import { useSelector } from "react-redux";

export const PostsPage = () => {
    const { currentUser } = useSelector(state => state.auth);
    return (
        <div className = "post-page">
        {currentUser ? (<div>
            <NewPostForm />
            <PostsList />
        </div>) : (<div>Loading...</div>)}
            
        </div>
    )
}

