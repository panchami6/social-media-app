import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from 'react-textarea-autosize';
import "./posts.css";
import { loadPosts, uploadPost } from './postsSlice';

export const NewPostForm = () => {
    
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const { currentUser } = useSelector(state => state.auth);
    const {avatar, username} = currentUser;
    console.log(currentUser)
    const dispatch = useDispatch();

    const onContentChangeHandler = (e) => {
        setContent(e.target.value);
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }
    
    const previewFile = (file) => {
        const reader =  new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
        setImage(reader.result)
        }
    }

    const onPostClickedHandler = ({userId, token, content, avatar, username, image}) => {       
        dispatch(uploadPost({userId, token, content, avatar, username, image})) 
        setContent("");
        setImage("");
        dispatch(loadPosts({userId, token}))
    }


    return (
        <div >
        <div className = "new-post">
            <div><i className="fas fa-user-circle fa-2x"></i></div>
            <div>
                <TextareaAutosize className = "new-post-input"
                  maxRows = "8"
                  placeholder = "What's on your mind?"
                  value = {content}
                  onChange = {onContentChangeHandler}  
                />
                <div className = "new-post-btn">
                    <div className = "new-post-media">
                    <form>
                        <input 
                        type="file"
                        name="image"
                         onChange = {handleFileInputChange}/>
                    </form>
                    <div>
                    {image && (
                        <img src={image} alt="chosen" className = "previewImage" />
                    )}
                    </div>
                    </div>
                   
                    <button className = "btn-post"
                        onClick = {() => onPostClickedHandler({userId, token, content, avatar, username, image})}
                        disabled = {content === "" && image === ""}
                    >Post</button>
                </div>
            </div>
        </div>
        <div className = "divider"></div>
        </div>
    )
}

