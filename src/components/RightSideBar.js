import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPosts } from '../features/posts/postsSlice';
import { followUser } from '../features/User/usersSlice';
import "./rightside.css";


export const RightSideBar = () => {
    const suggestedUsers = useSelector(state => state.users);
    const usersToFollow = suggestedUsers.users;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();
    
    const onFollowButtonClicked = ({userId, id, token}) => {
        dispatch(followUser({userId, id, token}))
        dispatch(loadPosts({userId, token}))
    }

    return (
        <div className = "right-side">
        {usersToFollow ? (
            <div>
            <h4 className = "suggestion-heading">Suggestions for you</h4>
            {usersToFollow.map(user => {
                const id = user._id;
                return(
                    <div key={user._id} className = "follow-suggestions">
                        <div className = "follow-info">
                            <img alt= "avatar" src ={user.avatar} />
                            <div>{user.username}</div>
                        </div>
                        <button onClick = {() => onFollowButtonClicked({userId, id, token})}>Follow</button>
                    </div>
                )
            }     
            )}
            </div>
        ) : (
            <div>Loading...</div>
        )
        }
            
        </div>
    )
}

