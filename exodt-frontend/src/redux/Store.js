import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/api/authSlice';
import chatReducer from './features/api/chatSlice';
import { apiSlice } from './features/api/apiSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;