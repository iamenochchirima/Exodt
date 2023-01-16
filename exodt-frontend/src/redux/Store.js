import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './features/users/User';
// import { apiSlice } from "./features/api/apiSlice";
import authReducer from './features/auth/authSlice';
import { authApi } from './features/api/authApi';

export const store = configureStore({
    reducer: {
        // user: userReducer,
        // [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
    // devTools: true
});

export default store;