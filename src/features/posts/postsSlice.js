import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { status } from "../../Utils/utils";
import axios from "axios";

export const loadPosts = createAsyncThunk(
    'posts/loadPosts',
    async({token, userId}) => {
        const response = await axios({
            method: "GET",
            url: `https://social-media-app-backend.panchami6.repl.co/posts/timeline/all/${userId}`,
            headers: {
                authorization: token,
            },
        })
        return response.data;
    }
)

export const uploadPost = createAsyncThunk(
    'posts/uploadPost', 
    async({userId, token, content, avatar, username, image}) => {
        console.log({userId, token, content, avatar, username, image})

        const response = await axios({
            method:"POST",
            url: 'https://social-media-app-backend.panchami6.repl.co/posts',
            headers:{
                authorization:token
            },
            data:{
                userId: userId,
                token: token,
                content: content,
                avatar: avatar,
                name: username,
                image: image
            }
        })
        return response.data;
    }
)

export const likeUnlikePost = createAsyncThunk(
    'posts/likeUnlikePost',
    async({userId, postId, token}) => {
        const response = await axios({
            method: 'POST',
            url: `https://social-media-app-backend.panchami6.repl.co/posts/${postId}/like`,
            headers: {
                authorization: token
            },
            data:{
                userId: userId
            }
        })
        return response.data;
    }
)


export const loadMyPosts =  createAsyncThunk(
    'posts/loadMyPosts',
    async({userId, token}) => {
        const response = await axios({
            method: 'GET',
            url:`https://social-media-app-backend.panchami6.repl.co/posts/timeline/${userId}`, 
            headers: {
                authorization: token,
            },
        });
        return response.data;
    }
)



export const loadUserPosts =  createAsyncThunk(
    'posts/loadUserPosts',
    async({singleUserId, token}) => {
        const response = await axios({
            method: 'GET',
            url:`https://social-media-app-backend.panchami6.repl.co/posts/timeline/${singleUserId}`, 
            headers: {
                authorization: token,
            },
        });
        return response.data;
    }
)


const initialState = {
    posts : null,
    myPosts: null,
    userPosts: null,
    error: null,
    loading: false,
    uploadLoading: false,
    likeLoading: false,
    status: {
        LOAD_POSTS: 0,
        UPLOAD_POST: 0,
        LIKE_POST: 0,
        LOAD_CURRENT_POST: 0,
        DELETE_POST: 0,
    },
}


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers: {
        [uploadPost.pending]: (state) => {
            state.uploadLoading = true;
            state.status.LOAD_POSTS = status['LOADING']
        },
        [uploadPost.fulfilled]: (state, {payload}) => {
            state.uploadLoading = false;
            state.status.LOAD_POSTS = status['SUCCESS']
            state.myPosts = payload
        },
        [uploadPost.rejected]: (state) => {
            state.uploadLoading = false;
            state.status.LOAD_POSTS = status['REJECTED']
        },
        [loadMyPosts.pending]: (state) => {
            state.loading = true;
            state.status.LOAD_POSTS = status['LOADING']
        },
        [loadMyPosts.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.status.LOAD_POSTS = status['SUCCESS']
            state.myPosts = payload
        },
        [loadMyPosts.rejected]: (state) => {
            state.loading = false;
            state.status.LOAD_POSTS = status['REJECTED']
        },
        [loadPosts.pending]: (state) => {
            state.loading = true;
            state.status.LOAD_POSTS = status['LOADING']
        },
        [loadPosts.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.status.LOAD_POSTS = status['SUCCESS']
            state.posts = payload
        },
        [loadPosts.rejected]: (state) => {
            state.loading = false;
            state.status.LOAD_POSTS = status['REJECTED']
        },
        [loadUserPosts.pending]: (state) => {
            state.loading = true;
            state.status.LOAD_POSTS = status['LOADING']
        },
        [loadUserPosts.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.status.LOAD_POSTS = status['SUCCESS']
            state.userPosts = payload
        },
        [loadUserPosts.rejected]: (state) => {
            state.loading = false;
            state.status.LOAD_POSTS = status['REJECTED']
        },
        [likeUnlikePost.pending]: (state) => {
            state.likeLoading = true;
        },
        [likeUnlikePost.fulfilled]: (state) => {
            state.likeLoading = false;
        },
        [likeUnlikePost.rejected]: (state) => {
            state.likeLoading = false;
        }
    }
})


export default postsSlice.reducer;
export const postsSelector = (state) => state.posts;