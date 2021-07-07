import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async({username, email, password}, thunkAPI) => {
        try{
            const response = await axios({
                method: 'POST',
                url: 'https://social-media-app-backend.panchami6.repl.co/auth/register',
                data: {username, email, password}
            }
            )

            let data = await response.data;
            
            if(response.status === 200){
                localStorage.setItem('token', data.token);
                return {...data, username: username, email:email};
            } else{
                return thunkAPI.rejectWithValue(data);
            }
        } catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }

    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async({email, password}, thunkAPI) => {
        try{
            const response = await axios({
                method: 'POST',
                url: 'https://social-media-app-backend.panchami6.repl.co/auth/login',
                data: {
                    email:email, password:password
                },
            })
            let data = await response.data;
            if(response.status === 200){
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.user._id);
                return data;
            } else{
                return thunkAPI.rejectWithValue(data);
            }
        } catch(err){
            thunkAPI.rejectWithValue(err.response.data)
        }
    }
    
)

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async({userId, token}, thunkAPI) => {
        try{
        const response = await axios({
            method: 'GET',
            url:`https://social-media-app-backend.panchami6.repl.co/users/${userId}`,
            headers:{
                Authorization: token,
            },
        })
        let data = await response.data;
        if(response.status === 200){
            return data;
        } else{
            return thunkAPI.rejectWithValue(data);
        }
        } catch(err){
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem("token"),
        username: '',
        email: '',
        isFethcing: false,
        isSuccess: false,
        ifError: false,
        errorMessage: '',
        currentUser: null
    },
    reducers: {
        clearState: (state) => {
            state.isFethcing = false;
            state.isSuccess = false;
            state.isError = false;
        
            return state;
        },
    },
    extraReducers: {
        [signupUser.pending]: (state) => {
            state.isFethcing = true;
        },
        [signupUser.fulfilled]: (state, {payload}) => {
            state.isFethcing = false;
            state.isSuccess = true;
            state.email = payload.user.email;
            state.username = payload.user.username;
        },
        [signupUser.rejected]: (state, {payload}) =>{
            state.isFethcing = false;
            state.isError = true;
        },
        [loginUser.pending] : (state) => {
            state.isFethcing = true;
        },
        [loginUser.fulfilled]: (state, {payload}) =>{
            state.email = payload.email;
            state.username = payload.username;
            state.isFethcing = false;
            state.isSuccess = true;
            state.token = localStorage.getItem("token")
        },
        [loginUser.rejected]: (state, {payload}) => {
            state.isFethcing = false;
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload;
        },
        [getCurrentUser.pending] : (state) => {
            state.isFethcing = true;
        },
        [getCurrentUser.fulfilled] : (state, {payload}) =>{
            state.isFethcing = false;
            state.isSuccess = true;
            state.currentUser = payload.others;
        }
    }
})

export const { clearState } = authSlice.actions;
export default authSlice.reducer;
export const authSelector = (state) => state.auth;