import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { status } from '../../Utils/utils'


export const loadSingleUser = createAsyncThunk(
	'users/loadUser',
	async ({ singleUserId, token }) => {
		const response = await axios({
			method: 'GET',
			url: `https://social-media-app-backend.panchami6.repl.co/users/${singleUserId}`,
			headers: {
				authorization: token,
			},
		});
		return response.data.others;
	},
);


export const loadSuggestedUsers =  createAsyncThunk(
    'users/loadSuggestedUsers',
    async({userId, token}) => {
        const response = await axios({
            method: 'GET',
            url:`https://social-media-app-backend.panchami6.repl.co/users/suggestion/${userId}`, 
            headers: {
                authorization: token,
            },
        });
        return response.data;
    }
)

export const followUser =  createAsyncThunk(
    'users/followUser',
    async({userId, id, token}) => {
        const response = await axios({
            method: 'POST',
            url:`https://social-media-app-backend.panchami6.repl.co/users/${id}/follow`, 
            headers: {
                authorization: token,
            },
            data: {
                userId: userId
            }
        });
        return response.data;
    }
)

export const unFollowUser =  createAsyncThunk(
    'users/unFollowUser',
    async({userId, singleUserId, token}) => {
        const response = await axios({
            method: 'POST',
            url:`https://social-media-app-backend.panchami6.repl.co/users/${singleUserId}/unfollow`, 
            headers: {
                authorization: token,
            },
            data: {
                userId: userId
            }
        });
        return response.data;
    }
)

const initialState = {
    users: [],
    singleUser: null,
    follow:false,
    suggestedUsers: [],
    status: {
        LOAD_USERS: 0,
    }
}

export const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers: {

    },
    extraReducers: {
        [loadSuggestedUsers.pending]: (state) => {
            state.status.LOAD_USERS = status['LOADING'];
        },
        [loadSuggestedUsers.fulfilled]: (state, {payload}) =>{
            state.users = payload.suggestedUsers;
            state.status.LOAD_USERS =  status['SUCCESS'];
        },
        [loadSuggestedUsers.rejected]: (state) =>{
            state.status.LOAD_USERS =  status['REJECTED'];
        },
        [followUser.pending]: (state) => {
            state.status.LOAD_USERS = status['LOADING'];
        },
        [followUser.fulfilled]: (state, {payload}) =>{
            state.status.LOAD_USERS =  status['SUCCESS'];
            state.follow = true;
        },
        [followUser.rejected]: (state) =>{
            state.status.LOAD_USERS =  status['REJECTED'];
        },
        [unFollowUser.pending]: (state) => {
            state.status.LOAD_USERS = status['LOADING'];
        },
        [unFollowUser.fulfilled]: (state, {payload}) =>{
            state.status.LOAD_USERS =  status['SUCCESS'];
            state.follow = false;
        },
        [unFollowUser.rejected]: (state) =>{
            state.status.LOAD_USERS =  status['REJECTED'];
        },
        [loadSingleUser.pending]: (state) => {
            state.status.LOAD_USERS = status['LOADING'];
        },
        [loadSingleUser.fulfilled]: (state, {payload}) =>{
            state.singleUser = payload;
            state.status.LOAD_USERS =  status['SUCCESS'];
        },
        [loadSingleUser.rejected]: (state) =>{
            state.status.LOAD_USERS =  status['REJECTED'];
        },

    }
})


export default usersSlice.reducer;