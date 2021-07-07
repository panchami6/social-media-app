import { configureStore } from '@reduxjs/toolkit';

import postsReducer from '../features/posts/postsSlice';
import authReducer from '../features/Auth/authSlice';
import usersReducer from "../features/User/usersSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    users: usersReducer,
  },
});
